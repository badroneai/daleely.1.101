"use client";

import FractionOps from "./FractionOps";
import type { GradeLevel } from "@/lib/types";

interface FractionOpsClientProps {
  grade: GradeLevel | "all";
}

export default function FractionOpsClient({ grade }: FractionOpsClientProps) {
  return (
    <div className="mb-4">
      <FractionOps grade={grade} />
    </div>
  );
}
