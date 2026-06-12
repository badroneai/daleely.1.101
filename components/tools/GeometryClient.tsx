"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type GeometryScope } from "@/lib/tools/geometry/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "geometry";

export default function GeometryClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<GeometryScope>(() => {
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
        introText="اختر مهارة: الأشكال الرباعية، الزوايا، أو المستوى الإحداثي."
        emptyText="تدريب الهندسة متاح من الصف الرابع الابتدائي فما فوق."
      />
    </div>
  );
}
