import React from "react";
import { PolarArea } from "react-chartjs-2";
import { DataSet, GraphData } from "../../types/graph";
type Props = {
  data: GraphData<DataSet>;
  title: string;
};

export const PolarGraph = ({ data, title }: Props) => (
  <PolarArea
    data={{
      labels: data.labels,
      datasets: data.datasets,
    }}
    options={{
      plugins: {
        legend: { position: "top" },
        title: { text: title, display: true },
      },
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 12,
            },
          },
        },
      },
    }}
  />
);
