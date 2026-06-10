"use client";

import MultiplicationQuiz from "./MultiplicationQuiz";
import type { GradeLevel } from "@/lib/types";

interface MultiplicationQuizClientProps {
  grade: GradeLevel | "all";
}

export default function MultiplicationQuizClient({ grade }: MultiplicationQuizClientProps) {
  return (
    <div className="mb-4">
      <MultiplicationQuiz grade={grade} />
    </div>
  );
}
