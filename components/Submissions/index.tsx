import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

const Submissions = ({ id }: { id: any }) => {
	const [submissions, setSubmissions]: any = useState([]);
	const [isFetching, setIsFetching]: any = useState(false);
	const borderColor = useColorModeValue("gray.300", "gray.700");
	const fetchData = async () => {
		try {
			let res = await fetch("/api/forms/get_submits", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					setSubmissions(data.submissions.reverse());
				});
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		setIsFetching(true);
		const abortController = new AbortController();

		fetchData();
		return () => {
			setIsFetching(false);
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		setIsFetching(false);
	}, [submissions]);
	return (
		<Box>
			<Button
				w={"100%"}
				variant={"ghost"}
				leftIcon={<MdRefresh />}
				isLoading={isFetching}
				onClick={async (e) => {
					setIsFetching(true);
					await fetchData();
				}}
			>
				Refresh
			</Button>
			{submissions.map((submission: any, key: any) => (
				<Box
					key={key}
					marginX={2}
					marginY={3}
					borderRadius={12}
					paddingY={3}
					position={"relative"}
					borderColor={borderColor}
					borderWidth={"thin"}
				>
					{Object.keys(submission)
						.filter((item) => item !== "_id" && item !== "form_id")
						.map((key, index) => (
							<Flex
								key={index}
								justifyContent={"space-between"}
								paddingX={5}
								paddingY={1}
							>
								<Text as={"b"}>{key} :</Text>
								<Text>
									{submission[key].length > 20
										? `${submission[key].substring(0, 20)} ...`
										: submission[key]}
								</Text>
							</Flex>
						))}
				</Box>
			))}
		</Box>
	);
};

export default Submissions;
