/* eslint-disable react/no-children-prop */
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Button,
	useDisclosure,
	useClipboard,
	Show,
	Input,
	Flex,
	InputGroup,
	InputLeftElement,
	Icon,
	Container,
	DrawerCloseButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdOutlineLink, MdShare } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";

const ShareBody = () => {
	const context = useContext(GlobalContext);
	const { hasCopied, onCopy } = useClipboard(context.defaultForm.shareableUrl);

	return (
		<>
			<Flex direction={"column"} h={"100%"}>
				<Container textAlign={"justify"} mb={4}>
					By sharing the below url, you can invite anyone to fill out this form
					and you will see their submissions in submissions tab
				</Container>
				{context.defaultForm.formSettings.data.makePublic && (
					<Alert status="warning" mb={4}>
						<AlertIcon />
						<Box>
							<AlertTitle>This form is set to be public!</AlertTitle>
							<AlertDescription>
								Anyone visiting this link will be able to see others&apos;
								submissions to this form.
							</AlertDescription>
						</Box>
					</Alert>
				)}
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<Icon as={MdOutlineLink} />}
					/>
					<Input value={context.defaultForm.shareableUrl} isReadOnly />
				</InputGroup>
				<Button onClick={onCopy} mt={4} variant={"outline"}>
					{hasCopied ? "Copied" : "Copy"}
				</Button>
			</Flex>
		</>
	);
};
const FormShare = () => {
	const context = useContext(GlobalContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { hasCopied, onCopy } = useClipboard(context.defaultForm.shareableUrl);
	return (
		<>
			<Button
				leftIcon={<MdShare />}
				aria-label={"Share form"}
				variant={"ghost"}
				colorScheme={"purple"}
				onClick={onOpen}
			>
				Share
			</Button>
			<Show below="sm">
				<Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerHeader borderBottomWidth="1px">Form Share</DrawerHeader>
						<DrawerCloseButton />
						<DrawerBody pb={10} pt={5}>
							<ShareBody />
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Show>
			<Show above="sm">
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Share Form</ModalHeader>
						<ModalCloseButton />
						<ModalBody paddingBottom={5}>
							<ShareBody />
						</ModalBody>
					</ModalContent>
				</Modal>
			</Show>
		</>
	);
};

export default FormShare;
