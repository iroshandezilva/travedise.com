/**
 * Data behind the three service sections: Vehicles (`/vehicles`), Weddings (`/weddings`)
 * and Group vacations (`/group-vacations`).
 *
 * Each section has a collection (one JSON file per vehicle class, wedding style or group
 * type, ordered by `order`) and a page file in `src/content/pages/` with the section's
 * own words and its enquiry form. Adding a vehicle, a style or a group type is a matter
 * of adding a file: the listing, the detail page, the form's choices and the sitemap all
 * follow.
 */
import groupsPage from "@/content/pages/groups.json";
import vehiclesPage from "@/content/pages/vehicles.json";
import weddingsPage from "@/content/pages/weddings.json";
import plan from "@/content/pages/plan.json";

type Titled = { title: string; body: string };
type Question = { q: string; a: string };
type Photo = { src: string; alt: string; position?: string };
type Fact = { value: string; detail: string };

export type Silhouette = "car" | "suv" | "van" | "minibus" | "coach" | "jeep" | "tuktuk";

export type Vehicle = {
  order: number;
  slug: string;
  name: string;
  silhouette: Silhouette;
  seats: { min: number; max: number };
  seatsLabel: string;
  bags: string;
  models: string;
  short: string;
  summary: string;
  suits: string[];
  features: Titled[];
  included: string[];
  questions: Question[];
};

export type WeddingStyle = {
  order: number;
  slug: string;
  name: string;
  short: string;
  summary: string;
  image: Photo;
  facts: Fact[];
  intro: { heading: string; paragraphs: [string, string] };
  schedule: {
    heading: string;
    lede: string;
    items: { when: string; title: string; body: string }[];
  };
  includes: { heading: string; body: string; items: Titled[] };
  settings: string[];
  questions: Question[];
};

export type GroupType = {
  order: number;
  slug: string;
  name: string;
  theme: string;
  size: string;
  short: string;
  summary: string;
  image: Photo;
  facts: Fact[];
  suits: { heading: string; body: string; points: string[] };
  services: { heading: string; body: string; items: Titled[] };
  shapes: {
    heading: string;
    lede: string;
    items: { title: string; length: string; body: string }[];
  };
  questions: Question[];
};

const sorted = <T extends { order: number }>(files: Record<string, T>) =>
  Object.values(files).sort((a, b) => a.order - b.order);

export const vehicles = sorted(
  import.meta.glob<Vehicle>("/src/content/vehicles/*.json", { eager: true, import: "default" }),
);
export const weddingStyles = sorted(
  import.meta.glob<WeddingStyle>("/src/content/weddings/*.json", {
    eager: true,
    import: "default",
  }),
);
export const groupTypes = sorted(
  import.meta.glob<GroupType>("/src/content/groups/*.json", { eager: true, import: "default" }),
);

/** JSON imports widen the form's field types to `string`; the form's shape is FormConfig. */
type WithForm<T> = Omit<T, "form"> & { form: FormConfig };
export const vehiclesContent = vehiclesPage as unknown as WithForm<typeof vehiclesPage>;
export const weddingsContent = weddingsPage as unknown as WithForm<typeof weddingsPage>;
export const groupsContent = groupsPage as unknown as WithForm<typeof groupsPage>;

export const weddingSettings = weddingsPage.settings.items;
export const settingsFor = (style: WeddingStyle) =>
  style.settings.flatMap((key) => weddingSettings.filter((s) => s.key === key));

/* ---------- The service enquiry form ---------- */

export type Service = "vehicle" | "wedding" | "group";

/** A question as written in a page file. `source` fills a select from a collection. */
type FieldConfig = {
  id: string;
  label: string;
  type: "select" | "chips" | "multi" | "text" | "number" | "date" | "month" | "textarea";
  options?: string[];
  source?: "vehicles" | "weddings" | "groups";
  placeholder?: string;
  optional?: boolean;
  required?: boolean;
  aside?: string;
  note?: string;
  min?: number;
  /** Fields sharing a `row` sit side by side on wide screens. */
  row?: string;
};

/** A choice in a select; `slug` lets a `?vehicle=` / `?style=` / `?type=` link pre-pick it. */
export type FieldOption = { label: string; slug?: string };
export type Field = Omit<FieldConfig, "options" | "source"> & {
  options: FieldOption[];
  param?: string;
};

export type FormConfig = {
  id: string;
  heading: string;
  body: string;
  stepOne: { title: string; body: string };
  stepTwo: { title: string; body: string };
  sent: { title: string; body: string };
  back: { label: string; href: string };
  fields: FieldConfig[];
};

const SOURCES = {
  vehicles: { list: vehicles, param: "vehicle" },
  weddings: { list: weddingStyles, param: "style" },
  groups: { list: groupTypes, param: "type" },
} as const;

/** The form's questions with every option list filled in. */
export function resolveFields(form: FormConfig): Field[] {
  return form.fields.map(({ options, source, ...field }) => {
    if (source) {
      const { list, param } = SOURCES[source];
      return {
        ...field,
        param,
        options: list.map((item) => ({ label: item.name, slug: item.slug })),
      };
    }
    return { ...field, options: (options ?? []).map((label) => ({ label })) };
  });
}

/** The contact step is the same as Plan your trip's, from `pages/plan.json`. */
export const contactChoices = {
  channels: plan.channels,
  countryCodes: plan.countryCodes,
  countries: plan.countries,
  heardFrom: plan.heardFrom,
  enquiryEmail: plan.enquiryEmail,
};

/** Splits a list into rows: fields with the same `row` go together, the rest alone. */
export function fieldRows(fields: Field[]): Field[][] {
  const rows: Field[][] = [];
  for (const field of fields) {
    const last = rows.at(-1);
    if (field.row && last && last[0].row === field.row) last.push(field);
    else rows.push([field]);
  }
  return rows;
}
