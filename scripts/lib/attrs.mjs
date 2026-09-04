// HTML/SVG attribute -> React prop name.
const EXPLICIT = new Map(
  Object.entries({
    class: "className",
    for: "htmlFor",
    srcset: "srcSet",
    tabindex: "tabIndex",
    maxlength: "maxLength",
    minlength: "minLength",
    readonly: "readOnly",
    autocomplete: "autoComplete",
    autocapitalize: "autoCapitalize",
    autocorrect: "autoCorrect",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    novalidate: "noValidate",
    contenteditable: "contentEditable",
    spellcheck: "spellCheck",
    crossorigin: "crossOrigin",
    playsinline: "playsInline",
    allowfullscreen: "allowFullScreen",
    colspan: "colSpan",
    rowspan: "rowSpan",
    usemap: "useMap",
    datetime: "dateTime",
    enctype: "encType",
    formaction: "formAction",
    accesskey: "accessKey",
    "http-equiv": "httpEquiv",
    charset: "charSet",
    referrerpolicy: "referrerPolicy",
    frameborder: "frameBorder",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    srclang: "srcLang",
    hreflang: "hrefLang",
    inputmode: "inputMode",
    itemprop: "itemProp",
    itemscope: "itemScope",
    itemtype: "itemType",
    itemid: "itemID",
    itemref: "itemRef",
    "xlink:href": "xlinkHref",
    "xlink:title": "xlinkTitle",
    "xmlns:xlink": "xmlnsXlink",
    "xml:space": "xmlSpace",
    "xml:lang": "xmlLang",
  }),
);

// Attributes React expects to receive a boolean rather than a string.
export const BOOLEAN_PROPS = new Set([
  "allowFullScreen",
  "async",
  "autoFocus",
  "autoPlay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formNoValidate",
  "hidden",
  "inert",
  "isMap",
  "itemScope",
  "loop",
  "multiple",
  "muted",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "selected",
]);

const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export function toReactProp(name) {
  if (EXPLICIT.has(name)) return EXPLICIT.get(name);
  if (name.startsWith("data-") || name.startsWith("aria-")) return name;
  // SVG presentation attributes (fill-rule, stroke-width, …) camelCase in JSX.
  if (name.includes("-")) return kebabToCamel(name);
  return name;
}

/** Split a CSS declaration list on `;` / `:` while respecting quotes and parens. */
export function parseStyle(css) {
  const chunks = [];
  let depth = 0,
    quote = null,
    buf = "";
  const flush = () => {
    if (buf.trim()) chunks.push(buf);
    buf = "";
  };
  for (const ch of css) {
    if (quote) {
      buf += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
      continue;
    }
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) {
      flush();
      continue;
    }
    buf += ch;
  }
  flush();

  const decls = [];
  for (const decl of chunks) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop) continue;
    let key;
    if (prop.startsWith("--"))
      key = prop; // custom property
    else if (prop.startsWith("-ms-"))
      key = "ms" + kebabToCamel(prop.slice(4)).replace(/^./, (c) => c.toUpperCase());
    else if (prop.startsWith("-"))
      key = kebabToCamel(prop.slice(1)).replace(/^./, (c) => c.toUpperCase());
    else key = kebabToCamel(prop);
    decls.push([key, value]);
  }
  return decls;
}
