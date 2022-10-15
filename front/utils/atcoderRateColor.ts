import { RATE_COLOR, RATE_RGBa } from "../const";

interface AtcoderRateColor {
  color: typeof RATE_COLOR[keyof typeof RATE_COLOR];
  colorRatio: number;
}
export const generateAtcoderGradientColor = (rate: number) => {
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
  return { color: rateColor.color, ratio: rateColor.colorRatio };
};
export const generateAtcoderRGBa = (rate: number) => {
  if (rate <= 400) {
    const rgb = RATE_RGBa["Gray"];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rate / 400})`;
  } else if (rate <= 800) {
    const rgb = RATE_RGBa["Brown"];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(rate - 400) / 400})`;
  } else if (rate <= 1200) {
    const rgb = RATE_RGBa["Green"];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(rate - 800) / 400})`;
  } else {
    const rgb = RATE_RGBa["SkyBlue"];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(rate - 1200) / 400})`;
  }
};
