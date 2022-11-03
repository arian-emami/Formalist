import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	useColorModeValue,
	Button,
	HStack,
	VStack,
	IconButton,
	Show,
	useDisclosure,
	Collapse,
	Progress,
	Image,
	Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {
	const backgroundColor = useColorModeValue("white", "gray.800");
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onToggle } = useDisclosure();
	interface MenuItem {
		name: string;
		link: string;
	}
	type MenuItems = MenuItem[];

	const [menuItems, setMenuItems] = useState<MenuItems>([
		{ name: "Home", link: "/" },
		{ name: "Form Builder", link: "/create_form" },
		{ name: "About", link: "/about" },
	]);
	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeStart", (url) => {
			setIsLoading(true);
		});

		router.events.on("routeChangeComplete", (url) => {
			setIsLoading(false);
			if (isOpen) {
				onToggle();
			}
		});

		router.events.on("routeChangeError", (url) => {
			setIsLoading(false);
		});
	}, [router]);

	return (
		<Box
			bg={backgroundColor}
			marginInline={0}
			marginBottom={10}
			paddingX={4}
			paddingY={3}
			position={"sticky"}
			top={0}
			zIndex={"sticky"}
		>
			{isLoading && (
				<Progress
					size="xs"
					isIndeterminate
					marginTop={-3}
					p={0}
					marginBottom={5.8}
					marginInline={-4}
					h={5.8}
				/>
			)}

			<HStack
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
				paddingInline={2}
				paddingTop={1}
			>
				<Link href={"/"}>
					<HStack>
						<Box boxSize={9}>
							<Image src="/Formalist_icon.png" alt="Formalist Icon" />
						</Box>
						<Divider
							orientation="vertical"
							colorScheme={"purple"}
							h={7}
							borderLeftWidth={2}
						></Divider>
						<Heading as={"h1"} size="md" lineHeight={1}>
							Formalist
						</Heading>
					</HStack>
				</Link>
				<Show above="sm">
					<Box w={"100%"} overflow={"hidden"} paddingLeft={4}>
						<HStack pt={1}>
							{menuItems.map((item, index) => (
								<Link href={item.link} key={index}>
									<Button variant={"ghost"} key={index} colorScheme={"gray"}>
										{item.name}
									</Button>
								</Link>
							))}
						</HStack>
					</Box>
				</Show>
				<Box>
					<HStack>
						<ColorModeSwitcher />
						<Show below="sm">
							<IconButton
								variant="outline"
								colorScheme="purple"
								aria-label="Open menu"
								icon={<HamburgerIcon />}
								overflow={"hidden"}
								onClick={onToggle}
							/>
						</Show>
					</HStack>
				</Box>
			</HStack>
			<Collapse in={isOpen} animateOpacity>
				<VStack overflow={"hidden"} h={"max-content"} display={"flex"}>
					{menuItems.map((item, index) => (
						<Link href={item.link} key={index}>
							<Button variant={"ghost"} colorScheme={"gray"}>
								{item.name}
							</Button>
						</Link>
					))}
				</VStack>
			</Collapse>
		</Box>
	);
};

export default Header;
