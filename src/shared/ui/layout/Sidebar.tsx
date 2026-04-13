"use client";

import { useState } from "react";

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

interface GameInfo {
  name: string;
  emoji: string;
  gradient: string;
}

interface SidebarProps {
  game: GameInfo;
  onGameChange?: () => void;
}

export default function Sidebar({ game, onGameChange }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSwitcherHovered, setIsSwitcherHovered] = useState(false);
  const [hoveredNavKey, setHoveredNavKey] = useState<string | null>(null);

  return (
    <aside className="w-size-210 min-h-screen border-r border-border-color flex flex-col py-size-22 fixed top-0 left-0 bottom-0 z-10 bg-color-card">
      {/* 로고 */}
      <div className="px-size-22 pb-size-18 border-b border-border-color">
        <div className="text-size-18 font-black tracking-widest">SUPERCENT</div>
        <div className="text-size-10 tracking-md mt-0.5 text-color-pink">Review Intelligence</div>
      </div>

      {/* 게임 스위처 */}
      <div className="px-3 py-size-14 border-b border-border-color">
        <div
          className={`flex items-center gap-size-10 px-size-10 py-size-9 rounded-size-8 border cursor-pointer transition-colors duration-150 ${
            isSwitcherHovered ? "border-color-pink" : "border-border-color"
          }`}
          onClick={onGameChange}
          onMouseEnter={() => setIsSwitcherHovered(true)}
          onMouseLeave={() => setIsSwitcherHovered(false)}
        >
          <div
            className="w-size-30 h-size-30 rounded-size-7 flex items-center justify-center text-size-17 flex-shrink-0"
            style={{ background: game.gradient }}
          >
            {game.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">{game.name}</div>
            <div className="text-size-10 mt-0.5 text-color-muted">클릭하여 변경</div>
          </div>
          <span className="text-size-11 text-color-muted">⇄</span>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="px-3 py-size-14 flex-1 flex flex-col gap-size-3">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="text-size-10 font-bold tracking-md uppercase px-size-10 py-2 pt-3 text-color-muted">
              {section.title}
            </div>
            {section.items.map((item: NavItem) => (
              <div
                key={item.key}
                className={`flex items-center gap-size-9 px-size-10 py-size-9 rounded-size-8 text-sm cursor-pointer transition-all duration-100 ${
                  activeNav === item.key
                    ? "bg-color-pink text-white font-bold"
                    : hoveredNavKey === item.key
                      ? "bg-color-card-2 text-white"
                      : "text-color-sub"
                }`}
                onClick={() => setActiveNav(item.key)}
                onMouseEnter={() => setHoveredNavKey(item.key)}
                onMouseLeave={() => setHoveredNavKey(null)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* 푸터 */}
      <div className="px-size-22 pt-size-14 border-t border-border-color text-size-11 text-color-muted">
        Last synced: just now
      </div>
    </aside>
  );
}
