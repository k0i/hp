import { LANGUAGE_COLOR } from "../const";
import { AtcoderInfo } from "../types/atcoder";
import { DataSet, GraphData, ScatterDataSet } from "../types/graph";
import { WakatimeInfo } from "../types/wakatime";
import {
        generateAtcoderGradientColor,
        generateAtcoderRGBa,
} from "./atcoderRateColor";

export const convertWakatimeLanguagesDataToGraphData = (
        data: WakatimeInfo["language"],
        index: number
): GraphData<DataSet> => {
        const languages = data.data.languages.slice(0, index);
        const graphData: GraphData<DataSet> = { labels: [], datasets: [] };
        const doughnutsDataSet: DataSet = {
                label: "Languages",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
                hoverOffset: 4,
        };

        languages.forEach((l) => {
                if (l.name in LANGUAGE_COLOR) {
                        graphData.labels.push(l.name);
                        doughnutsDataSet.data.push(l.total_seconds / 3600);
                        const [one, two, three] =
                                LANGUAGE_COLOR[l.name as keyof typeof LANGUAGE_COLOR];
                        doughnutsDataSet.backgroundColor.push(
                                `rgba(${one}, ${two}, ${three}, 0.3)`
                        );

                        doughnutsDataSet.borderColor?.push(`rgba(${one}, ${two}, ${three}, 0.8)`);
                }
        });
        graphData.datasets.push(doughnutsDataSet);
        return graphData;
};

export const convertWakatimeActivitiesDataToGraphData = (
        data: WakatimeInfo["activities"],
        index: number
): GraphData<DataSet> => {
        const days = data.data.days.slice(0, index);
        const graphData: GraphData<DataSet> = { labels: [], datasets: [] };
        const barDataSet: DataSet = {
                label: "active hours",
                data: [],
                backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                ],
                borderWidth: 2,
                hoverOffset: 8,
        };

        days.forEach((d) => {
                graphData.labels.push(d.date);
                barDataSet.data.push(d.total / 3600);
        });
        graphData.datasets.push(barDataSet);
        return graphData;
};

export const convertAtcoderContestDataToGraphData = (
        data: AtcoderInfo["contestHistories"],
        index: number
) => {
        const graphData: GraphData<DataSet> = { labels: [], datasets: [] };
        const rateLineDataSet: DataSet = {
                label: "Atcoder Rate",
                data: [],
                backgroundColor: [],
                hoverOffset: 4,
        };
        const performanceBarDataSet: DataSet = {
                label: "Atcoder Performance",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
                hoverOffset: 8,
        };

        data.slice(index * -1).forEach((c) => {
                graphData.labels.push(c.ContestScreenName.slice(0, 6));
                const ratingColor = generateAtcoderGradientColor(c.NewRating);
                const performanceColor = generateAtcoderGradientColor(c.Performance);
                const performanceRGBa = generateAtcoderRGBa(c.Performance);
                rateLineDataSet.data.push(c.NewRating);
                rateLineDataSet.backgroundColor.push(ratingColor.color);
                performanceBarDataSet.backgroundColor.push(performanceRGBa);
                performanceBarDataSet.borderColor?.push(performanceColor.color);
                performanceBarDataSet.data.push(c.Performance);
        });
        return {
                graphData: graphData,
                barData: performanceBarDataSet,
                lineData: rateLineDataSet,
        };
};

export const convertAtcoderAcDataToGraphData = (
        data: AtcoderInfo["acCountHistories"]
) => {
        const graphData: GraphData<ScatterDataSet> = { labels: [], datasets: [] };
        const atcoderACScatterDataSet: ScatterDataSet = {
                label: "Ac Count And Rank Per Day",
                data: [],
                backgroundColor: `rgba(165, 55, 253, 1.0)`,
        };

        data.forEach((h) => {
                graphData.labels.push(h.created_at.slice(0, 10));
                atcoderACScatterDataSet.data.push({ x: h.ac_rank, y: h.ac_count });
        });
        graphData.datasets.push(atcoderACScatterDataSet);
        return {
                graphData,
        };
};
