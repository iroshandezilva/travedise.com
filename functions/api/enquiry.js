/**
 * POST /api/enquiry — the Plan your trip form, and the service enquiries (vehicles,
 * weddings, group vacations).
 *
 * A trip enquiry posts the trip fields below. A service enquiry adds `service` (one of
 * SERVICES) and `details`: the answers to its own questions, as `{ label, value }` pairs,
 * because each service asks different things and the form's words live in JSON.
 *
 * Sends two emails through the Zoho Mail API from our own mailbox:
 * - the enquiry, to us (ENQUIRY_TO, default contact@travedise.com);
 * - a copy of the same submission, to the email address the traveller typed in.
 *
 * Zoho's send API has no reply-to field, so our copy puts the traveller's address
 * on its first line to reply to.
 *
 * Needs these Cloudflare Pages secrets (see README "Trip enquiry email"):
 * ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNT_ID,
 * and optionally ZOHO_DOMAIN (com, eu, in, com.au, jp, ca — default com),
 * ENQUIRY_FROM and ENQUIRY_TO (both default contact@travedise.com).
 */

const DEFAULT_ADDRESS = "contact@travedise.com";
const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

// Field name → longest value accepted. Anything else in the body is ignored.
const LIMITS = {
  first: 80,
  last: 80,
  email: 200,
  code: 20,
  phone: 40,
  country: 80,
  channel: 40,
  heard: 80,
  journey: 120,
  when: 20,
  duration: 40,
  adults: 3,
  children: 3,
  ages: 80,
  budget: 40,
  interests: 400,
  notes: 4000,
};
const REQUIRED = ["first", "last", "email", "phone"];

/** Service enquiries: `service` value → how emails name it. No `service` = a trip enquiry. */
export const SERVICES = {
  vehicle: "Vehicle",
  wedding: "Wedding",
  group: "Group vacation",
};
const MAX_DETAILS = 20;
const LABEL_MAX = 80;
const VALUE_MAX = 500;
const oneLine = (s) => s.replace(/[\r\n]+/g, " ");

/** The service and its question-and-answer pairs. Returns `{ service, details }` or `{ error }`. */
function readService(body) {
  const service = body.service == null ? "" : String(body.service).trim();
  if (service === "") return { service: "", details: [] };
  if (!Object.hasOwn(SERVICES, service)) return { error: "That enquiry type is not recognised." };
  const raw = body.details ?? [];
  if (!Array.isArray(raw)) return { error: "The form could not be read." };
  if (raw.length > MAX_DETAILS) return { error: "The form has too many answers." };
  const details = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return { error: "The form could not be read." };
    const label = oneLine(String(item.label ?? "").trim());
    const value = oneLine(String(item.value ?? "").trim());
    if (label.length > LABEL_MAX || value.length > VALUE_MAX) {
      return { error: "One of the answers is too long." };
    }
    if (label && value) details.push({ label, value });
  }
  return { service, details };
}

/** Trims and length-checks the posted fields. Returns `{ enquiry }` or `{ error }`. */
export function readEnquiry(body) {
  if (!body || typeof body !== "object") return { error: "The form could not be read." };
  const enquiry = {};
  for (const [name, max] of Object.entries(LIMITS)) {
    const value = body[name] == null ? "" : String(body[name]).trim();
    if (value.length > max) return { error: `The ${name} field is too long.` };
    enquiry[name] = value;
  }
  // Single-line fields end up in subjects and headers: no line breaks allowed.
  for (const name of Object.keys(LIMITS)) {
    if (name !== "notes") enquiry[name] = enquiry[name].replace(/[\r\n]+/g, " ");
  }
  const missing = REQUIRED.filter((name) => enquiry[name] === "");
  if (missing.length > 0) return { error: `Please fill in: ${missing.join(", ")}.` };
  if (!EMAIL.test(enquiry.email)) return { error: "That email address does not look right." };
  const { service, details, error } = readService(body);
  if (error) return { error };
  enquiry.service = service;
  enquiry.details = details;
  return { enquiry };
}

const lines = (list) => list.filter(Boolean).join("\n");

/** What the emails call this enquiry: "Trip", or the service's name. */
const kind = (e) => (e.service ? SERVICES[e.service] : "Trip");

/** The whole submission, as written into both emails. */
export function submission(e) {
  const phone = `${e.code && e.code !== "Other" ? `${e.code} ` : ""}${e.phone}`;
  const contact = lines([
    `Name: ${e.first} ${e.last}`,
    `Email: ${e.email}`,
    `Phone: ${phone}`,
    e.country && `Country or region: ${e.country}`,
    e.channel && `Best way to reach me: ${e.channel}`,
    e.heard && `Heard about Travedise from: ${e.heard}`,
  ]);
  if (e.service) {
    return [
      contact,
      lines([`Enquiry: ${kind(e)}`, ...(e.details ?? []).map((d) => `${d.label}: ${d.value}`)]),
      e.notes && `Anything else:\n${e.notes}`,
    ]
      .filter(Boolean)
      .join("\n\n");
  }
  return [
    contact,
    lines([
      `Journey: ${e.journey || "Open"}`,
      e.when && `When: ${e.when}`,
      e.duration && `Length: ${e.duration}`,
      `Travellers: ${e.adults || "?"} adults, ${e.children || "0"} children${e.ages ? ` (ages ${e.ages})` : ""}`,
      e.budget && `Budget per person: ${e.budget}`,
      e.interests && `Interests: ${e.interests}`,
    ]),
    e.notes && `What would make this trip mine:\n${e.notes}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function teamEmail(e) {
  return {
    subject: `${kind(e)} enquiry from ${e.first} ${e.last}`,
    content: `Reply to: ${e.email}\n\n${submission(e)}`,
  };
}

/** A copy of everything they sent, so the traveller has a record of it. */
export function travellerEmail(e) {
  return {
    subject: `Your Travedise ${kind(e).toLowerCase()} enquiry (copy)`,
    content: [
      `Hello ${e.first},`,
      e.service
        ? "Thank you for your enquiry. Someone from the Travedise team will read it and come back to you within a day, usually with a question or two before a quote."
        : "Thank you for telling us about your trip. A Travedise travel designer will read it and come back to you within a day, usually with a question or two before any suggestions.",
      "Here is a copy of what you sent us:",
      submission(e),
      "If anything has changed, just reply to this email.",
      "Travedise\nhttps://travedise.com",
    ].join("\n\n"),
  };
}

// An access token lasts an hour; keep it for the life of the worker instance.
let cached = { token: "", expires: 0 };

async function accessToken(env, domain) {
  if (cached.token && Date.now() < cached.expires) return cached.token;
  const params = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const res = await fetch(`https://accounts.zoho.${domain}/oauth/v2/token`, {
    method: "POST",
    body: params,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token request failed (${res.status}): ${data.error ?? "no token"}`);
  }
  cached = {
    token: data.access_token,
    expires: Date.now() + ((data.expires_in ?? 3600) - 120) * 1000,
  };
  return cached.token;
}

async function sendMail(env, domain, token, message) {
  const res = await fetch(
    `https://mail.zoho.${domain}/api/accounts/${env.ZOHO_ACCOUNT_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mailFormat: "plaintext", askReceipt: "no", ...message }),
    },
  );
  if (!res.ok) {
    throw new Error(`Zoho send failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);

  // Honeypot: a field people never see. Bots that fill it get a quiet "ok".
  if (body?.website) return json({ ok: true });

  const { enquiry, error } = readEnquiry(body);
  if (error) return json({ ok: false, error }, 400);

  const missing = [
    "ZOHO_CLIENT_ID",
    "ZOHO_CLIENT_SECRET",
    "ZOHO_REFRESH_TOKEN",
    "ZOHO_ACCOUNT_ID",
  ].filter((name) => !env[name]);
  if (missing.length > 0) {
    console.error(`Trip enquiry email is not set up. Missing: ${missing.join(", ")}`);
    return json({ ok: false, error: "Sending is not set up yet." }, 503);
  }

  const domain = env.ZOHO_DOMAIN || "com";
  const from = env.ENQUIRY_FROM || DEFAULT_ADDRESS;
  const to = env.ENQUIRY_TO || DEFAULT_ADDRESS;

  try {
    const token = await accessToken(env, domain);
    // Our copy first: if it fails, the traveller shouldn't get a confirmation.
    await sendMail(env, domain, token, { fromAddress: from, toAddress: to, ...teamEmail(enquiry) });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "Your enquiry could not be sent." }, 502);
  }

  try {
    const token = await accessToken(env, domain);
    await sendMail(env, domain, token, {
      fromAddress: from,
      toAddress: enquiry.email,
      ...travellerEmail(enquiry),
    });
  } catch (err) {
    // We already have the enquiry; a missing confirmation isn't worth an error.
    console.error(err);
  }

  return json({ ok: true });
}
