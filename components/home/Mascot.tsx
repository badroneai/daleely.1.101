// "نجمي" — the friendly star mascot. Ties to the stars gamification and gives the
// home a character kids recognize. Pure SVG, no dependency. Decorative only.

export default function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="نجمة مبتسمة">
      <defs>
        <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M 50,4 L 61.8,33.8 L 93.7,35.8 L 69,56.2 L 77,87.2 L 50,70 L 23,87.2 L 31,56.2 L 6.3,35.8 L 38.2,33.8 Z"
        fill="url(#starGrad)"
        stroke="#d97706"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="44" r="3.4" fill="#1f2937" />
      <circle cx="59" cy="44" r="3.4" fill="#1f2937" />
      <circle cx="42.2" cy="42.8" r="1" fill="#fff" />
      <circle cx="60.2" cy="42.8" r="1" fill="#fff" />
      <path d="M 41,54 Q 50,63 59,54" fill="none" stroke="#1f2937" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="34" cy="52" r="3" fill="#fb7185" opacity="0.55" />
      <circle cx="66" cy="52" r="3" fill="#fb7185" opacity="0.55" />
    </svg>
  );
}
