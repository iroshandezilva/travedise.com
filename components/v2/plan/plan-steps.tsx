"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { TripForm } from "./trip-form";

const STEPS = ["1 · Your trip", "2 · Your details"];

/**
 * The progress rail and the form section under it. They share the form's step, so the
 * rail lives here with the form; the help panel beside it is passed in as `aside`.
 *
 * On a phone and tablet the form comes first and the help panel follows it.
 */
export function PlanSteps({ aside }: { aside: ReactNode }) {
  const [step, setStep] = useState<1 | 2 | "sent">(1);
  const reached = step === 1 ? 1 : 2;

  return (
    <>
      <section
        aria-label="Progress"
        className="w-full shrink-0 bg-v2-cream py-[34px] gutter-v2 max-md:py-6"
      >
        <ol className="container-v2 m-0 flex list-none gap-3 p-0">
          {STEPS.map((text, i) => {
            const done = i < reached;
            return (
              <li
                key={text}
                aria-current={i === reached - 1 && step !== "sent" ? "step" : undefined}
                className="flex flex-1 flex-col gap-3"
              >
                <span
                  className={cn(
                    "h-[3px] transition-colors duration-300 motion-reduce:transition-none",
                    done ? "bg-v2-navy" : "bg-v2-navy/16",
                  )}
                />
                <span
                  className={cn(
                    "text-[15px]/[22px] max-md:text-[14px]/[20px]",
                    done ? "text-v2-navy" : "text-[#82909c]",
                  )}
                >
                  {text}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="form" className="w-full shrink-0 bg-white py-[76px] gutter-v2 max-md:py-10">
        <div className="container-v2 flex items-start gap-[60px] max-xl:gap-10 max-lg:flex-col-reverse max-lg:items-stretch max-lg:gap-10">
          {aside}
          <div className="min-w-0 flex-1">
            <TripForm onStep={setStep} />
          </div>
        </div>
      </section>
    </>
  );
}
