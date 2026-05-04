import lume from "lume/mod.ts";
import theme from "./mod.ts";

const site = lume();

site.use(theme());

export default site;
