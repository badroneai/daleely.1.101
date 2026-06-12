"use client";

import BalloonGame from "./BalloonGame";
import MemoryGame from "./MemoryGame";
import SprintGame from "./SprintGame";
import LadderGame from "./LadderGame";
import QuizShowGame from "./QuizShowGame";
import DuelGame from "./DuelGame";
import WhackGame from "./WhackGame";
import SequenceGame from "./SequenceGame";
import SortingGame from "./SortingGame";
import AdventureGame from "./AdventureGame";

export default function GamePlayer({ id }: { id: string }) {
  if (id === "balloon") return <BalloonGame />;
  if (id === "memory") return <MemoryGame />;
  if (id === "sprint") return <SprintGame />;
  if (id === "ladder") return <LadderGame />;
  if (id === "quiz-show") return <QuizShowGame />;
  if (id === "duel") return <DuelGame />;
  if (id === "whack") return <WhackGame />;
  if (id === "sequence") return <SequenceGame />;
  if (id === "sorting") return <SortingGame />;
  if (id === "adventure") return <AdventureGame />;
  return <p className="text-center text-gray-600 py-12">هذه اللعبة قيد الإعداد — قريبًا 🚧</p>;
}
