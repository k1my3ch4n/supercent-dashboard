import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";

interface ClusterData {
  icon: string;
  name: string;
  count: number;
  quote: string;
  keywords: string[];
  badgeVariant: "pink" | "green" | "yellow" | "blue" | "purple";
}

const MOCK_CLUSTERS: ClusterData[] = [
  {
    icon: "🔴",
    name: "광고 피로도",
    count: 1082,
    quote: '"게임은 재밌는데 광고가 너무 많아서 못하겠어요. 3판마다 광고가 나옵니다."',
    keywords: ["광고 과다", "리워드 없음", "강제 광고", "레벨 10-20"],
    badgeVariant: "pink",
  },
  {
    icon: "⚠️",
    name: "크래시 & 버그",
    count: 473,
    quote: '"이벤트 던전 들어가면 100% 튕깁니다. 업데이트 후 계속 이러네요."',
    keywords: ["이벤트 던전", "앱 크래시", "데이터 손실", "긴급"],
    badgeVariant: "yellow",
  },
  {
    icon: "💳",
    name: "결제 & 밸런스",
    count: 318,
    quote: '"유료 아이템 가격 대비 효과가 너무 부족합니다. 과금 유도가 심해요."',
    keywords: ["과금 유도", "밸런스", "가격 정책", "P2W"],
    badgeVariant: "blue",
  },
  {
    icon: "🌏",
    name: "다국어 미지원",
    count: 201,
    quote: '"No response from CS for 3 weeks. Japanese players feel ignored."',
    keywords: ["CS 무응답", "번역 오류", "일본어", "독일어"],
    badgeVariant: "purple",
  },
];

export default function AIPainPointClusters() {
  return (
    <Card>
      <div
        className="flex items-center justify-between px-[18px] py-[14px] border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <div className="text-[13px] font-extrabold">AI 페인 포인트 클러스터</div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--sub)" }}>
            자동 클러스터링 · 핵심 이슈 분류
          </div>
        </div>
        <Badge variant="purple">AI</Badge>
      </div>
      <div className="px-[18px] py-[14px] flex flex-col gap-[10px]">
        {MOCK_CLUSTERS.map((cluster, index) => (
          <div
            key={index}
            className="rounded-[8px] border px-[14px] py-3 cursor-pointer transition-colors duration-150"
            style={{ background: "var(--card2)", borderColor: "var(--border-color)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
            }}
          >
            <div className="flex items-center justify-between mb-[6px]">
              <div className="flex items-center gap-[6px] text-xs font-bold">
                <span>{cluster.icon}</span>
                <span>{cluster.name}</span>
              </div>
              <span className="text-[11px]" style={{ color: "var(--sub)" }}>
                {cluster.count.toLocaleString()}개 리뷰
              </span>
            </div>
            <div
              className="text-[11px] leading-[1.5] italic pl-[10px] border-l-2 mb-[7px]"
              style={{ color: "var(--sub)", borderColor: "var(--border-color)" }}
            >
              {cluster.quote}
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {cluster.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-[10px] px-[7px] py-0.5 rounded-full border"
                  style={{
                    background: "rgba(255,255,255,.05)",
                    color: "var(--sub)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
