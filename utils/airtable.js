const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const table = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME);

const minifyItems = (records) => {
  return records.map((record) => {
    if (!record.fields.text) {
      record.fields.text = "";
    }
    return {
      id: record.id,
      fields: record.fields,
    };
  });
};

export { table, minifyItems };
