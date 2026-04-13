import Card from "@shared/ui/Card";
import ReviewItem from "./ReviewItem";

const MOCK_REVIEWS = [
  {
    id: "1",
    userName: "GameLover_KR",
    score: 2,
    text: "게임은 재밌는데 광고가 너무 많아요. 3판마다 광고가 나옵니다. 제발 줄여주세요.",
    date: "1시간 전",
    avatarColor: "#3d0060",
    category: "광고",
    isNew: true,
  },
  {
    id: "2",
    userName: "CrashVictim99",
    score: 1,
    text: "The event dungeon crashes every time I enter. Lost 3 days of progress. This is unacceptable.",
    date: "2시간 전",
    avatarColor: "#7a1a00",
    category: "버그",
    isNew: true,
  },
  {
    id: "3",
    userName: "HappyPlayer22",
    score: 5,
    text: "최신 업데이트로 결제 버그 고쳐줘서 감사해요! 이제 훨씬 쾌적하게 즐기고 있습니다.",
    date: "3시간 전",
    avatarColor: "#005530",
    category: "결제",
  },
  {
    id: "4",
    userName: "Tanaka_JP",
    score: 2,
    text: "ゲームはいいですが、広告が多すぎて遊べません。課金しても改善されないのはひどいです。",
    date: "5시간 전",
    avatarColor: "#00102a",
    category: "광고",
  },
  {
    id: "5",
    userName: "StarPlayer",
    score: 4,
    text: "전반적으로 재미있는 게임입니다. 다만 광고 빈도가 조금 조정되면 더 좋을 것 같아요.",
    date: "7시간 전",
    avatarColor: "#2a0500",
    category: "광고",
  },
];

interface ReviewListProps {
  newCount?: number;
}

export default function ReviewList({ newCount = 2 }: ReviewListProps) {
  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">최근 리뷰</div>
          <div className="text-size-10 mt-0.5 text-color-sub">실시간 수집 · Google Play</div>
        </div>
        {newCount > 0 && (
          <span className="text-size-10 font-bold px-2 py-0.5 rounded-full bg-color-pink-a14 text-color-pink">
            NEW {newCount}
          </span>
        )}
      </div>
      <div>
        {MOCK_REVIEWS.map((review) => (
          <ReviewItem
            key={review.id}
            userName={review.userName}
            score={review.score}
            text={review.text}
            date={review.date}
            avatarColor={review.avatarColor}
            category={review.category}
            isNew={review.isNew}
          />
        ))}
      </div>
    </Card>
  );
}
