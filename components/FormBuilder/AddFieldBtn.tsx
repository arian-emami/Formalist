import React, { ReactElement } from "react";
import {
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	VStack,
	Box,
} from "@chakra-ui/react";
import { Fields } from "../Pages/Builder";
import { MdAdd } from "react-icons/md";
import FieldAdderBtn from "./FieldAdderBtn";

type Props = {
	formsSchema: Fields;
};
const AddFieldBtn = ({ formsSchema }: Props) => {
	return (
		<>
			<Popover placement="top">
				<Box>
					<PopoverTrigger>
						<Button w={"100%"} leftIcon={<MdAdd />}>
							Add Field
						</Button>
					</PopoverTrigger>
					<PopoverContent rootProps={{ zIndex: 1101 }}>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>Fields</PopoverHeader>
						<PopoverBody h={220} overflowY={"scroll"}>
							<VStack>
								{Object.keys(formsSchema).map((key, index) => (
									<FieldAdderBtn
										formName={key}
										uiName={formsSchema[key].uiName}
										icon={formsSchema[key].icon}
										key={index}
									/>
								))}
							</VStack>
						</PopoverBody>
					</PopoverContent>
				</Box>
			</Popover>
		</>
	);
};

export default AddFieldBtn;
