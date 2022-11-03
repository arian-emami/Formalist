/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useReducer } from "react";
import validator from "@rjsf/validator-ajv6";
import { Form } from "@rjsf/chakra-ui";
import Reducer from "../../context/AppReducer";
import {
	Box,
	Button,
	Text,
	Container,
	Flex,
	Heading,
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
	useToast,
} from "@chakra-ui/react";
import AddFieldBtn from "../../components/FormBuilder/AddFieldBtn";
import { JSONSchema7 } from "json-schema";
import { MdSave } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";

import * as _rjsf_utils from "@rjsf/utils";

import FormHeader from "../../components/FormBuilder/FormHeader";
import Head from "next/head";
import { useRouter } from "next/router";
import clientPromise from "../../lib/mongo";
import Submissions from "../../components/Submissions";
export type Fields = {
	[name: string]: {
		uiName: string;
		schemaType: string;
		schema: JSONSchema7;
		icon: React.ReactElement;
	};
};
const FullOfEmpty = () => {
	return (
		<Flex direction={"column"} alignItems={"center"} marginY={20}>
			<Heading size={"md"}>Full Of Empty!</Heading>
			<Text>Use the &quot;Add Field&quot; button to get started.</Text>
		</Flex>
	);
};
const Builder = ({ form, id }: { form: any; id: any }) => {
	const context = useContext(GlobalContext);
	const [state, dispatch] = useReducer(Reducer, context);

	useEffect(() => {
		context.setForm?.({ form });
	}, [form]);

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
	const toast = useToast();
	const saveForm = async () => {
		const { _id: id, ..._form } = context.defaultForm;
		let res = await fetch("/api/forms/update", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: context.defaultForm["_id"],
				form: _form,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					toast({
						title: "Saved!",
						status: "success",
						isClosable: true,
						position: "top",
						duration: 3000,
					});
				} else {
					toast({
						title: "There was an error while saving the form",
						status: "error",
						isClosable: true,
						position: "top",
						duration: 3000,
					});
				}
			})
			.then((response) => {
				context.setSaving?.(false);
				context.setChanged?.(false);
			});
	};
	const moveItem = (up = false, title: string) => {
		// to be implemented
		context.MoveElement?.(up);
	};
	function CustomFieldTemplate(props: _rjsf_utils.FieldTemplateProps) {
		const { classNames, children, id, label, description } = props;
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
											context.customValidate?.(formData, errors, label)
										}
									>
										<ModalFooter>
											<HStack marginRight={-6}>
												<Button variant={"ghost"} onClick={onClose}>
													Cancel
												</Button>
												<Button type={"submit"} onClick={onClose}>
													Submit
												</Button>
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
	const saveBtnBackgroundColor = useColorModeValue("purple.700", "purple.50");

	// prompt the user if they try and leave with unsaved changes
	const router = useRouter();
	useEffect(() => {
		const warningText =
			"You have unsaved changes - are you sure you wish to leave this page?";
		const handleWindowClose = (e: BeforeUnloadEvent) => {
			if (!context.changed) return;
			e.preventDefault();
			return (e.returnValue = warningText);
		};
		const handleBrowseAway = () => {
			if (!context.changed) return;
			if (window.confirm(warningText)) return;
			router.events.emit("routeChangeError");
			throw "routeChange aborted.";
		};
		window.addEventListener("beforeunload", handleWindowClose);
		router.events.on("routeChangeStart", handleBrowseAway);
		return () => {
			window.removeEventListener("beforeunload", handleWindowClose);
			router.events.off("routeChangeStart", handleBrowseAway);
		};
	}, [context.changed]);
	return (
		<>
			<Head>
				<title>Building page | Formalist</title>
			</Head>
			<>
				<FormHeader></FormHeader>
				<Container p={0}>
					<Tabs isFitted m={0} p={0}>
						<TabList
							mb="1em"
							top={55}
							//mt={60}
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
								{Object.keys(context.defaultForm.properties).length === 0 ? (
									<FullOfEmpty />
								) : (
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
								)}

								<Box marginInline={3} marginTop={5}>
									<AddFieldBtn formsSchema={context.formFields} />
								</Box>
							</TabPanel>
							<TabPanel paddingX={5}>
								<Form
									schema={context.defaultForm as JSONSchema7}
									validator={validator}
									uiSchema={context.defaultForm.uiSchema}
									children={true}
								></Form>
							</TabPanel>
							<TabPanel padding={0}>
								<Submissions id={id}></Submissions>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Container>
				<Button
					backgroundColor={saveBtnBackgroundColor}
					rounded={"full"}
					position={"fixed"}
					bottom={"20px"}
					right={"30px"}
					leftIcon={<MdSave />}
					variant={"solid"}
					isLoading={context.isSaving}
					loadingText="Saving"
					onClick={async (e) => {
						context.setSaving?.(true);
						await saveForm();
					}}
					boxShadow={"lg"}
				>
					Save
				</Button>
			</>
		</>
	);
};

export default Builder;

export async function getServerSideProps(context: any) {
	const id = context.params.id;
	const client = await clientPromise;
	const ObjectID = require("mongodb").ObjectID;
	const db = client.db("Formly");
	let _form = await db
		.collection("forms")
		.find({ _id: new ObjectID(id) })
		.toArray();
	let form = JSON.parse(JSON.stringify(_form))[0];
	return {
		props: { form, id },
	};
}
