import { table } from "../../utils/airtable";

export default async (req, res) => {
  try {
    const notes = await table.select({}).firstPage();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
