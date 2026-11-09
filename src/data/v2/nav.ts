/**
 * The site menu: the three mega-menu panels on desktop (Journeys, Places, Services) and the
 * same groups as accordions in the phone menu.
 *
 * Headings, labels and the feature cards are words in `src/content/site/shared.json`
 * (`megaMenu`). The links under a heading come from a collection (`source`), so a new
 * journey, place, group type, wedding style or vehicle shows up in the menu by itself.
 * `region` narrows places to one region; `picks` lists chosen entries under labels of their
 * own (the journeys "By style"); `links` are fixed links added after the entries.
 * A link label may name a collection's size: "All {places} places".
 */
import data from "@/content/site/shared.json";

import { packagesV2, packageV2Slugs } from "./packages";
import { places, type RegionKey } from "./places";
import { groupTypes, vehicles, weddingStyles } from "./services";

export type MenuLink = { label: string; href: string };
export type MenuGroup = { heading: string; links: MenuLink[] };

export type MenuFeature = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  action: string;
  /** A photo, or (for Places) the island map drawn from the places' own map positions. */
  image?: string;
  alt?: string;
  map?: boolean;
};

export type MenuPanel = {
  key: string;
  label: string;
  columns: MenuGroup[][];
  feature: MenuFeature;
};

type Source = "packages" | "places" | "groups" | "weddings" | "vehicles";
type GroupJson = {
  heading: string;
  source?: Source;
  region?: RegionKey;
  picks?: { label: string; slug: string }[];
  links?: MenuLink[];
};
type FeatureJson = Partial<MenuFeature> & { eyebrow: string; action: string; package?: string };
type PanelJson = { key: string; label: string; columns: GroupJson[][]; feature: FeatureJson };

type Entry = { slug: string; label: string; href: string; region?: RegionKey };

const journeys = packageV2Slugs.flatMap((slug) => packagesV2[slug] ?? []);

const entries: Record<Source, Entry[]> = {
  packages: journeys.map((p) => ({ slug: p.slug, label: p.title, href: `/packages/${p.slug}` })),
  places: places.map((p) => ({
    slug: p.slug,
    label: p.name,
    href: `/places/${p.slug}`,
    region: p.region,
  })),
  groups: groupTypes.map((g) => ({
    slug: g.slug,
    label: g.name,
    href: `/group-vacations/${g.slug}`,
  })),
  weddings: weddingStyles.map((w) => ({
    slug: w.slug,
    label: w.name,
    href: `/weddings/${w.slug}`,
  })),
  vehicles: vehicles.map((v) => ({ slug: v.slug, label: v.name, href: `/vehicles/${v.slug}` })),
};

/** "All {places} places" → "All 14 places". */
const fill = (label: string) =>
  label.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in entries ? String(entries[key as Source].length) : match,
  );

function resolveGroup({ heading, source, region, picks, links = [] }: GroupJson): MenuGroup {
  const list = source ? entries[source] : [];
  const fromSource = picks
    ? picks.flatMap(({ label, slug }) => {
        const entry = list.find((e) => e.slug === slug);
        return entry ? [{ label, href: entry.href }] : [];
      })
    : list
        .filter((e) => !region || e.region === region)
        .map(({ label, href }) => ({ label, href }));
  return { heading, links: [...fromSource, ...links.map((l) => ({ ...l, label: fill(l.label) }))] };
}

/**
 * The Journeys card shows `menuFeature` when there is one; any part it leaves out comes
 * from the journey named in `package` (its title, summary and first photo).
 */
function resolveFeature({ package: slug, ...feature }: FeatureJson): MenuFeature {
  const journey = slug ? packagesV2[slug as keyof typeof packagesV2] : undefined;
  const chosen = slug ? data.menuFeature : undefined;
  return {
    ...feature,
    title: feature.title ?? chosen?.title ?? journey?.title ?? "",
    body: feature.body ?? chosen?.body ?? journey?.summary ?? "",
    href: feature.href ?? chosen?.href ?? (journey ? `/packages/${journey.slug}` : "/packages"),
    image: feature.image ?? chosen?.image ?? journey?.shots[0]?.src,
  };
}

export const menuPanels: MenuPanel[] = (data.megaMenu as PanelJson[]).map((panel) => ({
  key: panel.key,
  label: panel.label,
  columns: panel.columns.map((column) =>
    column.map(resolveGroup).filter((g) => g.links.length > 0),
  ),
  feature: resolveFeature(panel.feature),
}));

/** Plain links after the panels: Travel notes, About. */
export const menuLinks: MenuLink[] = data.navLinks;
