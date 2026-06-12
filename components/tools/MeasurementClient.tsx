"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type MeasurementScope } from "@/lib/tools/measurement/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "measurement";

export default function MeasurementClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<MeasurementScope>(() => {
    const s = getToolScope(SLUG, grade);
    return s && typeof s.enabled === "boolean" ? s : { enabled: false };
  }, [grade]);
  const levels = useMemo(() => availableLevels(scope), [scope]);

  return (
    <div className="mb-4">
      <DrillTool
        slug={SLUG}
        levels={levels}
        generate={(lvl) => generateQuestion(lvl, scope)}
        introText="اختر مهارة: تحويل وحدات الطول، الكتلة، أو السعة."
        emptyText="تدريب وحدات القياس متاح من الصف الرابع الابتدائي فما فوق."
      />
    </div>
  );
}
