/* eslint-disable react/no-unescaped-entities */
import {
	Box,
	Container,
	Heading,
	Image,
	Flex,
	Divider,
	Tag,
	Text,
	List,
	ListIcon,
	ListItem,
	Button,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { MdCheckCircle, MdMail } from "react-icons/md";

const about = () => {
	return (
		<>
			<Head>
				<title>About</title>
			</Head>
			<Flex
				justifyContent={"center"}
				direction={"column"}
				alignItems={"center"}
			>
				<Box boxSize={40}>
					<Image src="/Formalist_icon.png" alt="Formalist Icon"></Image>
				</Box>
				<Heading size={"lg"} marginTop={3}>
					Formalist
				</Heading>
				<Tag colorScheme={"gray"} size={"sm"}>
					Version 1.0.0
				</Tag>
				<Button leftIcon={<FaGithub />} variant={"ghost"} mt={2}>
					Go to source code
				</Button>
			</Flex>
			<Container>
				<Flex
					justifyContent={"center"}
					direction={"column"}
					alignItems={"center"}
				>
					<Box mt={8}>
						<Heading mb={2} size={"md"}>
							About me!
						</Heading>
						<Divider mt={2} mb={2} />
						<Text>
							Hi, I'm Arian, the creator of Formalist. I'm grateful you took the
							time to check out my project. Do not hesitate opening issues on{" "}
							<Button leftIcon={<FaGithub />} variant={"link"}>
								My Github
							</Button>{" "}
							or sending me your advice through my email:
							<a href="mailto: emamiarian8@gmail.com">
								<Button leftIcon={<MdMail />} variant={"link"}>
									emamiarian8@gmail.com
								</Button>
							</a>
						</Text>
					</Box>
				</Flex>
				<Flex
					justifyContent={"center"}
					direction={"column"}
					alignItems={"center"}
				>
					<Box mt={8}>
						<Heading mb={2} size={"md"}>
							About this project
						</Heading>
						<Divider mt={2} mb={2} />
						<Text>
							Formalist is an interactive form builder made by React, Nextjs,
							Typescript and MongoDB.
						</Text>
						<Heading size={"sm"} mt={2}>
							Notable features:
						</Heading>
						<Container mt={1}>
							<List spacing={2}>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />9 different
									fields such as Text, Date-Time, Color and more.
								</ListItem>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />
									Accessible and ARIA compliant with a fully responsive, mobile
									first design.
								</ListItem>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />
									Easily Share forms with just a link.
								</ListItem>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />
									Ability to make submissions public such that anyone visiting
									form's link can see other people's submissions.
								</ListItem>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />
									Publicly visible submissions are server side rendered for SEO
									and search engine visibility.
								</ListItem>
								<ListItem>
									<ListIcon as={MdCheckCircle} color={"gray"} />
									Built on top of JSON schema standards, such that with just one
									schema, the form is verifiable both on the client side and
									server side.
								</ListItem>
							</List>
						</Container>
					</Box>
				</Flex>
			</Container>
		</>
	);
};

export default about;

export async function getStaticProps() {
	return {
		props: {}, // will be passed to the page component as props
	};
}
