"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  budgets,
  channels,
  countries,
  countryCodes,
  durations,
  enquiryEmail,
  heardFrom,
  interests,
  journeyOptions,
} from "@/content/v2/plan";
import { cn } from "@/lib/cn";

type Step = 1 | 2 | "sent";

const NOT_SURE = durations.length - 1;

const field =
  "h-14 w-full min-w-0 border border-v2-navy/22 bg-white px-[18px] text-[15px] text-v2-navy placeholder:text-v2-navy/42 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-navy";
const label = "text-[16px]/[24px] text-v2-navy";
const hint = "m-0 text-[14px]/[21px] text-[#6e808e]";

/**
 * The two-step trip enquiry: the trip first, then how to reach you, then a thank-you.
 *
 * The site is a static export with no form handler, so sending opens the visitor's
 * email app with the enquiry written out, addressed to us. The thank-you says so,
 * rather than promising a reply to a message that may never have left.
 *
 * `onStep` lets the page's progress rail follow along.
 */
export function TripForm({ onStep }: { onStep?: (step: Step) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [journey, setJourney] = useState("");
  const [when, setWhen] = useState("");
  const [duration, setDuration] = useState(NOT_SURE);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [ages, setAges] = useState("");
  const [budget, setBudget] = useState(budgets.length - 1);
  const [picked, setPicked] = useState<number[]>([]);
  const [notes, setNotes] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(countryCodes[0]);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [channel, setChannel] = useState(0);
  const [heard, setHeard] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shown = useRef<Step>(step);

  // Each step change moves focus to the new step's heading, so keyboard and screen
  // reader users land at the top of what just appeared. Compared against the step last
  // shown rather than skipping the first run, which runs twice in development.
  useEffect(() => {
    onStep?.(step);
    if (shown.current === step) return;
    shown.current = step;
    headingRef.current?.focus({ preventScroll: true });
    formRef.current?.closest("section")?.scrollIntoView({ block: "start" });
  }, [step, onStep]);

  const interestList = interests.filter((_, i) => picked.includes(i));
  const summary = [
    "Sri Lanka",
    journey,
    durations[duration] === "Not sure yet" ? "length not set" : durations[duration],
    budgets[budget] === "Not sure yet" ? "budget not set" : `${budgets[budget]} per person`,
    interestList.join(", "),
  ]
    .filter(Boolean)
    .join(" · ");

  function toggleInterest(i: number) {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  }

  function send() {
    if (!formRef.current?.reportValidity()) return;
    const block = (lines: (string | false)[]) =>
      lines.filter((l): l is string => Boolean(l)).join("\n");
    const body = [
      block([
        `Name: ${first} ${last}`,
        `Email: ${email}`,
        `Phone: ${code === "Other" ? "" : `${code} `}${phone}`,
        country !== "" && `Country or region: ${country}`,
        `Best way to reach me: ${channels[channel]}`,
        heard !== "" && `Heard about Travedise from: ${heard}`,
      ]),
      block([
        `Journey: ${journey || "Open"}`,
        when !== "" && `When: ${when}`,
        `Length: ${durations[duration]}`,
        `Travellers: ${adults} adults, ${children} children${ages ? ` (ages ${ages})` : ""}`,
        `Budget per person: ${budgets[budget]}`,
        interestList.length > 0 && `Interests: ${interestList.join(", ")}`,
      ]),
      notes !== "" && `What would make this trip mine:\n${notes}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    const subject = `Trip enquiry from ${first} ${last}`;
    window.location.href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStep("sent");
  }

  function reset() {
    setStep(1);
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1) setStep(2);
        else if (step === 2) send();
      }}
    >
      {step === 1 && (
        <Panel key="one">
          <Heading
            ref={headingRef}
            title="Tell us about your trip."
            body="Share what you know so far. We can work out the rest together."
          />

          <div className="flex flex-col gap-3">
            <span className={label}>Where would you like to go?</span>
            <div className="flex items-center gap-3.5 max-md:flex-col max-md:items-start max-md:gap-2.5">
              <span className="flex h-12 items-center rounded-full bg-v2-navy px-[22px] text-[15px] text-white">
                Sri Lanka
              </span>
              <span className="text-[14px]/[20px] text-[#6e808e]">
                Our speciality, and the only island we plan.
              </span>
            </div>
          </div>

          <Row>
            <Field id="journey" label="Is there a journey you like?" optional>
              <select
                id="journey"
                value={journey}
                onChange={(e) => setJourney(e.target.value)}
                className={field}
              >
                <option value="">Choose a journey, or leave this open</option>
                {journeyOptions.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </Field>
            <Field id="when" label="When would you like to go?">
              <input
                id="when"
                type="month"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                placeholder="e.g. March 2027"
                className={field}
              />
            </Field>
          </Row>

          <Chips
            legend="How long would you stay?"
            options={durations}
            isOn={(i) => i === duration}
            onPick={setDuration}
          />

          <Row>
            <Field id="adults" label="Adults">
              <input
                id="adults"
                type="number"
                min={1}
                required
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className={field}
              />
            </Field>
            <Field id="children" label="Children">
              <input
                id="children"
                type="number"
                min={0}
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className={field}
              />
            </Field>
            <Field id="ages" label="Ages of children" optional>
              <input
                id="ages"
                type="text"
                placeholder="e.g. 6 and 9"
                value={ages}
                onChange={(e) => setAges(e.target.value)}
                className={field}
              />
            </Field>
          </Row>

          <Chips
            legend="What would you like to spend per person?"
            options={budgets}
            isOn={(i) => i === budget}
            onPick={setBudget}
            note="A guide is enough, and it excludes international flights."
          />

          <Chips
            legend="What pulls you to the island?"
            aside="Choose as many as you like"
            options={interests}
            isOn={(i) => picked.includes(i)}
            onPick={toggleInterest}
          />

          <div className="flex flex-col gap-3">
            <label htmlFor="notes" className={label}>
              What would make this trip yours?
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Places, interests, pace, anything you would rather not rush."
              className={cn(field, "h-auto resize-y py-4 leading-6")}
            />
            <p className={hint}>A few sentences are helpful. You can add more later.</p>
          </div>

          <Footer>
            <span className="text-[15px]/[22px] text-[#6e808e]">
              Step 1 of 2 · your details are next
            </span>
            <PrimaryButton>Continue to your details</PrimaryButton>
          </Footer>
        </Panel>
      )}

      {step === 2 && (
        <Panel key="two">
          <Heading
            ref={headingRef}
            title="How can we reach you?"
            body="We will use these details to talk through your Sri Lanka plans."
          />

          <div className="flex items-center justify-between gap-6 bg-v2-cream px-[22px] py-[18px] max-md:flex-col max-md:items-start max-md:gap-3 max-md:px-4">
            <span className="text-[15px]/[23px] text-[#42586a]">{summary}</span>
            <SecondaryButton onClick={() => setStep(1)} className="h-10 px-[18px] text-[14px]">
              Edit trip
            </SecondaryButton>
          </div>

          <Row>
            <Field id="first" label="First name" required>
              <input
                id="first"
                type="text"
                autoComplete="given-name"
                required
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className={field}
              />
            </Field>
            <Field id="last" label="Last name" required>
              <input
                id="last"
                type="text"
                autoComplete="family-name"
                required
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className={field}
              />
            </Field>
          </Row>

          <Row>
            <Field id="email" label="Email address" required>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </Field>
            <Field id="phone" label="Phone number" required>
              <div className="flex gap-2.5">
                <select
                  aria-label="Country code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={cn(field, "w-[120px] shrink-0 px-3.5 max-md:w-[96px]")}
                >
                  {countryCodes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel-national"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={field}
                />
              </div>
            </Field>
          </Row>

          <Field id="country" label="Country or region">
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={field}
            >
              <option value="">Select your country or region</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Chips
            legend="How would you like us to reach you?"
            options={channels}
            isOn={(i) => i === channel}
            onPick={setChannel}
          />

          <Field id="heard" label="How did you hear about us?" optional>
            <select
              id="heard"
              value={heard}
              onChange={(e) => setHeard(e.target.value)}
              className={field}
            >
              <option value="">Please select</option>
              {heardFrom.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </Field>

          <p className={hint}>
            Sending opens your email app with the enquiry written out, addressed to {enquiryEmail}.
            By sending it you agree that Travedise may contact you about your trip. Your details are
            used to answer this request, nothing else.
          </p>

          <Footer>
            <SecondaryButton onClick={() => setStep(1)}>← Back to your trip</SecondaryButton>
            <PrimaryButton>Send your enquiry</PrimaryButton>
          </Footer>
        </Panel>
      )}

      {step === "sent" && (
        <div
          key="sent"
          className="v2-step-in flex flex-col gap-7 bg-v2-navy px-12 py-16 max-md:px-5 max-md:py-10"
          style={{
            backgroundImage:
              "radial-gradient(520px 340px at 12% 0%, rgba(71,205,255,0.22), rgba(0,0,0,0) 64%), radial-gradient(460px 320px at 92% 20%, rgba(196,175,140,0.2), rgba(0,0,0,0) 64%)",
          }}
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="m-0 font-display text-[34px]/[42px] font-normal tracking-[-0.005em] text-white outline-none max-md:text-[28px]/[36px]"
          >
            Thank you. That is enough to start with.
          </h2>
          <p className="m-0 max-w-[620px] text-[17px]/[27px] text-v2-muted max-md:text-[15px]/[24px]">
            Your email app should have opened with the enquiry written out. Once you send it, a
            travel designer will read it and come back within a day, usually with a question or two
            before any suggestions. If nothing opened, write to{" "}
            <a href={`mailto:${enquiryEmail}`} className="text-white underline">
              {enquiryEmail}
            </a>{" "}
            or call us on the numbers beside this form.
          </p>
          <div className="flex gap-3.5 max-md:flex-col">
            <Link
              href="/packages"
              className="flex h-[52px] items-center justify-center rounded-full bg-v2-sky px-6 text-[15px] font-semibold text-[#10212b]"
            >
              Back to the journeys
            </Link>
            <button
              type="button"
              onClick={reset}
              className="h-[52px] rounded-full border border-white/40 px-6 text-[15px] text-white"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="v2-step-in flex flex-col gap-10 bg-[#fcfbf9] px-12 pt-12 pb-10 max-md:gap-8 max-md:px-5 max-md:pt-8 max-md:pb-8">
      {children}
    </div>
  );
}

function Heading({
  ref,
  title,
  body,
}: {
  ref: React.Ref<HTMLHeadingElement>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2
        ref={ref}
        tabIndex={-1}
        className="m-0 font-display text-[28px]/[36px] font-normal tracking-[-0.005em] text-v2-navy outline-none max-md:text-[24px]/[32px]"
      >
        {title}
      </h2>
      <p className="m-0 text-[16px]/[25px] text-[#42586a] max-md:text-[15px]/[24px]">{body}</p>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex gap-5 max-md:flex-col">{children}</div>;
}

function Field({
  id,
  label: text,
  optional,
  required,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <label htmlFor={id} className={label}>
        {text}
        {required && <span aria-hidden> *</span>}
        {optional && <span className="text-[#6e808e]"> Optional</span>}
      </label>
      {children}
    </div>
  );
}

/** A row of pill toggles. One pick or many depends on what `onPick` does. */
function Chips({
  legend,
  aside,
  options,
  isOn,
  onPick,
  note,
}: {
  legend: string;
  aside?: string;
  options: string[];
  isOn: (i: number) => boolean;
  onPick: (i: number) => void;
  note?: string;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-3.5 border-0 p-0">
      <legend className={cn(label, "mb-3.5 p-0")}>
        {legend}
        {aside && <span className="text-[#6e808e]"> {aside}</span>}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option, i) => {
          const on = isOn(i);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(i)}
              className={cn(
                "h-12 rounded-full border px-[22px] text-[15px] transition-colors duration-150 ease-out-quad motion-reduce:transition-none max-md:h-11 max-md:px-[18px] max-md:text-[14px]",
                on
                  ? "border-v2-navy bg-v2-navy text-white"
                  : "border-v2-navy/24 bg-white text-v2-navy hover:border-v2-navy/50",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {note && <p className={hint}>{note}</p>}
    </fieldset>
  );
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[30px] pt-1.5 max-md:flex-col-reverse max-md:items-stretch max-md:gap-4">
      {children}
    </div>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="flex h-[60px] items-center justify-between gap-4 rounded-full bg-v2-sky pr-2.5 pl-7 transition-[opacity,transform] duration-150 ease-out-quad hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none"
    >
      <span className="text-[16px] font-semibold text-[#10212b]">{children}</span>
      <span
        aria-hidden
        className="flex size-[42px] items-center justify-center rounded-full border border-[#10212b]/40 text-[15px] text-[#10212b]"
      >
        →
      </span>
    </button>
  );
}

function SecondaryButton({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-[52px] shrink-0 rounded-full border border-v2-navy/30 bg-transparent px-[22px] text-[15px] text-v2-navy hover:bg-v2-navy/5",
        className,
      )}
    >
      {children}
    </button>
  );
}
