import { useTranslations } from "next-intl";
import { Dot, Glow, Text } from "@/components/ui";

type StepTone = "done" | "active" | "pending";

const steps: {
  key: "step1" | "step2" | "step3" | "step4" | "step5";
  tone: StepTone;
}[] = [
  { key: "step1", tone: "done" },
  { key: "step2", tone: "done" },
  { key: "step3", tone: "done" },
  { key: "step4", tone: "active" },
  { key: "step5", tone: "pending" },
];

const dotProps: Record<
  StepTone,
  { tone: "primary" | "term-amber" | "term-grey"; variant: "filled" | "ring" }
> = {
  done: { tone: "primary", variant: "filled" },
  active: { tone: "term-amber", variant: "ring" },
  pending: { tone: "term-grey", variant: "ring" },
};

const textTone: Record<StepTone, "default" | "term-amber" | "faint"> = {
  done: "default",
  active: "term-amber",
  pending: "faint",
};

export function PipelineCard() {
  const t = useTranslations("home.pipeline");

  return (
    <div className="relative w-full self-start">
      <Glow intensity="strong" pulse className="-inset-e-12 -top-10 size-100" />

      <div className="border-border bg-card relative overflow-hidden rounded-[10px] border">
        <div className="border-border bg-panel flex items-center gap-2 border-b px-4.5 py-3.5">
          <Dot tone="term-red" />
          <Dot tone="term-amber" />
          <Dot tone="term-grey" />
          <Text as="span" font="mono" size="xs" tone="faint" className="ms-2">
            {t("log")}
          </Text>
        </div>

        <div className="flex flex-col px-5.5 py-6">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <div key={step.key} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <Dot {...dotProps[step.tone]} />
                  {!last && <span className="bg-border min-h-7 w-px flex-1" />}
                </div>
                <Text
                  as="span"
                  font="mono"
                  size="xs"
                  tone={textTone[step.tone]}
                  className={!last ? "pb-5" : undefined}
                >
                  {t(step.key)}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
