import * as Yup from "yup";

const uniqueInsensitive = (label: string) =>
  (list?: (string | undefined)[]) => {
    if (!Array.isArray(list)) return true;
    const seen = new Set<string>();
    for (const item of list) {
      const key = (item ?? "").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
    }
    return true;
  };

function stringList({
  label,
  itemMaxLen,
  minItems = 0,
  maxItems,
}: {
  label: string;
  itemMaxLen: number;
  minItems?: number;
  maxItems?: number;
}) {
  let schema = Yup.array(
    Yup.string()
      .transform((value) => (typeof value === "string" ? value.trim() : value))
      .trim()
      .min(1, `${label} item can't be empty`)
      .max(itemMaxLen, `${label} item max ${itemMaxLen} chars`)
  )
    .ensure()
    .test("unique", `${label} must be unique`, uniqueInsensitive(label));

  if (minItems > 0) schema = schema.min(minItems, `Add at least ${minItems} ${label.toLowerCase()}`);
  if (maxItems) schema = schema.max(maxItems, `Max ${maxItems} ${label.toLowerCase()}`);

  return schema;
}

export const MovieDetailsSchema = Yup.object({
  cast: stringList({ label: "Cast", itemMaxLen: 80, minItems: 1, maxItems: 20 }),
  genres: stringList({ label: "Genres", itemMaxLen: 30, minItems: 1, maxItems: 10 }),
  tags: stringList({ label: "Tags", itemMaxLen: 30, minItems: 1, maxItems: 25 }),
});
