import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = await clientPromise;
	const ObjectID = require("mongodb").ObjectID;
	const db = client.db("Formly");
	switch (req.method) {
		case "POST":
			let newForm = await db
				.collection("forms")
				.replaceOne(
					{ _id: new ObjectID(req.body.id) },
					req.body.form,
					function (err: any, result: any) {
						if (err) {
							res.status(500).send({ error: "An error has occurred" });
						} else {
							res.status(200).json(result);
						}
					}
				);
			break;
	}
}
