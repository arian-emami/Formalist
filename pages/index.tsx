import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Highlight,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
	useBreakpointValue,
	GridItem,
	Container,
	Tag,
	TagLabel,
	TagLeftIcon,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import {
	MdArrowForward,
	MdCode,
	MdCodeOff,
	MdOutlineLanguage,
	MdOutlineLock,
} from "react-icons/md";
import styles from "../styles/Home.module.css";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Home: NextPage = () => {
	const colorMode = useColorModeValue("light", "dark");
	return (
		<>
			<Head>
				<title>Formalist | Create and share forms with ease</title>
			</Head>
			<Container maxW={"container.lg"} p={0}>
				<SimpleGrid
					columns={1}
					alignItems={"center"}
					justifyContent={"center"}
					spacingY={"20px"}
				>
					<Box>
						<SimpleGrid
							columns={[1, 2]}
							alignItems={"center"}
							justifyContent={"center"}
							flexWrap={"revert"}
							spacingX={"40px"}
							spacingY={"40px"}
							paddingTop={3}
							minChildWidth="250px"
						>
							<Box>
								<Heading lineHeight={"normal"}>Create And Share Forms</Heading>
								<Heading>
									With
									<Highlight
										query="Ease"
										styles={{
											mx: "2",
											my: "-20",
											px: "2",
											py: "0",
											bg: "purple.100",
										}}
									>
										Ease
									</Highlight>
								</Heading>
								<Text paddingTop={2}>By: Arian Emami</Text>
								<HStack marginTop={6}>
									<Link href={"/create_form"}>
										<Button rightIcon={<MdArrowForward />} size={"lg"}>
											Start Now
										</Button>
									</Link>
									<Link href={"https://github.com/arian-emami/Formalist"}>
										<Button
											leftIcon={<FaGithub />}
											size={"lg"}
											variant={"ghost"}
										>
											Github
										</Button>
									</Link>
								</HStack>
							</Box>
							<Box display={"block"}>
								<Image
									src="/FormImage.png"
									alt="Picture of the author"
									layout="responsive"
									width={989}
									height={821}
								/>
							</Box>
						</SimpleGrid>
					</Box>
					<Box>
						<SimpleGrid
							columns={[1, 2]}
							alignItems={"center"}
							justifyContent={"center"}
							flexWrap={"revert"}
							spacingX={"90px"}
							spacingY={"60px"}
							paddingY={28}
							minChildWidth="250px"
						>
							<Box display={"block"} m={-7}>
								{colorMode === "light" ? (
									<Image
										src="/FieldAddLight.png"
										alt="Picture of the author"
										layout="responsive"
										width={755}
										height={574}
									/>
								) : (
									<Image
										src="/FieldAddDark.png"
										alt="Picture of the author"
										layout="responsive"
										width={755}
										height={574}
									/>
								)}
							</Box>
							<Box>
								<Heading lineHeight={"normal"} size={"lg"}>
									What You See Is What You Get
								</Heading>
								<Text paddingTop={4} fontSize={"lg"}>
									Chose from 9 different customizable fields. Add as many as of
									them that you want and finally share your form with others by
									just a URL.{" "}
								</Text>
								<Link href={"/create_form"}>
									<Button
										rightIcon={<MdArrowForward />}
										size={"md"}
										variant={"outline"}
										marginTop={4}
									>
										Give it a try
									</Button>
								</Link>
							</Box>
						</SimpleGrid>
					</Box>
					<Box>
						<SimpleGrid
							columns={[1, 2]}
							alignItems={"center"}
							justifyContent={"center"}
							flexWrap={"revert"}
							spacingX={"90px"}
							spacingY={"60px"}
							paddingY={0}
							minChildWidth="250px"
						>
							<Box>
								<Heading
									lineHeight={"tall"}
									size={"lg"}
									as={Flex}
									flexWrap={"wrap"}
								>
									<Tag colorScheme={"gray"} size={"lg"} marginRight={2}>
										<TagLeftIcon as={MdOutlineLock}></TagLeftIcon>
										<TagLabel>Private</TagLabel>
									</Tag>
									And
									<Tag colorScheme={"purple"} size={"lg"} marginX={2}>
										<TagLeftIcon as={MdOutlineLanguage}></TagLeftIcon>
										<TagLabel>Public</TagLabel>
									</Tag>
									Forms
								</Heading>
								<Text paddingTop={4} fontSize={"lg"}>
									By setting your form&apos;s submission visibility to public,
									anyone visiting your form can see other peoples&apos;
									submissions. One example use-case for this would be asking
									people to share their experiences about something with
									everyone.
								</Text>
								<Link href={"/create_form"}>
									<Button
										rightIcon={<MdArrowForward />}
										size={"md"}
										variant={"outline"}
										marginTop={4}
									>
										Make One yourself
									</Button>
								</Link>
							</Box>
							<Box display={"block"} m={15}>
								{colorMode === "light" ? (
									<Image
										src="/SubmissionsLight.png"
										alt="Picture of the author"
										layout="responsive"
										width={841}
										height={857}
									/>
								) : (
									<Image
										src="/SubmissionsDark.png"
										alt="Picture of the author"
										layout="responsive"
										width={841}
										height={857}
									/>
								)}
							</Box>
						</SimpleGrid>
					</Box>
					<Box paddingY={20}>
						<Flex direction={"column"} alignItems={"center"}>
							<Heading size={"lg"}>Made it this far?</Heading>
							<Text>Would be a waste if you didn&apos;t give it a try!</Text>
							<Link href={"/create_form"}>
								<Button marginTop={5} size={"lg"}>
									Start Now
								</Button>
							</Link>
						</Flex>
					</Box>
				</SimpleGrid>
			</Container>
		</>
	);
};

export default Home;
export async function getStaticProps() {
	return {
		props: {}, // will be passed to the page component as props
	};
}
