// Route-level loading state shown during navigation/streaming.

export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center" role="status" aria-label="جارٍ التحميل">
      <div className="animate-pulse text-gray-400 text-lg">جارٍ التحميل…</div>
    </div>
  );
}
