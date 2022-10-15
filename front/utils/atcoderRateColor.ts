const RATE_COLOR = {
  Gray: "blackAlpha.500",
  Brown: "#FFBE7C",
  Green: "green.200",
  SkyBlue: "cyan.200",
} as const;
interface AtcoderRateColor {
  color: typeof RATE_COLOR[keyof typeof RATE_COLOR];
  colorRatio: number;
}
export const generateAtcoderRateGradientColor = (rate: number): string => {
  let rateColor: AtcoderRateColor;
  if (rate <= 400) {
    rateColor = { color: RATE_COLOR["Gray"], colorRatio: rate / 4 };
  } else if (rate <= 800) {
    rateColor = { color: RATE_COLOR["Brown"], colorRatio: (rate - 400) / 4 };
  } else if (rate <= 1200) {
    rateColor = { color: RATE_COLOR["Green"], colorRatio: (rate - 800) / 4 };
  } else {
    rateColor = { color: RATE_COLOR["SkyBlue"], colorRatio: (rate - 1200) / 4 };
  }
  return `linear(to-t, ${rateColor.color} ,white ${rateColor.colorRatio}%)`;
};
