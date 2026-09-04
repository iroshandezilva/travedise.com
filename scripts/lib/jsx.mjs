import { toReactProp, BOOLEAN_PROPS, parseStyle } from "./attrs.mjs";

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

// Props React types as numbers rather than strings.
const NUMERIC_PROPS = new Set([
  "maxLength",
  "minLength",
  "rows",
  "cols",
  "size",
  "span",
  "start",
  "colSpan",
  "rowSpan",
  "tabIndex",
]);

// Elements whose text content must survive verbatim.
const RAW_TEXT = new Set(["script", "style", "pre"]);

const jsString = (s) => JSON.stringify(s);
const jsTemplate = (s) =>
  "`" + s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

/** Escape a text node for use as literal JSX text. */
function jsxText(text) {
  // `{`, `}` and `<`/`>` are JSX syntax; everything else (including entities that
  // parse5 already decoded into real characters) can be emitted as-is.
  if (/[{}<>]/.test(text) || /\r|\n/.test(text)) return `{${jsString(text)}}`;
  return text;
}

/**
 * Convert a parse5 document/element tree into a JSX source string.
 *
 * `opts.rewriteUrl(url, attrName, node)` maps an href/src/srcset/style-url onto its
 * new location; `opts.skip(node)` drops a node entirely.
 */
export function nodesToJsx(nodes, opts = {}, indent = "  ") {
  const rewriteUrl = opts.rewriteUrl ?? ((u) => u);
  const skip = opts.skip ?? (() => false);

  const URL_ATTRS = new Set([
    "src",
    "href",
    "data-src",
    "poster",
    "action",
    "data-poster-url",
    "data-video-urls",
  ]);

  const tagOf = (node) => node.tagName;

  function renderAttrs(node) {
    const parts = [];
    for (const attr of node.attrs ?? []) {
      const rawName = attr.prefix ? `${attr.prefix}:${attr.name}` : attr.name;
      let value = attr.value;

      if (rawName === "style") {
        const decls = parseStyle(value).map(([k, v]) => {
          const rewritten = v.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (whole, q, u) => {
            const next = rewriteUrl(u, "style", node);
            return next === u ? whole : `url(${next})`;
          });
          const key = /^[A-Za-z][A-Za-z0-9]*$/.test(k) ? k : jsString(k);
          return `${key}: ${jsString(rewritten)}`;
        });
        if (decls.length) parts.push(`style={{ ${decls.join(", ")} }}`);
        continue;
      }

      if (rawName === "srcset" || rawName === "data-srcset") {
        value = value
          .split(",")
          .map((candidate) => {
            const m = candidate.trim().match(/^(\S+)(\s+.*)?$/);
            return m ? rewriteUrl(m[1], rawName, node) + (m[2] ?? "") : candidate.trim();
          })
          .join(", ");
      } else if (URL_ATTRS.has(rawName)) {
        value = rewriteUrl(value, rawName, node);
      }

      let prop = toReactProp(rawName);
      // React treats `value` as a controlled prop; the export only ever ships defaults.
      if (prop === "value" && (tagOf(node) === "input" || tagOf(node) === "select"))
        prop = "defaultValue";
      if (BOOLEAN_PROPS.has(prop)) {
        // `required=""` / `disabled="disabled"` both mean true in HTML.
        parts.push(`${prop}`);
        continue;
      }
      // JSX allows hyphens and colons in attribute names (data-*, aria-*, xlink:*).
      if (!/^[A-Za-z_$][A-Za-z0-9_$:-]*$/.test(prop)) continue;
      if (NUMERIC_PROPS.has(prop) && /^-?\d+$/.test(value.trim())) {
        parts.push(`${prop}={${Number(value)}}`);
        continue;
      }
      parts.push(value.includes('"') ? `${prop}={${jsString(value)}}` : `${prop}="${value}"`);
    }
    return parts;
  }

  function renderNode(node, depth) {
    if (skip(node)) return "";
    const pad = indent.repeat(depth);

    if (node.nodeName === "#text") return jsxText(node.value);
    if (node.nodeName === "#comment") return `{/*${node.data.replace(/\*\//g, "*\\/")}*/}`;
    if (node.nodeName === "#documentType") return "";

    const tag = node.tagName;
    const attrs = renderAttrs(node);
    const attrStr = attrs.length ? " " + attrs.join(" ") : "";

    if (VOID_ELEMENTS.has(tag)) return `<${tag}${attrStr} />`;

    if (tag === "textarea") {
      const raw = (node.childNodes ?? []).map((c) => c.value ?? "").join("");
      return `<${tag}${attrStr} defaultValue={${jsString(raw)}} />`;
    }

    if (RAW_TEXT.has(tag)) {
      const raw = (node.childNodes ?? []).map((c) => c.value ?? "").join("");
      if (!raw) return `<${tag}${attrStr} />`;
      return `<${tag}${attrStr} dangerouslySetInnerHTML={{ __html: ${jsTemplate(raw)} }} />`;
    }

    const children = (node.childNodes ?? []).filter((c) => !skip(c));
    if (!children.length) return `<${tag}${attrStr}></${tag}>`;

    // Adding whitespace between children is only safe when none of them is text:
    // JSX drops whitespace-only lines but keeps spaces that sit beside text.
    const hasText = children.some((c) => c.nodeName === "#text");
    if (hasText) {
      const inner = children.map((c) => renderNode(c, depth)).join("");
      return `<${tag}${attrStr}>${inner}</${tag}>`;
    }
    const inner = children
      .map((c) => indent.repeat(depth + 1) + renderNode(c, depth + 1))
      .join("\n");
    return `<${tag}${attrStr}>\n${inner}\n${pad}</${tag}>`;
  }

  return nodes
    .filter((n) => !skip(n))
    .map((n) => renderNode(n, 1))
    .filter(Boolean);
}
