"use client";

import { Check } from "lucide-react";

interface Step {
  title: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="absolute h-full bg-primary transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index < currentStep && onStepClick;

          return (
            <div
              key={step.title}
              className={`flex flex-col items-center ${
                isClickable ? "cursor-pointer" : ""
              }`}
              onClick={() => isClickable && onStepClick(index)}
            >
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                  ${
                    isComplete
                      ? "bg-primary border-primary"
                      : isCurrent
                      ? "border-primary bg-background"
                      : "border-white/20 bg-background"
                  }
                `}
              >
                {isComplete ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      isCurrent ? "text-primary" : "text-white/50"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Text */}
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    isCurrent ? "text-white" : "text-white/70"
                  }`}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-white/50">{step.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}