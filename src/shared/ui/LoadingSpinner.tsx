interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = "AI 분석 중..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "var(--pink)", borderTopColor: "transparent" }}
      />
      <p className="text-sm" style={{ color: "var(--sub)" }}>
        {label}
      </p>
    </div>
  );
}
