import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";
type Data = {
	submissions?: any;
	error?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const ObjectID = require("mongodb").ObjectID;
	const client = await clientPromise;
	const db = client.db("Formly");
	switch (req.method) {
		case "POST":
			const submissions = await db
				.collection("submissions")
				.find({ form_id: new ObjectID(req.body.id) })
				.toArray();
			res.status(200).json({ submissions: submissions });

			break;
	}
}
