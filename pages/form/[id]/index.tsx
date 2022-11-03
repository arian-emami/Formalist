/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
import React, { useState, useContext, useEffect, useRef } from "react";
import validator from "@rjsf/validator-ajv6";
import { Form } from "@rjsf/chakra-ui";

import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useColorModeValue,
	useToast,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";

import { JSONSchema7 } from "json-schema";

import { GlobalContext } from "../../../context/GlobalProvider";

import * as _rjsf_utils from "@rjsf/utils";

import FormHeader from "../../../components/FormViewer/FormHeader";
import Head from "next/head";

import clientPromise from "../../../lib/mongo";
import Submissions from "../../../components/Submissions";
export type Fields = {
	[name: string]: {
		uiName: string;
		schemaType: string;
		schema: JSONSchema7;
		icon: React.ReactElement;
	};
};

const Viewer = ({ form, id }: { form: any; id: any }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const context = useContext(GlobalContext);

	useEffect(() => {
		context.setForm?.({ form });
	}, [form]);
	const toast = useToast();
	const onSubmit = async (
		{ formData }: { formData: any },
		e: React.FormEvent
	) => {
		let res = await fetch("/api/forms/submit", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				...formData.formData,
			}),
		})
			.then((res) => {
				if (res.status === 200) {
					setSubmitted(true);
				} else {
					console.log(res.status);
					toast({
						title: "There was an error while submitting the form",
						status: "error",
						isClosable: true,
						position: "top",
						duration: 3000,
					});
				}
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	const backgroundColor = useColorModeValue("white", "gray.800");
	return (
		<>
			<Head>
				<title>Form</title>
			</Head>
			<>
				<FormHeader></FormHeader>
				<Container p={0}>
					<Tabs isFitted m={0} p={0}>
						{context.defaultForm.formSettings?.data.makePublic && (
							<TabList
								mb="1em"
								top={55}
								//mt={60}
								zIndex={"sticky"}
								position={"sticky"}
								backgroundColor={backgroundColor}
							>
								<Tab>Form</Tab>
								<Tab>Submissions</Tab>
							</TabList>
						)}

						<TabPanels>
							<TabPanel padding={0}>
								{submitted ? (
									<Box padding={3}>
										<Heading>Thank you for your submission.</Heading>
										<Text paddingTop={2}>
											The form creator will be able to see your submission from
											their dashboard.
										</Text>
										{context.defaultForm.formSettings?.data.makePublic && (
											<Alert status="info" marginTop={5}>
												<AlertIcon />
												Science this is a public form, you and anyone visiting
												this link will be able to see your submission. if you
												don&apos;t see yours in the Submissions tab, please hit
												the refresh button.
											</Alert>
										)}
									</Box>
								) : (
									<Form
										schema={context.defaultForm as JSONSchema7}
										validator={validator}
										uiSchema={context.defaultForm.uiSchema}
										disabled={isSubmitting}
										onSubmit={(data: any, e: React.FormEvent) => {
											setIsSubmitting(true);
											onSubmit({ formData: data }, e);
										}}
									>
										<Button type={"submit"} isLoading={isSubmitting}>
											Submit
										</Button>
									</Form>
								)}
							</TabPanel>
							{context.defaultForm.formSettings?.data.makePublic && (
								<TabPanel padding={0}>
									<Submissions id={id}></Submissions>
								</TabPanel>
							)}
						</TabPanels>
					</Tabs>
				</Container>
			</>
		</>
	);
};

export default Viewer;

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
