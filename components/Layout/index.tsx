/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
interface Props {
	children?: ReactNode;
}
const index = ({ children }: Props) => {
	return (
		<>
			<Header />
			<Box paddingInline={9}>{children}</Box>
			<Footer />
		</>
	);
};

export default index;
