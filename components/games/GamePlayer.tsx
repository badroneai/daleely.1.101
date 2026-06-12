"use client";

import BalloonGame from "./BalloonGame";
import MemoryGame from "./MemoryGame";
import SprintGame from "./SprintGame";

export default function GamePlayer({ id }: { id: string }) {
  if (id === "balloon") return <BalloonGame />;
  if (id === "memory") return <MemoryGame />;
  if (id === "sprint") return <SprintGame />;
  return <p className="text-center text-gray-600 py-12">هذه اللعبة قيد الإعداد — قريبًا 🚧</p>;
}
