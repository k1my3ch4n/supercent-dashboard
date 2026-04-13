interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-size-8 border text-sm bg-color-pink-a06 border-color-pink-a20 text-color-pink">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
}
