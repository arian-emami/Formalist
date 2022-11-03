import React, { FormEvent, useContext, useState } from "react";
import { Button, Container, Heading } from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
import validator from "@rjsf/validator-ajv6";
import { GlobalContext } from "../../context/GlobalProvider";
import { useRouter } from "next/router";
import Head from "next/head";

const Index = () => {
	const [isSubmiting, setIsSubmiting] = useState(false);
	const router = useRouter();
	const onSubmit = async (data: any, e: FormEvent) => {
		setIsSubmiting(true);
		e.preventDefault();
		let res = await fetch("/api/forms", {
			method: "POST",
			body: JSON.stringify({
				title: "",
				type: "object",
				required: [],
				properties: {},
				uiSchema: {},
				extraInfo: {},
				formSettings: {
					data: {
						...data.formData,
					},
					form: {
						title: "",
						type: "object",
						required: ["title"],
						properties: {
							title: {
								type: "string",
								title: "Form Title",
							},
							description: {
								type: "string",
								title: "Form Description",
							},
							makePublic: {
								type: "boolean",
								title: "Make form submissions public",
								description:
									"If checked, any submission to this form will be publicly visible to anyone visiting the form URL",
							},
						},
						uiSchema: {
							description: { "ui:widget": "textarea" },
						},
					},
				},
			}),
		})
			.then((response) => response.json())
			.then((data) => router.push("builder/" + data));
		console.log(res);
	};
	const context = useContext(GlobalContext);
	const schema = {};
	return (
		<>
			<Head>
				<title>Create Form</title>
			</Head>
			<Container>
				<Heading paddingBottom={5}>Create New Form</Heading>
				<Form
					schema={context.defaultForm.formSettings.form}
					validator={validator}
					uiSchema={context.defaultForm.formSettings.form.uiSchema}
					disabled={isSubmiting}
					onSubmit={(data, e) => {
						onSubmit(data, e);
					}}
				>
					<Button type="submit" isLoading={isSubmiting}>
						Create Form
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default Index;
