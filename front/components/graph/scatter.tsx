import React from "react";
import { Scatter } from "react-chartjs-2";
import { GraphData, ScatterDataSet } from "../../types/graph";
type Props = {
  data: GraphData<ScatterDataSet>;
  title: string;
};
export const ScatterGraph = ({ data, title }: Props) => {
  return (
    <Scatter
      data={{
        datasets: [
          {
            label: data.datasets[0].label,
            data: data.datasets[0].data,
            backgroundColor: data.datasets[0].backgroundColor,
            stepped: true,
            pointRadius: 7,
          },
        ],
      }}
      options={{
        plugins: {
          title: { text: title, display: true },
        },
        scales: {
          x: {
            title: { text: "AC Rank", display: true },
          },
          y: {
            title: { text: "AC Count", display: true },
          },
        },
      }}
    />
  );
};
