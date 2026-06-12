"use client";

import Decimals from "./Decimals";
import type { GradeLevel } from "@/lib/types";

interface DecimalsClientProps {
  grade: GradeLevel | "all";
}

export default function DecimalsClient({ grade }: DecimalsClientProps) {
  return (
    <div className="mb-4">
      <Decimals grade={grade} />
    </div>
  );
}
