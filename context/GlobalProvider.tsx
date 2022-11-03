import React, { createContext, useReducer } from "react";
import { Icon } from "@chakra-ui/react";
import {
	MdTextFields,
	MdAdsClick,
	MdFormatShapes,
	MdOutlineColorLens,
	MdAlternateEmail,
	MdOutlineCalendarToday,
	MdList,
	MdHttp,
	MdAccessTime,
} from "react-icons/md";
import Reducer from "./AppReducer";
import { JSONSchema7 } from "json-schema";
import * as _rjsf_utils from "@rjsf/utils";
import {
	textField,
	booleanField,
	textareaField,
	ColorField,
	emailField,
	urlField,
	dateField,
	dateTimeField,
	listField,
} from "./translators";

const initialState = {
	changed: false,
	autoSave: false,
	isSaving: false,
	defaultForm: {
		title: "",
		shareableUrl: "https://Form.ly/u156956/my_form",
		type: "object",
		required: [],
		properties: {},
		uiSchema: {},
		extraInfo: {},
		formSettings: {
			data: {},
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
	},

	formFields: {
		textField: {
			uiName: "Text Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "textField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				description: { "ui:widget": "textarea" },
			},
			translator: textField,
			icon: <Icon as={MdTextFields} />,
		},
		listField: {
			uiName: "List Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "listField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					listOfStrings: {
						type: "array",
						title: "List items",
						items: {
							title: "List item",
							type: "string",
							default: "List item",
						},
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				description: { "ui:widget": "textarea" },
			},
			translator: listField,
			icon: <Icon as={MdList} />,
		},
		textareaField: {
			uiName: "Text Area Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "textareaField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: { "ui:widget": "textarea" },
			},
			translator: textareaField,
			icon: <Icon as={MdFormatShapes} />,
		},
		emailField: {
			uiName: "Email Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "emailField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: {
					"ui:options": {
						inputType: "email",
					},
				},
			},
			translator: emailField,
			icon: <Icon as={MdAlternateEmail} />,
		},

		urlField: {
			uiName: "URL Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "urlField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: {
					"ui:options": {
						inputType: "url",
					},
				},
			},
			translator: urlField,
			icon: <Icon as={MdHttp} />,
		},
		dateField: {
			uiName: "Date Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "dateField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: {
					"ui:options": {
						inputType: "date",
					},
				},
			},
			translator: dateField,
			icon: <Icon as={MdOutlineCalendarToday} />,
		},
		dateTimeField: {
			uiName: "Date & Time Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "dateTimeField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: {
					"ui:options": {
						inputType: "datetime-local",
					},
				},
			},
			translator: dateTimeField,
			icon: <Icon as={MdAccessTime} />,
		},
		colorField: {
			uiName: "Color Field",
			schemaType: "string",
			schema: {
				title: "",
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "colorField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "string",
						title: "Default Value",
						default: "",
					},
					isRequired: {
						type: "boolean",
						title: "Is Required?",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				default: {
					"ui:options": {
						inputType: "color",
					},
				},
			},
			translator: ColorField,
			icon: <Icon as={MdOutlineColorLens} />,
		},
		booleanField: {
			uiName: "Boolean Field",
			schemaType: "boolean",
			schema: {
				type: "object",
				required: ["title"],
				properties: {
					type: { type: "string", default: "booleanField" },
					title: { type: "string", title: "Field Title" },
					description: { type: "string", title: "Field Description" },
					default: {
						type: "boolean",
						title: "Default Value ",
						default: false,
					},
					isRequired: {
						type: "boolean",
						title: "Is Required ",
						default: false,
					},
				},
			},
			uiSchema: {
				type: { "ui:widget": "hidden" },
				description: { "ui:widget": "textarea" },
				default: { "ui:widget": "select" },
			},
			translator: booleanField,
			icon: <Icon as={MdAdsClick} />,
		},
	},
};
interface Context {
	defaultForm: any;
	autoSave: boolean;
	isSaving: boolean;
	formFields: any;
	changed: boolean;
	addElementToForm?: Function;
	CustomFieldTemplate?: Function;
	DeleteElementFromForm?: Function;
	EditElement?: Function;
	MoveElement?: Function;
	customValidate?: Function;
	changeFormSettings?: Function;
	setForm?: Function;
	setAutoSave?: Function;
	saveForm?: Function;
	setSaving?: Function;
	setChanged?: Function;
}

export const GlobalContext = createContext<Context>(initialState);
interface Props {
	children: React.ReactNode;
}
export const GlobalProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	function CustomFieldTemplate(props: _rjsf_utils.FieldTemplateProps) {
		const {
			id,
			classNames,
			label,
			help,
			required,
			description,
			errors,
			children,
		} = props;
		return (
			<div className={classNames}>
				<label htmlFor={id}>
					{label}
					{required ? "*" : null}
				</label>
				{description}
				{children}
				{errors}
				{help}
			</div>
		);
	}
	function setForm({ form }: { form: any }) {
		dispatch({
			type: "SET_FORM",
			payload: form,
		});
	}
	function setAutoSave(value: boolean) {
		dispatch({
			type: "SET_AUTOSAVE",
			payload: value,
		});
	}
	function setSaving(value: boolean) {
		dispatch({
			type: "SET_SAVING",
			payload: value,
		});
	}
	function setChanged(value: boolean) {
		dispatch({
			type: "SET_CHANGED",
			payload: value,
		});
	}
	async function saveForm() {
		dispatch({
			type: "SET_SAVING",
			payload: true,
		});
		const { _id: id, ..._form } = state.defaultForm;

		let res = await fetch("/api/forms/update", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: state.defaultForm["_id"],
				form: _form,
			}),
		});
		res = await res.json();
		dispatch({
			type: "SET_SAVING",
			payload: false,
		});
	}
	function addElementToForm({ formData }: { formData: JSONSchema7 }, e: Event) {
		const payload =
			state["formFields"][formData["type"] as string].translator(formData);
		payload["settings"] = {
			[formData["title"] as string]: { ...formData },
		};
		dispatch({
			type: "ADD_FORM_ELEMENT",
			payload: payload,
		});
		if (state.autoSave) {
			saveForm();
		}
	}

	function DeleteElementFromForm(title: string) {
		const payload = { key: title };
		dispatch({
			type: "DEL_FORM_ELEMENT",
			payload: payload,
		});
		if (state.autoSave) {
			saveForm();
		}
	}

	function MoveElement(up = false, title: string) {
		const orderLength = context.defaultForm.uiSchema["ui:order"].length;
		const currentPos = context.defaultForm.uiSchema["ui:order"].indexOf(title);
		if (up && currentPos !== 0) {
			dispatch({
				type: "MOVE",
				payload: { key: title, up: true },
			});
		} else if (!up && currentPos !== orderLength - 1) {
			dispatch({
				type: "MOVE_DOWN",
				payload: { key: title, up: false },
			});
		}
		if (state.autoSave) {
			saveForm();
		}
	}

	function EditElement(
		{ formData }: { formData: JSONSchema7 },
		e: Event,
		title: string
	) {
		const payload =
			state["formFields"][formData["type"] as string].translator(formData);
		payload["settings"] = {
			[formData["title"] as string]: { ...formData },
		};
		payload["PerviousKey"] = title;
		dispatch({
			type: "EDIT_FORM_ELEMENT",
			payload: payload,
		});
		if (state.autoSave) {
			saveForm();
		}
	}
	function changeFormSettings(data: any) {
		dispatch({ type: "EDIT_FORM_SETTINGS", payload: data });
		if (state.autoSave) {
			saveForm();
		}
	}
	function customValidate(formData: any, errors: any, label: any) {
		if (
			Object.keys(state.defaultForm.properties).includes(formData["title"]) &&
			formData["title"] !== label
		) {
			errors.title.addError(
				`Field with name ${formData["title"]} already exist`
			);
		}
		return errors;
	}
	const context: Context = {
		defaultForm: state.defaultForm,
		formFields: state.formFields,
		addElementToForm,
		CustomFieldTemplate,
		DeleteElementFromForm,
		EditElement,
		MoveElement,
		customValidate,
		changeFormSettings,
		setForm,
		isSaving: state.isSaving,
		autoSave: state.autoSave,
		setAutoSave,
		saveForm,
		setSaving,
		setChanged,
		changed: state.changed,
	};
	return (
		<GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
	);
};
