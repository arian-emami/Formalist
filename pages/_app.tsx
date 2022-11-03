import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
	ChakraProvider,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalProvider";
import Head from "next/head";

const customTheme = extendTheme(
	withDefaultColorScheme({ colorScheme: "purple" })
);
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="theme-color" content="#805AD5" />
			</Head>
			<GlobalProvider>
				<ChakraProvider theme={customTheme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</GlobalProvider>
		</>
	);
}

export default MyApp;
