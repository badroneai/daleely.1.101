"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type AlgebraScope } from "@/lib/tools/algebra/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "algebra";

export default function AlgebraClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<AlgebraScope>(() => {
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
        introText="اختر مهارة: تقييم العبارة، ترتيب العمليات، أو حل المعادلة."
        emptyText="تدريب العبارات والمعادلات متاح من الصف الخامس الابتدائي فما فوق."
      />
    </div>
  );
}
