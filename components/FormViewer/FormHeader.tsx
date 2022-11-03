import {
	Box,
	Heading,
	Container,
	Flex,
	Tag,
	TagLeftIcon,
	TagLabel,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdOutlineLanguage, MdOutlineLock } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
const FormHeader = () => {
	const context = useContext(GlobalContext);

	return (
		<Box marginBottom={4}>
			<Flex direction={"column"} alignItems={"center"}>
				<Heading>{context.defaultForm.formSettings?.data.title}</Heading>
				<Box padding={3}>
					{context.defaultForm.formSettings?.data.makePublic ? (
						<Tag colorScheme={"purple"}>
							<TagLeftIcon as={MdOutlineLanguage}></TagLeftIcon>
							<TagLabel>Public</TagLabel>
						</Tag>
					) : (
						<Tag colorScheme={"gray"}>
							<TagLeftIcon as={MdOutlineLock}></TagLeftIcon>
							<TagLabel>Private</TagLabel>
						</Tag>
					)}
				</Box>
			</Flex>
			<Container textAlign={"justify"}>
				{context.defaultForm.formSettings?.data.description}
			</Container>
		</Box>
	);
};

export default FormHeader;
