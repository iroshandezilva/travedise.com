// Plan your trip form endpoint: validation, email content and the Zoho Mail calls.
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { onRequestPost, readEnquiry, teamEmail, travellerEmail } from "../functions/api/enquiry.js";

const VALID = {
  first: "Ada",
  last: "Lovelace",
  email: "ada@example.com",
  code: "+61",
  phone: "400 000 000",
  channel: "Email",
  journey: "Hill country",
  duration: "10 to 14 days",
  adults: "2",
  children: "0",
  budget: "Not sure yet",
  interests: "Tea, Wildlife",
  notes: "Slow mornings.\nNo early starts.",
};

const ENV = {
  ZOHO_CLIENT_ID: "id",
  ZOHO_CLIENT_SECRET: "secret",
  ZOHO_REFRESH_TOKEN: "refresh",
  ZOHO_ACCOUNT_ID: "123",
};

const post = (body, env = ENV) =>
  onRequestPost({
    request: new Request("https://travedise.com/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    env,
  });

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

/** Stubs Zoho: records every call, answers the token and send endpoints. */
function stubZoho({ sendStatus = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes("/oauth/v2/token")) {
      return Response.json({ access_token: "tok", expires_in: 3600 });
    }
    return new Response("{}", { status: sendStatus });
  };
  return calls;
}

describe("readEnquiry", () => {
  it("accepts a complete enquiry", () => {
    assert.equal(readEnquiry(VALID).error, undefined);
  });

  it("rejects missing required fields and bad emails", () => {
    assert.match(readEnquiry({ ...VALID, phone: " " }).error, /phone/);
    assert.match(readEnquiry({ ...VALID, email: "not-an-email" }).error, /email/);
  });

  it("rejects overlong fields", () => {
    assert.match(readEnquiry({ ...VALID, notes: "x".repeat(5000) }).error, /too long/);
  });

  it("strips line breaks from single-line fields but keeps them in notes", () => {
    const { enquiry } = readEnquiry({ ...VALID, first: "Ada\r\nBcc: x@y.z" });
    assert.equal(enquiry.first, "Ada Bcc: x@y.z");
    assert.match(enquiry.notes, /\n/);
  });
});

describe("email content", () => {
  const { enquiry } = readEnquiry(VALID);

  it("puts the traveller's address first in our copy", () => {
    const mail = teamEmail(enquiry);
    assert.equal(mail.subject, "Trip enquiry from Ada Lovelace");
    assert.ok(mail.content.startsWith("Reply to: ada@example.com"));
    assert.match(mail.content, /Phone: \+61 400 000 000/);
    assert.match(mail.content, /Slow mornings/);
  });

  it("sends the traveller a full copy of their submission", () => {
    const mail = travellerEmail(enquiry);
    assert.match(mail.content, /Hello Ada/);
    assert.match(mail.content, /Journey: Hill country/);
    assert.match(mail.content, /Phone: \+61 400 000 000/);
    assert.match(mail.content, /Slow mornings/);
  });
});

describe("service enquiries", () => {
  const WEDDING = {
    ...VALID,
    journey: "",
    service: "wedding",
    details: [
      { label: "Wedding style", value: "Indian destination wedding" },
      { label: "Guests", value: "80 to 200" },
      { label: "Empty answer", value: " " },
    ],
  };

  it("accepts a service with its answers and drops empty ones", () => {
    const { enquiry, error } = readEnquiry(WEDDING);
    assert.equal(error, undefined);
    assert.equal(enquiry.service, "wedding");
    assert.equal(enquiry.details.length, 2);
  });

  it("rejects unknown services, too many answers and overlong answers", () => {
    assert.match(readEnquiry({ ...WEDDING, service: "spaceflight" }).error, /not recognised/);
    const many = Array.from({ length: 21 }, (_, i) => ({ label: `Q${i}`, value: "A" }));
    assert.match(readEnquiry({ ...WEDDING, details: many }).error, /too many/);
    const long = [{ label: "Guests", value: "x".repeat(600) }];
    assert.match(readEnquiry({ ...WEDDING, details: long }).error, /too long/);
    assert.match(readEnquiry({ ...WEDDING, details: "Guests: 80" }).error, /could not be read/);
  });

  it("strips line breaks from answers", () => {
    const { enquiry } = readEnquiry({
      ...WEDDING,
      details: [{ label: "Venue\nBcc", value: "Galle\r\nFort" }],
    });
    assert.deepEqual(enquiry.details, [{ label: "Venue Bcc", value: "Galle Fort" }]);
  });

  it("names the service in both emails and lists every answer", () => {
    const { enquiry } = readEnquiry(WEDDING);
    const ours = teamEmail(enquiry);
    assert.equal(ours.subject, "Wedding enquiry from Ada Lovelace");
    assert.match(
      ours.content,
      /Enquiry: Wedding\nWedding style: Indian destination wedding\nGuests: 80 to 200/,
    );
    assert.doesNotMatch(ours.content, /Journey:/);
    const theirs = travellerEmail(enquiry);
    assert.equal(theirs.subject, "Your Travedise wedding enquiry (copy)");
    assert.match(theirs.content, /Guests: 80 to 200/);
  });

  it("keeps a trip enquiry without a service exactly as before", () => {
    const { enquiry } = readEnquiry(VALID);
    assert.equal(enquiry.service, "");
    assert.equal(teamEmail(enquiry).subject, "Trip enquiry from Ada Lovelace");
  });
});

describe("POST /api/enquiry", () => {
  it("sends our copy, then the traveller's confirmation", async () => {
    const calls = stubZoho();
    const res = await post(VALID);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });

    const sends = calls.filter((c) => c.url.includes("/api/accounts/123/messages"));
    assert.equal(sends.length, 2);
    const [ours, theirs] = sends.map((c) => JSON.parse(c.init.body));
    assert.equal(ours.toAddress, "contact@travedise.com");
    assert.equal(ours.fromAddress, "contact@travedise.com");
    assert.equal(theirs.toAddress, "ada@example.com");
    assert.equal(sends[0].init.headers.Authorization, "Zoho-oauthtoken tok");
  });

  it("uses the Zoho data centre from ZOHO_DOMAIN", async () => {
    const calls = stubZoho();
    await post(VALID, { ...ENV, ZOHO_DOMAIN: "eu" });
    assert.ok(calls.some((c) => c.url.startsWith("https://mail.zoho.eu/")));
  });

  it("returns 400 for an invalid enquiry without calling Zoho", async () => {
    const calls = stubZoho();
    const res = await post({ ...VALID, email: "nope" });
    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  it("quietly drops bot submissions that fill the honeypot", async () => {
    const calls = stubZoho();
    const res = await post({ ...VALID, website: "spam.example" });
    assert.equal(res.status, 200);
    assert.equal(calls.length, 0);
  });

  it("returns 503 when the Zoho secrets are missing", async () => {
    const res = await post(VALID, {});
    assert.equal(res.status, 503);
  });

  it("returns 502 when Zoho refuses our copy", async () => {
    stubZoho({ sendStatus: 500 });
    const res = await post(VALID);
    assert.equal(res.status, 502);
  });
});
