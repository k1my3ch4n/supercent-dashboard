interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3 rounded-[8px] border text-sm"
      style={{
        background: "rgba(255,45,122,.06)",
        borderColor: "rgba(255,45,122,.2)",
        color: "var(--pink)",
      }}
    >
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
}
