import log from "loglevel";
import { reg, apply } from "loglevel-plugin-prefix";

log.setDefaultLevel("TRACE");
reg(log);
apply(log);

if (process.env.NODE_ENV === "production") {
  log.setLevel("ERROR");
}

export default log;
