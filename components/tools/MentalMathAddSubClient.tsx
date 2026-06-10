"use client";

import MentalMathAddSub from "./MentalMathAddSub";
import type { GradeLevel } from "@/lib/types";

interface MentalMathAddSubClientProps {
  grade: GradeLevel | "all";
}

export default function MentalMathAddSubClient({ grade }: MentalMathAddSubClientProps) {
  return (
    <div className="mb-4">
      <MentalMathAddSub grade={grade} />
    </div>
  );
}
