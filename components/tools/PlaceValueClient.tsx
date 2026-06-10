"use client";

import PlaceValue from "./PlaceValue";
import type { GradeLevel } from "@/lib/types";

interface PlaceValueClientProps {
  grade: GradeLevel | "all";
}

export default function PlaceValueClient({ grade }: PlaceValueClientProps) {
  return (
    <div className="mb-4">
      <PlaceValue grade={grade} />
    </div>
  );
}
