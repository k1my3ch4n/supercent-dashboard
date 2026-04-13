"use client";

type NavItem = {
  icon: string;
  label: string;
  key: string;
};

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      { icon: "📊", label: "Dashboard", key: "dashboard" },
      { icon: "💬", label: "Reviews", key: "reviews" },
    ],
  },
  {
    title: "AI Analysis",
    items: [
      { icon: "🤖", label: "AI Insights", key: "insights" },
      { icon: "🎯", label: "Action Items", key: "actions" },
      { icon: "📈", label: "Predictions", key: "predictions" },
      { icon: "✉️", label: "CS Auto Reply", key: "cs-reply" },
    ],
  },
  {
    title: "Settings",
    items: [{ icon: "⚙️", label: "Settings", key: "settings" }],
  },
];

interface SidebarProps {
  gameName: string;
  gameEmoji: string;
  gameGradient: string;
  activeNav?: string;
  onNavChange?: (key: string) => void;
  onGameChange?: () => void;
}

export default function Sidebar({
  gameName,
  gameEmoji,
  gameGradient,
  activeNav = "dashboard",
  onNavChange,
  onGameChange,
}: SidebarProps) {
  return (
    <aside
      className="w-[210px] min-h-screen border-r flex flex-col py-[22px] fixed top-0 left-0 bottom-0 z-10"
      style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
    >
      {/* 로고 */}
      <div className="px-[22px] pb-[18px] border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="text-[18px] font-black tracking-widest">SUPERCENT</div>
        <div className="text-[10px] tracking-[2px] mt-0.5" style={{ color: "var(--pink)" }}>
          Review Intelligence
        </div>
      </div>

      {/* 게임 스위처 */}
      <div className="px-3 py-[14px] border-b" style={{ borderColor: "var(--border-color)" }}>
        <div
          className="flex items-center gap-[10px] px-[10px] py-[9px] rounded-[8px] border cursor-pointer transition-colors duration-150"
          style={{ borderColor: "var(--border-color)" }}
          onClick={onGameChange}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--pink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
          }}
        >
          <div
            className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center text-[17px] flex-shrink-0"
            style={{ background: gameGradient }}
          >
            {gameEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">{gameName}</div>
            <div className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
              클릭하여 변경
            </div>
          </div>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>
            ⇄
          </span>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="px-3 py-[14px] flex-1 flex flex-col gap-[3px]">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <div
              className="text-[10px] font-bold tracking-[2px] uppercase px-[10px] py-2 pt-3"
              style={{ color: "var(--muted)" }}
            >
              {section.title}
            </div>
            {section.items.map((item: NavItem) => (
              <div
                key={item.key}
                className="flex items-center gap-[9px] px-[10px] py-[9px] rounded-[8px] text-sm cursor-pointer transition-all duration-100"
                style={
                  activeNav === item.key
                    ? { background: "var(--pink)", color: "#fff", fontWeight: 700 }
                    : { color: "var(--sub)" }
                }
                onClick={() => {
                  onNavChange?.(item.key);
                }}
                onMouseEnter={(e) => {
                  if (activeNav !== item.key) {
                    (e.currentTarget as HTMLDivElement).style.background = "var(--card2)";
                    (e.currentTarget as HTMLDivElement).style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeNav !== item.key) {
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    (e.currentTarget as HTMLDivElement).style.color = "var(--sub)";
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* 푸터 */}
      <div
        className="px-[22px] pt-[14px] border-t text-[11px]"
        style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
      >
        Last synced: just now
      </div>
    </aside>
  );
}
