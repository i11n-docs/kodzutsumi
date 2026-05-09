import createSlugifier, {
  Options as SlugifierOptions,
} from "lume/core/slugifier.ts";
import "lume/types.ts";

interface HeaderLinkOptions {
  class: string | false;
}

const headerLinkDefaults: HeaderLinkOptions = {
  class: "header-anchor",
};

/**
 * Generate the anchor with the whole header. Example:
 *
 * ```html
 * <h1 id="foo">This is the title</h1>
 * is converted to:
 * <h1 id="foo"><a href="#foo">This is the title</a></h1>
 * ```
 */
function headerLink(userOptions: Partial<HeaderLinkOptions> = {}) {
  const options = Object.assign({}, headerLinkDefaults, userOptions);

  // deno-lint-ignore no-explicit-any
  return function anchor(slug: string, state: any, i: number) {
    const linkOpen = new state.Token("link_open", "a", 1);
    linkOpen.attrSet("href", `#${slug}`);

    if (options.class) {
      linkOpen.attrSet("class", options.class);
    }

    const content = new state.Token("inline", "", 0);
    content.children = [
      linkOpen,
      ...state.tokens[i + 1].children,
      new state.Token("link_close", "a", -1),
    ];

    state.tokens[i + 1] = content;
  };
}

interface LinkInsideHeaderOptions {
  class: string | false;
  placement: "before" | "after";
  ariaHidden: boolean;
  content: string;
}

const LinkInsideHeaderOptions: LinkInsideHeaderOptions = {
  class: "header-anchor",
  placement: "after",
  ariaHidden: false,
  content: "#",
};

/**
 * Generate the anchor inside the header. Example:
 *
 * ```html
 * <h1 id="foo">This is the title</h1>
 * is converted to:
 * <h1 id="foo"><a href="#foo">#</a>This is the title</h1>
 * ```
 */
function linkInsideHeader(
  userOptions: Partial<LinkInsideHeaderOptions> = {},
) {
  const options = Object.assign({}, LinkInsideHeaderOptions, userOptions);

  // deno-lint-ignore no-explicit-any
  return function anchor(slug: string, state: any, i: number) {
    const linkOpen = new state.Token("link_open", "a", 1);
    linkOpen.attrSet("href", `#${slug}`);

    if (options.class) {
      linkOpen.attrSet("class", options.class);
    }

    if (options.ariaHidden) {
      linkOpen.attrSet("aria-hidden", "true");
    }

    const content = new state.Token("html_inline", "", 0);
    content.content = options.content;
    content.meta = { isPermalinkSymbol: true };

    const linkTokens = [
      linkOpen,
      content,
      new state.Token("link_close", "a", -1),
    ];

    const space = new state.Token("text", "", 0);
    space.content = " ";

    if (options.placement === "after") {
      state.tokens[i + 1].children.push(space, ...linkTokens);
    } else {
      state.tokens[i + 1].children.unshift(...linkTokens, space);
    }
  };
}


interface TocOptions {
  /** Minimum level to apply anchors. */
  level: number;

  /** Key to save the toc in the page data */
  key: string;

  /** Anchor type */
  anchor: false | ((slug: string, state: any, idx: number) => void);

  /** Slugify function */
  slugify: (x: string) => string;

  /** Value of the tabindex attribute on headings, set to false to disable. */
  tabIndex: number | false;
}

const defaults: Options = {
  level: 2,
  key: "toc",
  anchor: headerLink(),
  slugify,
  tabIndex: -1,
};

interface Node {
  level: number;
  text: string;
  slug: string;
  url: string;
  children: Node[];
}

const STARTS_WITH_LETTER = /^[a-z]/i;

function toc(md: any, userOptions: Partial<Options> = {}) {
  const options = Object.assign({}, defaults, userOptions) as Options;

  function headings2ast(state: any, pageUrl?: string): Node[] {
    const tokens: any[] = state.tokens;
    const ast: Node = { level: 0, text: "", slug: "", url: "", children: [] };
    const stack = [ast];
    const slugs = new Set<string>();

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type !== "heading_open") {
        continue;
      }

      // Calculate the level
      const level = parseInt(token.tag.substr(1), 10);

      if (level < options.level) {
        continue;
      }

      // Get the text
      const text = getRawText(tokens[i + 1].children);

      // Get the slug
      let slug = token.attrGet("id") || options.slugify(text);

      // Make sure the slug starts with a letter
      if (!STARTS_WITH_LETTER.test(slug)) {
        slug = `h_${slug}`;
      }

      // Make sure the slug is unique
      while (slugs.has(slug)) {
        slug += "-1";
      }
      slugs.add(slug);

      token.attrSet("id", slug);

      if (options.tabIndex !== false) {
        token.attrSet("tabindex", `${options.tabIndex}`);
      }

      if (options.anchor) {
        options.anchor(slug, state, i);
      }

      // A permalink renderer could modify the `tokens` array so
      // make sure to get the up-to-date index on each iteration.
      i = tokens.indexOf(token);

      // Create the node
      const url = pageUrl ? `${pageUrl}#${slug}` : `#${slug}`;

      // Save the node in the tree
      const node: Node = { level, text, slug, url, children: [] };

      if (node.level > stack[0].level) {
        stack[0].children.push(node);
        stack.unshift(node);
        continue;
      }

      if (node.level === stack[0].level) {
        stack[1].children.push(node);
        stack[0] = node;
        continue;
      }

      while (node.level <= stack[0].level) {
        stack.shift();
      }
      stack[0].children.push(node);
      stack.unshift(node);
    }

    return ast.children;
  }

  md.core.ruler.push("generateTocAst", function (state: any) {
    const data = state.env.data?.page?.data;

    if (!data) {
      return;
    }

    data[options.key] = headings2ast(state, data.url);
  });
}

function getRawText(tokens: any[]) {
  let text = "";

  for (const token of tokens) {
    switch (token.type) {
      case "text":
      case "code_inline":
        text += token.content;
        break;
      case "softbreak":
      case "hardbreak":
        text += " ";
        break;
    }
  }

  return text;
}

function slugify(x: string): string {
  return encodeURIComponent(
    String(x).trim().toLowerCase().replace(/\s+/g, "-"),
  );
}

interface Options extends Omit<TocOptions, "slugify"> {
  slugify: Partial<SlugifierOptions> | ((text: string) => string) | undefined;
}

export default function tocPlugin(userOptions: Partial<Options> = {}) {
  const options = { ...defaults, ...{ slugify: undefined }, ...userOptions };
  const { slugify } = options;

  if (!slugify || typeof slugify !== "function") {
    options.slugify = createSlugifier(slugify);
  }

  return function (site: Lume.Site) {
    site.hooks.addMarkdownItPlugin(toc, options);
  };
}