import { on } from "./utils/tools";
import { Config } from "./config/index";
import { setConfig } from "./config";
import { handleError } from "./handlers";

export default class SM {
  constructor(options) {
    this.init(options);
  }

  init(options) {
    setConfig(options);
    Config.isError && this.addListenJs();
  }

  private addListenJs() {
    on("error", handleError);
  }
}
