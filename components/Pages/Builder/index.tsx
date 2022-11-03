/* eslint-disable react/no-children-prop */
import React, { useState, useContext } from "react";
import validator from "@rjsf/validator-ajv6";
import { Form } from "@rjsf/chakra-ui";

import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tag,
	TagLabel,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import AddFieldBtn from "../../FormBuilder/AddFieldBtn";
import { JSONSchema7 } from "json-schema";
import {} from "react-icons/md";
import { GlobalContext } from "../../../context/GlobalProvider";
import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";

import * as _rjsf_utils from "@rjsf/utils";

import FormHeader from "../../FormBuilder/FormHeader";
import Head from "next/head";
export type Fields = {
	[name: string]: {
		uiName: string;
		schemaType: string;
		schema: JSONSchema7;
		icon: React.ReactElement;
	};
};

const Builder = () => {
	const context = useContext(GlobalContext);
	const onDelete = (title: string) => {
		context.DeleteElementFromForm?.(title);
	};

	const onSubmit = (
		{ formData }: { formData: any },
		e: React.FormEvent,
		title: string
	) => {
		context.EditElement?.({ formData }, e, title);
	};

	const moveItem = (up = false, title: string) => {
		context.MoveElement?.(up);
	};
	function CustomFieldTemplate(props: _rjsf_utils.FieldTemplateProps) {
		const { classNames, children, id, label } = props;
		const { isOpen, onOpen, onClose } = useDisclosure();
		let fieldSettingsData =
			id !== "root" && context.defaultForm.extraInfo[label];

		return (
			<div className={classNames}>
				{id !== "root" && (
					<>
						<Box marginY={1}>
							<Flex justifyContent={"space-between"}>
								<Flex>
									<Tag
										variant="subtle"
										colorScheme={"gray"}
										size={"md"}
										h={25}
										marginRight={1}
									>
										{
											context.formFields[
												context.defaultForm.extraInfo[label].type
											].icon
										}
										<TagLabel paddingInline={1}>
											{
												context.formFields[
													context.defaultForm.extraInfo[label].type
												].uiName
											}
										</TagLabel>
									</Tag>
									<IconButton
										icon={<MdOutlineDeleteOutline />}
										aria-label="Delete item"
										size={"xs"}
										h={25}
										colorScheme="red"
										variant={"ghost"}
										onClick={() => {
											onDelete(label);
										}}
									/>
								</Flex>
								<Flex>
									<Button
										rightIcon={<MdEditNote />}
										aria-label="Edit item"
										size={"xs"}
										h={25}
										variant={"solid"}
										colorScheme={"purple"}
										marginRight={1}
										onClick={() => {
											onOpen();
										}}
									>
										Edit
									</Button>
								</Flex>
							</Flex>
						</Box>
						<Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Edit {label}</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<Form
										schema={
											context.formFields[
												context.defaultForm.extraInfo[label].type
											].schema
										}
										validator={validator}
										onSubmit={(data, e) => {
											onSubmit(data, e, label);
										}}
										uiSchema={
											context.formFields[
												context.defaultForm.extraInfo[label].type
											]["uiSchema"]
										}
										formData={context.defaultForm.extraInfo[label]}
										customValidate={(formData, errors) =>
											context.customValidate?.(formData, errors)
										}
									>
										<ModalFooter>
											<HStack marginRight={-6}>
												<Button variant={"ghost"} onClick={onClose}>
													Cancel
												</Button>
												<Button type={"submit"}>Submit</Button>
											</HStack>
										</ModalFooter>
									</Form>
								</ModalBody>
							</ModalContent>
						</Modal>
					</>
				)}
				<Box>{children}</Box>
			</div>
		);
	}

	const _objectTemplate = ({
		properties,
		uiSchema,
		onAddClick,
		registry,
	}: _rjsf_utils.ObjectFieldTemplateProps<any, any>) => {
		const uiOptions = _rjsf_utils.getUiOptions(uiSchema);
		const TitleFieldTemplate = _rjsf_utils.getTemplate<"TitleFieldTemplate">(
			"TitleFieldTemplate",
			registry,
			uiOptions
		);
		const borderColor = useColorModeValue("gray.300", "gray.700");
		return (
			<Box>
				{properties.map((element) => (
					// eslint-disable-next-line react/jsx-key
					<Box
						borderStyle={"solid"}
						borderWidth={1}
						borderColor={borderColor}
						borderRadius={12}
						padding={3}
						margin={3}
					>
						{element.content}
					</Box>
				))}
			</Box>
		);
	};

	const backgroundColor = useColorModeValue("white", "gray.800");
	return (
		<>
			<Head>
				<title>Form Builder</title>
			</Head>
			<>
				<>
					<FormHeader></FormHeader>
					<Container p={0}>
						<Tabs isFitted m={0} p={0}>
							<TabList
								mb="1em"
								top={55}
								zIndex={"sticky"}
								position={"sticky"}
								backgroundColor={backgroundColor}
							>
								<Tab>Edit</Tab>
								<Tab>Preview</Tab>
								<Tab>Submissions</Tab>
							</TabList>
							<TabPanels>
								<TabPanel padding={0}>
									<Form
										schema={context.defaultForm as JSONSchema7}
										validator={validator}
										uiSchema={context.defaultForm.uiSchema}
										templates={{
											FieldTemplate: CustomFieldTemplate,
											ObjectFieldTemplate: _objectTemplate,
										}}
										children={true}
									></Form>
									<Box marginInline={3} marginTop={5}>
										<AddFieldBtn formsSchema={context.formFields} />
									</Box>
								</TabPanel>
								<TabPanel padding={0}>
									<Form
										schema={context.defaultForm as JSONSchema7}
										validator={validator}
										uiSchema={context.defaultForm.uiSchema}
										children={true}
									></Form>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Container>
				</>
			</>
		</>
	);
};

export default Builder;
