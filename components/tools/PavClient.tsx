"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type PavScope } from "@/lib/tools/perimeter-area-volume/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "perimeter-area-volume";

export default function PavClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<PavScope>(() => {
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
        introText="اختر مهارة: المحيط، المساحة، أو الحجم."
        emptyText="تدريب المحيط والمساحة والحجم متاح من الصف الرابع الابتدائي فما فوق."
      />
    </div>
  );
}
