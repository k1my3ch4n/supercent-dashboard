import StatCard from "./StatCard";

export default function StatsRow() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      <StatCard
        label="Total Reviews"
        value="2,847"
        icon="💬"
        change="↑ 12.4%"
        changeType="up"
        valueColor="var(--pink)"
        variant="highlight"
      />
      <StatCard
        label="Avg Rating"
        value="4.1"
        icon="⭐"
        change="↓ 0.2"
        changeType="down"
        valueColor="var(--yellow)"
      />
      <StatCard
        label="AI Predicted"
        value="3.9"
        icon="🔮"
        change=""
        changeType="neutral"
        valueColor="var(--blue)"
        variant="ai-predict"
      />
      <StatCard
        label="Critical Issues"
        value="8"
        icon="🚨"
        change="+3"
        changeType="down"
        valueColor="var(--pink)"
      />
    </div>
  );
}
