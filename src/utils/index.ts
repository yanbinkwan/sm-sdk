import { Config } from "../config";
import { randomString } from "./tools";
import { GlobalVal } from "../config/global";

export function getCommonMsg() {
  let u = (navigator as any).connection;
  const data: CommonMsg = {
    t: "",
    page: getPage(),
    times: 1,
    v: Config.appVersion,
    token: Config.token,
    e: Config.environment,
    begin: new Date().getTime(),
    uid: getUid(),
    sid: GlobalVal.sid,
    sr: screen.width + "x" + screen.height,
    vp: getScreen(),
    ct: u ? u.effectiveType : "",
    ul: getLang(),
    _v: "{{VERSION}}",
    o: location.href
  };
  return data;
}

function getUid() {
  let uid = localStorage.getItem("sm_uid") || "";
  if (!uid) {
    uid = randomString();
    localStorage.setItem("sm_uid", uid);
  }
  return uid;
}

function getScreen() {
  let w = document.documentElement.clientWidth || document.body.clientWidth;
  let h = document.documentElement.clientHeight || document.body.clientHeight;
  return w + "x" + h;
}

function getPage(): string {
  if (GlobalVal.page) return GlobalVal.page;
  else {
    return location.pathname.toLowerCase();
  }
}

// get default lang of brower
function getLang() {
  var lang = navigator.language || (navigator as any).userLanguage;
  lang = lang.substr(0, 2);
  return lang;
}
