import plugins, { Options } from "./plugins.ts";

import "lume/types.ts";

export type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      "_includes/css/main.css",
      "_includes/layouts/base.vto",
      "_includes/layouts/home.vto",
      "_includes/layouts/doc.vto",
      "_includes/layouts/author.vto",
      "_includes/layouts/index.vto",
      "_includes/includes/sidebar.vto",
      "_includes/includes/sidebar-icon.vto",
      "_includes/includes/relation.vto",
      "_includes/includes/relations.vto",
      "uploads/favicon.png",
      "uploads/logo.png",
      "_data.yml",
      // "404.md",
      "index.vto",
      "style.css",
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./theme/${file}`));
    }
  };
}