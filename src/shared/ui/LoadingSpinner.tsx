interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = "AI 분석 중..." }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-color-pink animate-spin" />
      <p className="text-sm text-color-sub">{label}</p>
    </div>
  );
}
