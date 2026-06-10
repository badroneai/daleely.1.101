"use client";

import Fractions from "./Fractions";
import type { GradeLevel } from "@/lib/types";

interface FractionsClientProps {
  grade: GradeLevel | "all";
}

export default function FractionsClient({ grade }: FractionsClientProps) {
  return (
    <div className="mb-4">
      <Fractions grade={grade} />
    </div>
  );
}
