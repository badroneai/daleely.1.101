"use client";

import MultiplicationTable from "./MultiplicationTable";
import type { GradeLevel } from "@/lib/types";

interface MultiplicationTableClientProps {
  grade: GradeLevel | "all";
}

export default function MultiplicationTableClient({ grade }: MultiplicationTableClientProps) {
  return (
    <div className="mb-4">
      <MultiplicationTable grade={grade} />
    </div>
  );
}
