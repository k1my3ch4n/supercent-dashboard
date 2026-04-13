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

const scoreToSentiment = (score: number): { label: string; textClass: string; bgClass: string } => {
  if (score >= 4) {
    return {
      label: "긍정",
      textClass: "text-color-green",
      bgClass: "bg-color-green-a12",
    };
  }

  if (score <= 2) {
    return {
      label: "부정",
      textClass: "text-color-pink",
      bgClass: "bg-color-pink-a12",
    };
  }

  return {
    label: "중립",
    textClass: "text-color-yellow",
    bgClass: "bg-color-yellow-a12",
  };
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
    <div className="flex gap-3 px-size-18 py-size-14 border-b last:border-b-0 border-border-color">
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
          <span className="text-size-11 text-color-yellow">
            {"★".repeat(score)}
            {"☆".repeat(5 - score)}
          </span>
          <span
            className={`text-size-10 font-bold px-1.5 py-px rounded-size-4 ${sentiment.bgClass} ${sentiment.textClass}`}
          >
            {sentiment.label}
          </span>
          {isNew && (
            <span className="text-size-9 font-bold px-1.5 py-px rounded-size-3 bg-color-pink-a14 text-color-pink">
              NEW
            </span>
          )}
          {category && (
            <span className="text-size-10 px-1.5 py-px rounded-size-4 border border-border-color text-color-sub bg-color-white-a03">
              {category}
            </span>
          )}
          <span className="text-size-10 ml-auto flex-shrink-0 text-color-muted">{date}</span>
        </div>
        <p className="text-size-12 leading-[1.5] text-color-text-weak">{text}</p>
      </div>
    </div>
  );
}
