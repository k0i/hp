import React from "react";
import { Bar } from "react-chartjs-2";
import { DataSet, GraphData } from "../../types/graph";
type Props = {
  graphData: GraphData<DataSet>;
  barData: DataSet;
  lineData: DataSet;
  title: string;
};

export const BarandLineGraph = ({
  barData,
  lineData,
  graphData,
  title,
}: Props) => (
  <Bar
    data={{
      labels: graphData.labels,
      datasets: [
        {
          ...barData,
          order: 2,
        },
        {
          ...lineData,
          type: "line" as any,
          // @ts-ignore
          stepped: true as any,
          order: 1,
        },
      ],
    }}
    options={{
      animation: {
        onComplete: () => {},
        delay: (context) => {
          let delay = 0;
          if (context.type === "data" && context.mode === "default") {
            delay = context.dataIndex * 100 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      plugins: {
        legend: { position: "bottom" },
        title: { text: title, display: true },
      },
    }}
  />
);
