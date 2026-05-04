export default function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600"
        aria-label="Chargement"
      />
    </div>
  );
}
