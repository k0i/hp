import React from "react";
import { Bar } from "react-chartjs-2";
import { DataSet, GraphData } from "../../types/graph";
type Props = {
  data: GraphData<DataSet>;
  title: string;
};

export const BarGraph = ({ data, title }: Props) => (
  <Bar
    data={{
      labels: data.labels,
      datasets: data.datasets,
    }}
    options={{
      plugins: {
        legend: { position: "bottom", display: false },
        title: { text: title, display: true, color: "white" },
      },
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
      scales: {
        y: {
          ticks: {
            color: "white",
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return value + "h";
            },
          },
          grid: { color: "gray" },
        },
        x: {
          ticks: {
            color: "white",
          },
        },
      },
    }}
  />
);
