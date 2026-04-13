import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";

interface ReplyItemData {
  userName: string;
  avatarColor: string;
  avatarInitial: string;
  date: string;
  score: number;
  reviewText: string;
  draftText: string;
  lang: string;
}

const MOCK_REPLY_ITEMS: ReplyItemData[] = [
  {
    userName: "Tanaka_JP",
    avatarColor: "#3d0060",
    avatarInitial: "T",
    date: "2시간 전",
    score: 1,
    reviewText:
      "ゲームはいいですが、広告が多すぎて遊べません。課金しても改善されないのはひどいです。",
    draftText:
      "田中様、ご不便をおかけして大変申し訳ございません。広告の頻度については現在改善に取り組んでおります。ご意見をいただきありがとうございます。近日中にアップデートで対応予定ですので、今しばらくお待ちください。",
    lang: "🇯🇵 일본어",
  },
  {
    userName: "CrashVictim99",
    avatarColor: "#7a1a00",
    avatarInitial: "C",
    date: "5시간 전",
    score: 2,
    reviewText:
      "The event dungeon crashes every single time I try to enter it. Lost 3 days of progress. Fix this NOW.",
    draftText:
      "We sincerely apologize for the crash issue in the event dungeon. Our team has identified the problem and a hotfix is being deployed within 24 hours. Your lost progress will be fully compensated — please contact our support team with your player ID.",
    lang: "🇺🇸 영어",
  },
];

export default function AICSAutoReply() {
  return (
    <Card>
      <div
        className="flex items-center justify-between px-[18px] py-[14px] border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <div className="text-[13px] font-extrabold">AI CS 자동 답변</div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--sub)" }}>
            부정 리뷰 · AI 초안 자동 생성 · 다국어 지원
          </div>
        </div>
        <Badge variant="purple">AI</Badge>
      </div>
      <div className="px-[18px] py-[14px] flex flex-col gap-[14px]">
        {MOCK_REPLY_ITEMS.map((item, index) => (
          <div
            key={index}
            className="rounded-[8px] border overflow-hidden"
            style={{ borderColor: "var(--border-color)" }}
          >
            {/* 원본 리뷰 */}
            <div
              className="px-[14px] py-[11px] border-b"
              style={{ background: "rgba(255,45,122,.04)", borderColor: "var(--border-color)" }}
            >
              <div className="flex items-center justify-between mb-[5px]">
                <div className="flex items-center gap-[7px]">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background: item.avatarColor }}
                  >
                    {item.avatarInitial}
                  </div>
                  <span className="text-[11px] font-bold">{item.userName}</span>
                  <span className="text-[11px]" style={{ color: "var(--yellow)" }}>
                    {"★".repeat(item.score)}
                    {"☆".repeat(5 - item.score)}
                  </span>
                </div>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                  {item.date}
                </span>
              </div>
              <p className="text-[11px] leading-[1.5]" style={{ color: "#bbb" }}>
                {item.reviewText}
              </p>
            </div>
            {/* AI 초안 */}
            <div className="px-[14px] py-[11px]">
              <div
                className="flex items-center gap-[5px] text-[10px] font-bold tracking-[1px] uppercase mb-[6px]"
                style={{ color: "var(--purple)" }}
              >
                🤖 AI 초안{" "}
                <span
                  className="text-[9px] font-normal normal-case"
                  style={{ color: "var(--muted)" }}
                >
                  {item.lang}
                </span>
              </div>
              <p className="text-[11px] leading-[1.6]" style={{ color: "#ccc" }}>
                {item.draftText}
              </p>
              <div className="flex gap-[7px] mt-[9px]">
                <button
                  className="text-[10px] font-bold px-[10px] py-1 rounded-[4px] border cursor-pointer transition-all duration-100"
                  style={{
                    background: "rgba(182,109,255,.12)",
                    borderColor: "rgba(182,109,255,.3)",
                    color: "var(--purple)",
                  }}
                >
                  답변 등록
                </button>
                <button
                  className="text-[10px] font-bold px-[10px] py-1 rounded-[4px] border cursor-pointer transition-all duration-100"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "none",
                    color: "var(--sub)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--purple)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--purple)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--border-color)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
                  }}
                >
                  수정
                </button>
                <button
                  className="text-[10px] font-bold px-[10px] py-1 rounded-[4px] border cursor-pointer transition-all duration-100"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "none",
                    color: "var(--sub)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--purple)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--purple)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--border-color)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
                  }}
                >
                  재생성
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
