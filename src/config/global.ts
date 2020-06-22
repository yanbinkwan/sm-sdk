import { randomString } from "../utils/tools";

// default params
export let GlobalVal = {
  page: "", // current page
  sid: "", // session id, will be changed when page change
  sBegin: Date.now(), // the time of sid changed
  _health: {
    errcount: 0,
    apisucc: 0,
    apifail: 0
  },
  circle: false,
  cssInserted: false
};

export function setGlobalPage(page) {
  GlobalVal.page = page;
}

export function setGlobalSid() {
  GlobalVal.sid = randomString();
  GlobalVal.sBegin = Date.now();
}

export function setGlobalHealth(type: string, success?: boolean) {
  if (type === "error") GlobalVal._health.errcount++;
  if (type === "api" && success) GlobalVal._health.apisucc++;
  if (type === "api" && !success) GlobalVal._health.apifail++;
}

export function resetGlobalHealth() {
  GlobalVal._health = {
    errcount: 0,
    apisucc: 0,
    apifail: 0
  };
}
