import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";
type Data = {
	submissions?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const ObjectID = require("mongodb").ObjectID;
	const client = await clientPromise;
	const db = client.db("Formly");
	switch (req.method) {
		case "POST":
			let { id, ...bodyObject } = req.body;
			const _doc = {
				form_id: new ObjectID(id),
				...bodyObject,
			};
			let submission = await db.collection("submissions").insertOne(_doc);
			res.status(200).json(submission.insertedId);
			break;
		case "GET":
			const submissions = await db
				.collection("forms")
				.find({ form_id: new ObjectID(req.body.id) })
				.toArray();
			res.status(200).json({ submissions: submissions });
			break;
	}
}
