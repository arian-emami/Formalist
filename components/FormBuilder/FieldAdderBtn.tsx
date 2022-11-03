import React, { useContext } from "react";
import {
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	HStack,
} from "@chakra-ui/react";
import validator from "@rjsf/validator-ajv6";
import { Form } from "@rjsf/chakra-ui";
import { GlobalContext } from "../../context/GlobalProvider";
type Props = {
	uiName: string;
	formName: string;
	icon: React.ReactElement;
};
const FieldAdderBtn = ({ uiName, formName, icon }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const context = useContext(GlobalContext);
	const onSubmit = ({ formData }: { formData: any }, e: React.FormEvent) => {
		if (context.addElementToForm) {
			context.addElementToForm({ formData });
		}
		onClose();
	};
	return (
		<>
			<Button
				w={"100%"}
				variant="outline"
				colorScheme="gray"
				aria-label={` Add ${uiName}`}
				leftIcon={icon}
				onClick={onOpen}
			>
				{uiName}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Adding {uiName}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Form
							schema={context.formFields[formName]["schema"]}
							validator={validator}
							onSubmit={onSubmit}
							uiSchema={context.formFields[formName]["uiSchema"]}
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
	);
};

export default FieldAdderBtn;
