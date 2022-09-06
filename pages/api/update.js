import { table } from "../../utils/Airtable";

export default async (req, res) => {
  const { id, title, text } = req.body;

  try {
    const newRecords = await table.update([{ id, fields: { title, text } }]);
    res.status(200).json({
      id: newRecords[0].id,
      fields: newRecords[0].fields,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
