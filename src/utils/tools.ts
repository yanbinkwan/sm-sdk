export const on = function (event, fn, remove?) {
  window.addEventListener
    ? window.addEventListener(
        event,
        function a(i) {
          remove && window.removeEventListener(event, a, true),
            fn.call(this, i);
        },
        true
      )
    : window.attachEvent &&
      window.attachEvent("on" + event, function i(a) {
        remove && window.detachEvent("on" + event, i), fn.call(this, a);
      });
};

// 将{ method: 'get', state: '200' }转为?method=get&state=200
export function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const warn: any = (function () {
  var e = "object" == typeof console ? console.warn : noop;
  try {
    var t = {
      warn: e
    };
    t.warn.call(t);
  } catch (n) {
    return noop;
  }
  return e;
})();

export function randomString() {
  for (
    var e: number,
      t: string,
      n = 20,
      r = new Array(n),
      a = Date.now().toString(36).split("");
    n-- > 0;

  )
    (t = (e = (36 * Math.random()) | 0).toString(36)),
      (r[n] = e % 3 ? t : t.toUpperCase());
  for (var i = 0; i < 8; i++) r.splice(3 * i + 2, 0, a[i]);
  return r.join("");
}

export const noop = function () {};
