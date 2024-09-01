import { NextApiRequest, NextApiResponse } from 'next';
import { createComment } from "../../lib/comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);

        const resJson = await createComment(body);

        if (resJson.errors) {
            return res.status(500).json({ message: resJson.errors[0].message, body: body });
        } else if (resJson.data.createComment !== null && resJson.data.createComment.success === true) {
            return res.status(200).json({ message: "Your comment is awaiting approval" });
        }

        return res.status(500).json({ message: "Some error occurred" });
    } catch (error) {
        return res.status(500).json({ message: "Invalid request body" });
    }
}
