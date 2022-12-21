import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { theme } from "../theme";
import {
        ArcElement,
        BarController,
        BarElement,
        CategoryScale,
        Chart as ChartJS,
        Filler,
        Legend,
        LinearScale,
        LineController,
        LineElement,
        PointElement,
        PolarAreaController,
        RadialLinearScale,
        Title,
        Tooltip,
} from "chart.js";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        BarElement,
        RadialLinearScale,
        LineController,
        PolarAreaController,
        BarController
);
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
        return (
                <RecoilRoot>
                        <ChakraProvider theme={theme}>
                                <DefaultSeo {...SEO} />
                                <Script
                                        id="google-analytics-lazy-on-load"
                                        strategy="lazyOnload"
                                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                                />

                                <Script strategy="lazyOnload" id="google-analytics">
                                        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
                                </Script>
                                <Component {...pageProps} />
                        </ChakraProvider>
                </RecoilRoot>
        );
}

export default MyApp;
