// components/MultiLineChart.tsx
import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

type MultiLineChartProps = {
  data: Array<{
    date: string;
    metric: "今期間" | "前期間";
    value: number;
    category: "リーチ" | "インプレッション" | "クリック率";
  }>;
};

const MultiLineChart = ({ data }: MultiLineChartProps) => {
  const chartRef = useRef<am4charts.XYChart | null>(null);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chartRef.current = chart;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    chart.yAxes.push(new am4charts.ValueAxis());

    let colorSet = new am4core.ColorSet();
    colorSet.list = ["#3482F6", "#6633FF", "#00CC66"].map((c) =>
      am4core.color(c)
    );

    ["リーチ", "インプレッション", "クリック率"].forEach((category, i) => {
      ["今期間", "前期間"].forEach((metric) => {
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.name = `${category}${metric === "前期間" ? " (前期間)" : ""}`;
        series.stroke = colorSet.getIndex(i);
        series.strokeWidth = 2;
        series.strokeDasharray = metric === "前期間" ? "4 4" : "";

        // シリーズに対応するカテゴリと期間のデータだけをフィルタリング
        let filteredData = data.filter((item) => {
          return item.category === category && item.metric === metric;
        });

        series.data = filteredData;
      });
    });

    chart.legend = new am4charts.Legend();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
};

export default MultiLineChart;
