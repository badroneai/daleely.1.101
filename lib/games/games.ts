// Games registry. `built` flips on as each game ships.
export interface GameMeta {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  built: boolean;
}

export const GAMES: GameMeta[] = [
  { id: "balloon", title: "افقع البالون", emoji: "🎈", desc: "افقع البالون الذي يحمل الإجابة الصحيحة", built: true },
  { id: "memory", title: "لعبة الذاكرة", emoji: "🃏", desc: "اقلب البطاقات وطابِق المسألة بناتجها", built: true },
  { id: "sprint", title: "سباق الأرقام", emoji: "⏱️", desc: "أكبر عدد إجابات صحيحة قبل انتهاء الوقت", built: true },
  { id: "ladder", title: "سُلّم النجوم", emoji: "🪜", desc: "اصعد درجة مع كل إجابة صحيحة", built: false },
  { id: "whack", title: "اضرب الخلد", emoji: "🔨", desc: "اضرب الإجابة الصحيحة بسرعة", built: false },
  { id: "quiz-show", title: "مسابقة النجوم", emoji: "🏆", desc: "أسئلة صاعدة مع مساعدة ٥٠:٥٠", built: false },
  { id: "sequence", title: "سباق الترتيب", emoji: "↕️", desc: "رتّب المراحل والأحداث بالترتيب الصحيح", built: false },
  { id: "sorting", title: "فرز سريع", emoji: "🗂️", desc: "وزّع العناصر في السلال الصحيحة", built: false },
  { id: "adventure", title: "مغامرة الجزيرة", emoji: "🗺️", desc: "تحدّيات المنهج في مغامرة شيّقة", built: false },
  { id: "duel", title: "مبارزة", emoji: "⚔️", desc: "لاعبان على جهاز واحد يتنافسان", built: false },
];

export function getGame(id: string): GameMeta | null {
  return GAMES.find((g) => g.id === id) ?? null;
}
