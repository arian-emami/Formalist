import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";
type Data = {
	_id?: string;
	formObject?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const client = await clientPromise;
	const db = client.db("Formly");
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let newForm = await db.collection("forms").insertOne(bodyObject);
			res.status(200).json(newForm.insertedId);
			break;
		case "GET":
			const form = await db.collection("forms").find({ _id: bodyObject.id });
			res.status(200).json({ _id: bodyObject.id, formObject: form });
			break;
	}
}
