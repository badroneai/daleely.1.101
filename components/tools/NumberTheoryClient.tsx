"use client";

import { useMemo } from "react";
import { getToolScope } from "@/lib/CURRICULUM_MATRIX";
import DrillTool from "./DrillTool";
import { availableLevels, generateQuestion, type NumberTheoryScope } from "@/lib/tools/number-theory/engine";
import type { GradeLevel } from "@/lib/types";

const SLUG = "number-theory";

export default function NumberTheoryClient({ grade }: { grade: GradeLevel | "all" }) {
  const scope = useMemo<NumberTheoryScope>(() => {
    const s = getToolScope(SLUG, grade);
    return s && typeof s.max === "number" ? s : { max: 0 };
  }, [grade]);
  const levels = useMemo(() => availableLevels(scope), [scope]);

  return (
    <div className="mb-4">
      <DrillTool
        slug={SLUG}
        levels={levels}
        generate={(lvl) => generateQuestion(lvl, scope)}
        introText="اختر مهارة: القواسم، الأعداد الأولية، أو القاسم المشترك الأكبر."
        emptyText="تدريب القواسم والمضاعفات متاح من الصف الرابع الابتدائي فما فوق."
      />
    </div>
  );
}
