"use client";

import { useState } from "react";
import type { ClusterItem } from "@shared/types/analysis";

const CLUSTER_ICONS = ["🔴", "⚠️", "💳", "🌏"];

interface ClusterCardProps {
  cluster: ClusterItem;
  index: number;
}

export default function ClusterCard({ cluster, index }: ClusterCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`rounded-size-8 border px-size-14 py-3 cursor-pointer transition-colors duration-150 bg-color-card-2 ${
        isHovered ? "border-color-white-a15" : "border-border-color"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className="flex items-center justify-between mb-size-6">
        <div className="flex items-center gap-size-6 text-xs font-bold">
          <span>{CLUSTER_ICONS[index % CLUSTER_ICONS.length]}</span>
          <span>{cluster.name}</span>
        </div>
        <span className="text-size-11 text-color-sub">{cluster.count.toLocaleString()}개 리뷰</span>
      </header>
      <blockquote className="text-size-11 leading-[1.5] italic pl-size-10 border-l-2 border-border-color mb-size-7 text-color-sub">
        {cluster.quote}
      </blockquote>
      <ul className="flex flex-wrap gap-size-5">
        {cluster.keywords.map((keyword) => (
          <li
            key={keyword}
            className="list-none text-size-10 px-size-7 py-0.5 rounded-full border bg-color-white-a05 text-color-sub border-border-color"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </article>
  );
}
