import { warn, serialize } from "./utils/tools";
import { Config } from "./config";

export function report(e: ReportData) {
  "res" === e.t
    ? send(e)
    : "error" === e.t
    ? send(e)
    : "behavior" === e.t
    ? send(e)
    : "health" === e.t &&
      window &&
      window.navigator &&
      "function" == typeof window.navigator.sendBeacon
    ? sendBeacon(e)
    : send(e);
  return this;
}

export function send(msg: ReportData) {
  var body = msg[msg.t];
  delete msg[msg.t];
  var url = `${Config.reportUrl}?${serialize(msg)}`;
  post(url, {
    [msg.t]: body
  });
}

export function post(url, body) {
  var XMLHttpRequest = window.__oXMLHttpRequest_ || window.XMLHttpRequest;
  if (typeof XMLHttpRequest === "function") {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.send(JSON.stringify(body));
    } catch (e) {
      warn("[bombayjs] Failed to log, POST请求失败");
    }
  } else {
    warn("[bombayjs] Failed to log, 浏览器不支持XMLHttpRequest");
  }
}

export function sendBeacon(e: any) {
  "object" == typeof e && (e = serialize(e));
  e = `${Config.reportUrl}?${e}`;
  window && window.navigator && "function" == typeof window.navigator.sendBeacon
    ? window.navigator.sendBeacon(e)
    : warn("[arms] navigator.sendBeacon not surported");
}
