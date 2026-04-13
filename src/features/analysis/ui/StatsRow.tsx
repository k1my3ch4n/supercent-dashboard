import StatCard from "./StatCard";

export default function StatsRow() {
  return (
    <div className="grid gap-size-3 grid-cols-4">
      <StatCard
        label="Total Reviews"
        value="2,847"
        icon="💬"
        change="↑ 12.4%"
        changeType="up"
        valueColorClass="text-color-pink"
        variant="highlight"
      />
      <StatCard
        label="Avg Rating"
        value="4.1"
        icon="⭐"
        change="↓ 0.2"
        changeType="down"
        valueColorClass="text-color-yellow"
      />
      <StatCard
        label="AI Predicted"
        value="3.9"
        icon="🔮"
        change=""
        changeType="neutral"
        valueColorClass="text-color-blue"
        variant="ai-predict"
      />
      <StatCard
        label="Critical Issues"
        value="8"
        icon="🚨"
        change="+3"
        changeType="down"
        valueColorClass="text-color-pink"
      />
    </div>
  );
}
