"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type StatisticsScope } from "@/lib/tools/statistics/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "statistics";

export default function StatisticsClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<StatisticsScope>(() => {
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
        introText="اختر مهارة: المتوسط الحسابي، الوسيط، أو الاحتمال."
        emptyText="تدريب الإحصاء والاحتمال متاح من الصف الخامس الابتدائي فما فوق."
      />
    </div>
  );
}
