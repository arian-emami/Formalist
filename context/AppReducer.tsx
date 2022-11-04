const AppReducer = (state: any, action: any) => {
	const array_move = (
		arr: Array<any>,
		old_index: number,
		new_index: number
	) => {
		if (new_index <= arr.length && new_index >= 0) {
			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		}
	};
	switch (action.type) {
		case "SET_FORM":
			return {
				...state,
				isLoaded: true,
				defaultForm: {
					//...state.defaultForm,
					...action.payload,
					shareableUrl: `${window.location.origin}/form/${action.payload._id} `,
				},
			};
		case "SET_AUTOSAVE":
			return {
				...state,
				autoSave: action.payload,
			};
		case "SET_CHANGED":
			return {
				...state,
				changed: action.payload,
			};
		case "ADD_FORM_ELEMENT":
			return {
				...state,
				changed: true,
				defaultForm: {
					...state.defaultForm,
					required: [
						...state.defaultForm.required,
						...action.payload.required.filter((item: any) => item !== false),
					],
					properties: {
						...state.defaultForm.properties,
						...action.payload.item,
					},
					uiSchema: {
						...state.defaultForm.uiSchema,
						...action.payload.uiSchema,
						"ui:order": [
							...(state.defaultForm.uiSchema["ui:order"] || []),
							Object.keys(action.payload.item)[0],
						],
					},
					extraInfo: {
						...state.defaultForm.extraInfo,
						...action.payload.settings,
					},
				},
			};
		case "DEL_FORM_ELEMENT":
			const newState = {
				...state,
				changed: true,
				defaultForm: {
					...state.defaultForm,
					required: state.defaultForm.required.filter(
						(item: any) => item !== action.payload.key
					),
					properties: {
						...state.defaultForm.properties,
					},
					uiSchema: {
						...state.defaultForm.uiSchema,
						"ui:order": state.defaultForm.uiSchema["ui:order"].filter(
							(item: any) => item !== action.payload.key
						),
					},
					extraInfo: {
						...state.defaultForm.extraInfo,
					},
				},
			};

			delete newState.defaultForm.properties[action.payload.key];
			delete newState.defaultForm.uiSchema[action.payload.key];
			delete newState.defaultForm.extraInfo[action.payload.key];
			return newState;
		case "EDIT_FORM_ELEMENT":
			let fieldsOrder = state.defaultForm.uiSchema["ui:order"];
			fieldsOrder = fieldsOrder.map((item: string) =>
				item === action.payload.PerviousKey
					? Object.values(action.payload.item as object)[0].title
					: item
			);
			const cleanState = {
				...state,
				defaultForm: {
					...state.defaultForm,
					required: state.defaultForm.required.filter(
						(item: any) => item !== action.payload.PerviousKey
					),
					properties: {
						...state.defaultForm.properties,
					},
					uiSchema: {
						...state.defaultForm.uiSchema,
						"ui:order": state.defaultForm.uiSchema["ui:order"].filter(
							(item: any) => item !== action.payload.PerviousKey
						),
					},
					extraInfo: {
						...state.defaultForm.extraInfo,
					},
				},
			};
			delete cleanState.defaultForm.properties[action.payload.PerviousKey];
			delete cleanState.defaultForm.uiSchema[action.payload.PerviousKey];
			delete cleanState.defaultForm.extraInfo[action.payload.PerviousKey];
			return {
				...cleanState,
				changed: true,
				defaultForm: {
					...cleanState.defaultForm,
					required: [
						...cleanState.defaultForm.required,
						...action.payload.required.filter((item: any) => item !== false),
					],
					properties: {
						...cleanState.defaultForm.properties,
						...action.payload.item,
					},
					uiSchema: {
						...cleanState.defaultForm.uiSchema,
						...action.payload.uiSchema,
						"ui:order": fieldsOrder,
					},
					extraInfo: {
						...cleanState.defaultForm.extraInfo,
						...action.payload.settings,
					},
				},
			};
		case "MOVE":
			let moveFieldsOrder = state.defaultForm.uiSchema["ui:order"];
			const itemIndex = moveFieldsOrder.indexOf(action.payload.key);
			if (action.payload.up) {
				array_move(moveFieldsOrder, itemIndex, itemIndex + 1);
			} else {
				array_move(moveFieldsOrder, itemIndex, itemIndex - 1);
			}
			return {
				...state,
				defaultForm: {
					...state.defaultForm,
					uiSchema: {
						...state.defaultForm.uiSchema,
						"ui:order": moveFieldsOrder,
					},
				},
			};
		case "EDIT_FORM_SETTINGS":
			return {
				...state,
				defaultForm: {
					...state.defaultForm,
					formSettings: {
						...state.defaultForm.formSettings,
						data: action.payload,
					},
				},
			};
		case "SET_SAVING":
			return {
				...state,
				isSaving: action.payload,
			};
		default:
			return state;
	}
};
export default AppReducer;
