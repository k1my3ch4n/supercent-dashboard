interface ReviewItemProps {
  userName: string;
  score: number;
  text: string;
  date: string;
  avatarColor?: string;
  sentimentLabel?: string;
  category?: string;
  isNew?: boolean;
}

const scoreToSentiment = (score: number): { label: string; color: string } => {
  if (score >= 4) {
    return { label: "긍정", color: "var(--green)" };
  }

  if (score <= 2) {
    return { label: "부정", color: "var(--pink)" };
  }

  return { label: "중립", color: "var(--yellow)" };
};

export default function ReviewItem({
  userName,
  score,
  text,
  date,
  avatarColor = "#3d0060",
  category,
  isNew = false,
}: ReviewItemProps) {
  const sentiment = scoreToSentiment(score);
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div
      className="flex gap-3 px-[18px] py-[14px] border-b last:border-b-0"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* 아바타 */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: avatarColor }}
      >
        {initial}
      </div>
      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold">{userName}</span>
          <span className="text-[11px]" style={{ color: "var(--yellow)" }}>
            {"★".repeat(score)}
            {"☆".repeat(5 - score)}
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-px rounded-[4px]"
            style={{
              background: `rgba(${sentiment.color === "var(--green)" ? "0,230,118" : sentiment.color === "var(--pink)" ? "255,45,122" : "255,230,0"},.12)`,
              color: sentiment.color,
            }}
          >
            {sentiment.label}
          </span>
          {isNew && (
            <span
              className="text-[9px] font-bold px-1.5 py-px rounded-[3px]"
              style={{ background: "rgba(255,45,122,.14)", color: "var(--pink)" }}
            >
              NEW
            </span>
          )}
          {category && (
            <span
              className="text-[10px] px-1.5 py-px rounded-[4px] border"
              style={{
                color: "var(--sub)",
                borderColor: "var(--border-color)",
                background: "rgba(255,255,255,.03)",
              }}
            >
              {category}
            </span>
          )}
          <span className="text-[10px] ml-auto flex-shrink-0" style={{ color: "var(--muted)" }}>
            {date}
          </span>
        </div>
        <p className="text-[12px] leading-[1.5]" style={{ color: "#bbb" }}>
          {text}
        </p>
      </div>
    </div>
  );
}
