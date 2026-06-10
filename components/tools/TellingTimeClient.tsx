"use client";

import TellingTime from "./TellingTime";
import type { GradeLevel } from "@/lib/types";

interface TellingTimeClientProps {
  grade: GradeLevel | "all";
}

export default function TellingTimeClient({ grade }: TellingTimeClientProps) {
  return (
    <div className="mb-4">
      <TellingTime grade={grade} />
    </div>
  );
}
