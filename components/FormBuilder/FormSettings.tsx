import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
	HStack,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
import React, { useContext, useEffect, useState } from "react";
import { MdSettings } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalProvider";
import validator from "@rjsf/validator-ajv6";

const FormSettings = () => {
	const {
		isOpen: isSettingsOpen,
		onOpen: onSettingsOpen,
		onClose: onSettingsClose,
	} = useDisclosure();
	const context = useContext(GlobalContext);
	const [changed, setChanged] = useState(false);
	useEffect(() => {
		context.saveForm?.();
		onSettingsClose();
	}, [context.defaultForm.formSettings.data]);
	return (
		<>
			<Button
				leftIcon={<MdSettings />}
				aria-label={"Open form settings"}
				variant={"ghost"}
				colorScheme={"purple"}
				onClick={onSettingsOpen}
			>
				Settings
			</Button>
			<Modal isOpen={isSettingsOpen} onClose={onSettingsClose} size={"xs"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Form Settings</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Form
							schema={context.defaultForm.formSettings?.form}
							validator={validator}
							formData={context.defaultForm.formSettings?.data}
							uiSchema={context.defaultForm.formSettings?.form.uiSchema}
							onSubmit={async (data, e) => {
								context.changeFormSettings?.(data.formData);
								//onSettingsClose();
							}}
						>
							<Alert status="info">
								<AlertIcon />
								If checked, any submission to this form will be publicly visible
								to anyone visiting the form URL
							</Alert>

							<ModalFooter>
								<HStack marginRight={-6}>
									<Button variant={"ghost"} onClick={onSettingsClose}>
										Cancel
									</Button>
									<Button type={"submit"} isLoading={context.isSaving}>
										Submit
									</Button>
								</HStack>
							</ModalFooter>
						</Form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default FormSettings;
