"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
export default function StepBar() {
  const pathname = usePathname();
  const steps: string[] = ["registeration", "interests"];
  const [currentStep, setCurrentStep] = useState<number>(1);
  useEffect(() => {
    if (pathname === "/auth/register/form") {
      console.log(1);

      setCurrentStep(1);
    }
    if (pathname === "/auth/register/interests") {
      setCurrentStep(2);
      console.log(2);
    }
  }, [pathname]);
  return (
    <nav className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        {steps.map((step: string, index: number) => {
          return (
            <div
              key={index}
              className={`step_item ${currentStep === index + 1 && "active"} ${
                index + 1 < currentStep && "complete"
              }`}
              style={{
                color: index + 1 < currentStep ? "black" : "gray",
              }}
            >
              <div className="step">
                {index + 1 < currentStep ? <TiTick size={24} /> : index + 1}
              </div>
              <div>{step}</div>
            </div>
          );
        })}
      </div>
      {/* <Link
        href="./form"
        className={`link ${
          pathname === "/auth/register/form" ? "link-accent" : "link-primary"
        }`}
      >
        Form
      </Link>
      <Link
        href="./interests"
        className={`link ${
          pathname === "/auth/register/interests"
            ? "link-accent"
            : "link-primary"
        }`}
      >
        Interests
      </Link> */}
    </nav>
  );
}
