interface TextField {
	(formData: {
		title: string;
		description: string;
		default: string;
		isRequired: boolean;
	}): {
		item: {};
		uiSchema: {};
		required: [string | false];
	};
}
export const textField: TextField = (formData) => {
	return {
		item: {
			[formData["title"]]: {
				type: "string",
				title: formData.title,
				description: formData.description,
				default: formData.default,
			},
		},
		uiSchema: {},
		required: [formData.isRequired && formData.title],
	};
};

export const textareaField: TextField = (formData) => {
	const _textField = textField(formData);
	_textField.uiSchema = { [formData.title]: { "ui:widget": "textarea" } };
	return _textField;
};

export const ColorField: TextField = (formData) => {
	const _ColorField = textField(formData);
	_ColorField.uiSchema = {
		[formData.title]: {
			"ui:options": {
				inputType: "color",
			},
		},
	};
	return _ColorField;
};

export const emailField: TextField = (formData) => {
	const _EmailField = textField(formData);
	_EmailField.uiSchema = {
		[formData.title]: {
			"ui:options": {
				inputType: "email",
			},
		},
	};
	return _EmailField;
};

export const urlField: TextField = (formData) => {
	const _UrlField = textField(formData);
	_UrlField.uiSchema = {
		[formData.title]: {
			"ui:options": {
				inputType: "url",
			},
		},
	};
	return _UrlField;
};

export const dateField: TextField = (formData) => {
	const _DateField = textField(formData);
	_DateField.uiSchema = {
		[formData.title]: {
			"ui:options": {
				inputType: "date",
			},
		},
	};
	return _DateField;
};

export const dateTimeField: TextField = (formData) => {
	const _DateField = textField(formData);
	_DateField.uiSchema = {
		[formData.title]: {
			"ui:options": {
				inputType: "datetime-local",
			},
		},
	};
	return _DateField;
};
interface BooleanField {
	(formData: {
		title: string;
		description: string;
		default: boolean;
		isRequired: boolean;
	}): {
		item: {};
		uiSchema: {};
		required: [string | false];
	};
}
export const booleanField: BooleanField = (formData) => {
	return {
		item: {
			[formData["title"]]: {
				type: "boolean",
				title: formData.title,
				description: formData.description,
				default: formData.default,
			},
		},
		uiSchema: {},
		required: [formData.isRequired && formData.title],
	};
};
interface NumberField {
	(formData: {
		title: string;
		description: string;
		default: number;
		isRequired: boolean;
		minimum?: number;
		maximum?: number;
		multipleOf?: number;
	}): {
		item: {};
		uiSchema: {};
		required: [string | false];
	};
}
export const numberField: NumberField = (formData) => {
	return {
		item: {
			[formData["title"]]: {
				type: "integer",
				title: formData.title,
				description: formData.description,
				default: formData.default,
				...(formData.minimum && { minimum: formData.minimum }),
				...(formData.maximum && { maximum: formData.maximum }),
				...(formData.multipleOf && { multipleOf: formData.multipleOf }),
			},
		},
		uiSchema: {
			[formData.title]: {
				"ui:widget": "updown",
				"ui:hint": `Minimum: ${formData.minimum}, Maximum: ${formData.maximum}`,
			},
		},
		required: [formData.isRequired && formData.title],
	};
};

interface ListField {
	(formData: {
		title: string;
		description: string;
		listOfStrings: string[];
		isRequired: boolean;
	}): {
		item: {};
		uiSchema: {};
		required: [string | false];
	};
}
export const listField: ListField = (formData) => {
	return {
		item: {
			[formData["title"]]: {
				type: "string",
				title: formData.title,
				description: formData.description,
				enum: formData.listOfStrings,
			},
		},
		uiSchema: {},
		required: [formData.isRequired && formData.title],
	};
};
