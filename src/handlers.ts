import { getCommonMsg } from "./utils";
import { report } from "./reporter";

export function handleError<T extends ErrorEvent>(err: T) {
  if (err.type === "error") {
    if (err instanceof ErrorEvent) {
      reportCaughtError(err);
    }
  }
}

function reportCaughtError(error: any) {
  const commonMsg = getCommonMsg();
  let n = error.name || "CustomError",
    a = error.message || "",
    i = error.error.stack || "";
  const msg: ErrorMsg = {
    ...commonMsg,
    ...{
      t: "error",
      st: "caughterror",
      cate: n,
      msg: a && a.substring(0, 1e3),
      detail: i && i.substring(0, 1e3), // error stack
      file: error.filename || "",
      line: error.lineno || "",
      col: error.colno || ""
    }
  };
  report(msg);
}
