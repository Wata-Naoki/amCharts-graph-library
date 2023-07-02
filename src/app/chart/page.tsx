"use client";
// pages/index.tsx
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MultiLineChart = dynamic(
  () => import("../../components/MultiLineChart"),
  {
    ssr: false,
  }
);
const sampleData: Array<{
  date: string;
  metric: "今期間" | "前期間";
  value: number;
  category: "リーチ" | "インプレッション" | "クリック率";
}> = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const date = `2023-01-${day.toString().padStart(2, "0")}`;

  return [
    {
      date,
      metric: "今期間" as "今期間" | "前期間",
      value: 100 + i,
      category: "リーチ" as "リーチ" | "インプレッション" | "クリック率",
    },
    {
      date,
      metric: "前期間" as "今期間" | "前期間",
      value: 80 + i,
      category: "リーチ" as "リーチ" | "インプレッション" | "クリック率",
    },
    {
      date,
      metric: "今期間" as "今期間" | "前期間",
      value: 200 + i * 2,
      category: "インプレッション" as
        | "リーチ"
        | "インプレッション"
        | "クリック率",
    },
    {
      date,
      metric: "前期間" as "今期間" | "前期間",
      value: 220 + i * 2,
      category: "インプレッション" as
        | "リーチ"
        | "インプレッション"
        | "クリック率",
    },
    {
      date,
      metric: "今期間" as "今期間" | "前期間",
      value: 2 + i * 0.1,
      category: "クリック率" as "リーチ" | "インプレッション" | "クリック率",
    },
    {
      date,
      metric: "前期間" as "今期間" | "前期間",
      value: 1.9 + i * 0.1,
      category: "クリック率" as "リーチ" | "インプレッション" | "クリック率",
    },
  ];
}).flat();

const IndexPage = () => {
  const [data, setData] = useState(sampleData);

  useEffect(() => {
    // Update your data here
    // setData(updatedData);
  }, []);

  return (
    <div>
      <div className="text-center">amCharts4</div>
      <MultiLineChart data={data} />
    </div>
  );
};

export default IndexPage;
