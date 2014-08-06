(function(e, t) {
  function i(e) {
    return function(t) {
      return Object.prototype.toString.call(t) === "[object " + e + "]";
    };
  }

  function l() {
    return f++;
  }

  function m(e) {
    return e.match(p)[0];
  }

  function g(e) {
    e = e.replace(d, "/");
    while (e.match(v)) e = e.replace(v, "/");
    return e;
  }

  function y(e) {
    var t = e.length - 1;
    return e.charAt(t) === "#" ? e.substring(0, t) : e.substring(t - 2) === ".js" || e.indexOf("?") > 0 || e.substring(t - 3) === ".css" ? e : e + ".js";
  }

  function E(e) {
    var t = r.alias;
    return t && o(t[e]) ? t[e] : e;
  }

  function S(e) {
    var t = r.paths,
      n;
    return t && (n = e.match(b)) && o(t[n[1]]) && (e = t[n[1]] + n[2]), e;
  }

  function x(e) {
    var t = r.vars;
    return t && e.indexOf("{") > -1 && (e = e.replace(w, function(e, n) {
      return o(t[n]) ? t[n] : e;
    })), e;
  }

  function T(e) {
    var t = r.map,
      n = e;
    if (t)
      for (var i = 0, s = t.length; i < s; i++) {
        var o = t[i];
        n = a(o) ? o(e) || e : e.replace(o[0], o[1]);
        if (n !== e) break;
      }
    return n;
  }

  function k(e, t) {
    var n, i = e.charAt(0);
    if (N.test(e)) n = e;
    else if (i === ".") n = g((t ? m(t) : r.cwd) + e);
    else if (i === "/") {
      var s = r.cwd.match(C);
      n = s ? s[0] + e.substring(1) : e;
    } else n = r.base + e;
    return n;
  }

  function L(e, t) {
    if (!e) return "";
    e = E(e), e = S(e), e = x(e), e = y(e);
    var n = k(e, t);
    return n = T(n), n;
  }

  function H(e) {
    return e.hasAttribute ? e.src : e.getAttribute("src", 4);
  }

  function z(e, t, n) {
    var r = F.test(e),
      i = A.createElement(r ? "link" : "script");
    if (n) {
      var s = a(n) ? n(e) : n;
      s && (i.charset = s);
    }
    W(i, t, r), r ? (i.rel = "stylesheet", i.href = e) : (i.async = !0, i.src = e), q = i, j ? B.insertBefore(i, j) : B.appendChild(i), q = null;
  }

  function W(e, t, n) {
    var i = n && (U || !("onload" in e));
    if (i) {
      setTimeout(function() {
        X(e, t);
      }, 1);
      return;
    }
    e.onload = e.onerror = e.onreadystatechange = function() {
      I.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, !n && !r.debug && B.removeChild(e), e = null, t());
    };
  }

  function X(e, t) {
    var n = e.sheet,
      r;
    if (U) n && (r = !0);
    else if (n) try {
      n.cssRules && (r = !0);
    } catch (i) {
      i.name === "NS_ERROR_DOM_SECURITY_ERR" && (r = !0);
    }
    setTimeout(function() {
      r ? t() : X(e, t);
    }, 20);
  }

  function V() {
    if (q) return q;
    if (R && R.readyState === "interactive") return R;
    var e = B.getElementsByTagName("script");
    for (var t = e.length - 1; t >= 0; t--) {
      var n = e[t];
      if (n.readyState === "interactive") return R = n, R;
    }
  }

  function K(e) {
    var t = [];
    return e.replace(J, "").replace($, function(e, n, r) {
      r && t.push(r);
    }), t;
  }

  function nt(e, t) {
    this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0;
  }

  function rt(e, t) {
    var n = {
      id: e,
      refUri: t
    };
    return h("resolve", n), n.uri || L(n.id, t);
  }

  function it(e, t) {
    var n = nt.get(e);
    n.status < tt.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = tt.SAVED);
  }
  if (e.seajs) return;
  var n = e.seajs = {
      version: "2.1.0"
    },
    r = n.data = {},
    s = i("Object"),
    o = i("String"),
    u = Array.isArray || i("Array"),
    a = i("Function"),
    f = 0,
    c = r.events = {};
  n.on = function(e, t) {
    var r = c[e] || (c[e] = []);
    return r.push(t), n;
  }, n.off = function(e, t) {
    if (!e && !t) return c = r.events = {}, n;
    var i = c[e];
    if (i)
      if (t)
        for (var s = i.length - 1; s >= 0; s--) i[s] === t && i.splice(s, 1);
      else delete c[e];
    return n;
  };
  var h = n.emit = function(e, t) {
      var r = c[e],
        i;
      if (r) {
        r = r.slice();
        while (i = r.shift()) i(t);
      }
      return n;
    },
    p = /[^?#]*\//,
    d = /\/\.\//g,
    v = /\/[^/]+\/\.\.\//,
    b = /^([^/:]+)(\/.+)$/,
    w = /{([^{]+)}/g,
    N = /^\/\/.|:\//,
    C = /^.*?\/\/.*?\//,
    A = document,
    O = location,
    M = m(O.href),
    _ = A.getElementsByTagName("script"),
    D = A.getElementById("seajsnode") || _[_.length - 1],
    P = m(H(D) || M),
    B = A.getElementsByTagName("head")[0] || A.documentElement,
    j = B.getElementsByTagName("base")[0],
    F = /\.css(?:\?|$)/i,
    I = /^(?:loaded|complete|undefined)$/,
    q, R, U = navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") * 1 < 536,
    $ = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
    J = /\\\\/g,
    Q = n.cache = {},
    G, Y = {},
    Z = {},
    et = {},
    tt = nt.STATUS = {
      FETCHING: 1,
      SAVED: 2,
      LOADING: 3,
      LOADED: 4,
      EXECUTING: 5,
      EXECUTED: 6
    };
  nt.prototype.resolve = function() {
    var e = this,
      t = e.dependencies,
      n = [];
    for (var r = 0, i = t.length; r < i; r++) n[r] = rt(t[r], e.uri);
    return n;
  }, nt.prototype.load = function() {
    var e = this;
    if (e.status >= tt.LOADING) return;
    e.status = tt.LOADING;
    var t = e.resolve();
    h("load", t);
    var n = e._remain = t.length,
      r;
    for (var i = 0; i < n; i++) r = nt.get(t[i]), r.status < tt.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
    if (e._remain === 0) {
      e.onload();
      return;
    }
    var s = {};
    for (i = 0; i < n; i++) r = Q[t[i]], r.status < tt.FETCHING ? r.fetch(s) : r.status === tt.SAVED && r.load();
    for (var o in s) s.hasOwnProperty(o) && s[o]();
  }, nt.prototype.onload = function() {
    var e = this;
    e.status = tt.LOADED, e.callback && e.callback();
    var t = e._waitings,
      n, r;
    for (n in t) t.hasOwnProperty(n) && (r = Q[n], r._remain -= t[n], r._remain === 0 && r.onload());
    delete e._waitings, delete e._remain;
  }, nt.prototype.fetch = function(e) {
    function o() {
      z(i.requestUri, i.onRequest, i.charset);
    }

    function u() {
      delete Y[s], Z[s] = !0, G && (it(n, G), G = null);
      var e, t = et[s];
      delete et[s];
      while (e = t.shift()) e.load();
    }
    var t = this,
      n = t.uri;
    t.status = tt.FETCHING;
    var i = {
      uri: n
    };
    h("fetch", i);
    var s = i.requestUri || n;
    if (!s || Z[s]) {
      t.load();
      return;
    }
    if (Y[s]) {
      et[s].push(t);
      return;
    }
    Y[s] = !0, et[s] = [t], h("request", i = {
      uri: n,
      requestUri: s,
      onRequest: u,
      charset: r.charset
    }), i.requested || (e ? e[i.requestUri] = o : o());
  }, nt.prototype.exec = function() {
    function r(e) {
      return Q[r.resolve(e)].exec();
    }
    var e = this;
    if (e.status >= tt.EXECUTING) return e.exports;
    e.status = tt.EXECUTING;
    var n = e.uri;
    r.resolve = function(e) {
      return rt(e, n);
    }, r.async = function(e, t) {
      return nt.use(e, t, n + "_async_" + l()), r;
    };
    var i = e.factory,
      s = a(i) ? i(r, e.exports = {}, e) : i;
    return s === t && (s = e.exports), s === null && !F.test(n) && h("error", e), delete e.factory, e.exports = s, e.status = tt.EXECUTED, h("exec", e), s;
  }, nt.define = function(e, n, r) {
    var i = arguments.length;
    i === 1 ? (r = e, e = t) : i === 2 && (r = n, u(e) ? (n = e, e = t) : n = t), !u(n) && a(r) && (n = K(r.toString()));
    var s = {
      id: e,
      uri: rt(e),
      deps: n,
      factory: r
    };
    if (!s.uri && A.attachEvent) {
      var o = V();
      o && (s.uri = o.src);
    }
    h("define", s), s.uri ? it(s.uri, s) : G = s;
  }, nt.get = function(e, t) {
    return Q[e] || (Q[e] = new nt(e, t));
  }, nt.use = function(t, n, r) {
    var i = nt.get(r, u(t) ? t : [t]);
    i.callback = function() {
      var t = [],
        r = i.resolve();
      for (var s = 0, o = r.length; s < o; s++) t[s] = Q[r[s]].exec();
      n && n.apply(e, t), delete i.callback;
    }, i.load();
  }, nt.preload = function(e) {
    var t = r.preload,
      n = t.length;
    n ? nt.use(t, function() {
      t.splice(0, n), nt.preload(e);
    }, r.cwd + "_preload_" + l()) : e();
  }, n.use = function(e, t) {
    return nt.preload(function() {
      nt.use(e, t, r.cwd + "_use_" + l());
    }), n;
  }, nt.define.cmd = {}, e.define = nt.define, n.Module = nt, r.fetchedList = Z, r.cid = l, n.resolve = L, n.require = function(e) {
    return (Q[rt(e)] || {}).exports;
  };
  var st = /^(.+?\/)(\?\?)?(seajs\/)+/;
  r.base = (P.match(st) || ["", P])[1], r.dir = P, r.cwd = M, r.charset = "utf-8", r.preload = function() {
    var e = [],
      t = O.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
    return t += " " + A.cookie, t.replace(/(seajs-\w+)=1/g, function(t, n) {
      e.push(n);
    }), e;
  }(), n.config = function(e) {
    for (var t in e) {
      var i = e[t],
        o = r[t];
      if (o && s(o))
        for (var a in i) o[a] = i[a];
      else u(o) ? i = o.concat(i) : t === "base" && (i.slice(-1) === "/" || (i += "/"), i = k(i)), r[t] = i;
    }
    return h("config", e), n;
  };
})(this);;
define("lib/jsonParser.js", [], function(require, exports, module) {
  "use strict";

  function JsonParser(e) {
    e || (e = _defaultOptions);
    for (var t in _defaultOptions) _defaultOptions.hasOwnProperty(t) && (this[t] = e[t] !== undefined ? e[t] : _defaultOptions[t]);
    this.setTab(this.tabSize);
  }

  function _isArray(e) {
    return e && typeof e == "object" && typeof e.length == "number" && !e.propertyIsEnumerable("length");
  }

  function _multiplyString(e, t) {
    var n;
    n = [];
    for (var r = 0; r < e; r++) n.push(t);
    return n.join("");
  }

  function _getRow(e, t, n, r) {
    var i;
    i = "";
    for (var s = 0; s < e && !r; s++) i += t;
    return n != null && n.length > 0 && n.charAt(n.length - 1) != "\n" && (n += "\n"), i + n;
  }

  function _processObject(e, t, n, r, i, s, o) {
    var u, a, f, l, c, h;
    a = r ? "<span class='Comma'>,</span> " : "", f = typeof e, l = "", u = "";
    if (_isArray(e))
      if (e.length == 0) u += _getRow(t, n, "<span class='ArrayBrace'>[ ]</span>" + a, o);
      else {
        u += _getRow(t, n, "<span class='ArrayBrace'>[</span>", o);
        for (var p = 0, d = e.length; p < d; p++) u += _processObject(e[p], t + 1, n, p < d - 1, i, !0, !1);
        u += _getRow(t, n, "<span class='ArrayBrace'>]</span>" + a);
      } else if (f == "object")
      if (e == null) u += _formatLiteral("null", n, "", a, t, s, "Null");
      else if (e.constructor == _dateObj.constructor) u += _formatLiteral("new Date(" + e.getTime() + ") ", n, "", a, t, s, "Date");
    else if (e.constructor == _regexpObj.constructor) u += _formatLiteral("new RegExp(" + e + ")", n, "", a, t, s, "RegExp");
    else {
      c = 0;
      for (var v in e) c++;
      if (c == 0) u += _getRow(t, n, "<span class='ObjectBrace'>{ }</span>" + a, o);
      else {
        u += _getRow(t, n, "<span class='ObjectBrace'>{</span>", o), h = 0;
        for (var v in e) u += _getRow(t + 1, n, "<span class='PropertyName'>" + i + v + i + "</span>: " + _processObject(e[v], t + 1, n, ++h < c, i, !1, !0));
        u += _getRow(t, n, "<span class='ObjectBrace'>}</span>" + a);
      }
    } else f == "number" ? u += _formatLiteral(e, n, "", a, t, s, "Number") : f == "boolean" ? u += _formatLiteral(e, n, "", a, t, s, "Boolean") : f == "function" ? e.constructor == _regexpObj.constructor ? u += _formatLiteral("new RegExp(" + e + ")", n, "", a, t, s, "RegExp") : (e = _formatFunction(t, n, e), u += _formatLiteral(e, n, "", a, t, s, "Function")) : f == "undefined" ? u += _formatLiteral("undefined", n, "", a, t, s, "Null") : u += _formatLiteral(e.toString().split("\\").join("\\\\").split('"').join('\\"'), n, '"', a, t, s, "String");
    return u;
  }

  function _formatLiteral(e, t, n, r, i, s, o) {
    var u;
    return typeof e == "string" && (e = e.split("<").join("&lt;").split(">").join("&gt;")), u = "<span class='" + o + "'>" + n + e + n + r + "</span>", s && (u = _getRow(i, t, u)), u;
  }

  function _formatFunction(e, t, n) {
    var r, i, s;
    i = "";
    for (var o = 0; o < e; o++) i += t;
    s = "", r = n.toString().split("\n");
    for (var o = 0; o < r.length; o++) s += (o == 0 ? "" : i) + r[o] + "\n";
    return s;
  }
  var SINGLE_TAB, _dateObj, _regexpObj, _defaultOptions;
  return SINGLE_TAB = "  ", _dateObj = new Date, _regexpObj = new RegExp, _defaultOptions = {
    tabSize: 2,
    QuoteKeys: !1
  }, JsonParser.prototype.setTab = function(e) {
    this.TAB = _multiplyString(e, SINGLE_TAB);
  }, JsonParser.prototype.parseAndCheck = function(jsonStr) {
    var obj;
    try {
      obj = eval("[" + jsonStr + "]");
    } catch (e) {
      return alert("JSON数据格式不正确:\n" + e.message), console.log("JSON数据格式不正确:\n" + e.message), !1;
    }
    return obj[0];
  }, JsonParser.prototype.filter = function(e) {
    var t, e, n, r, i, s, o;
    return t = this.parseAndCheck(e), t == 0 ? !1 : (o = new RegExp("<[^>]+>", "g"), n = this.QuoteKeys ? '"' : "", r = _processObject(t, 0, this.TAB, !1, n, !1, !1), r = $.trim(r), e = r.replace(o, ""), e);
  }, JsonParser.prototype.process = function(e) {
    var t, n, r;
    return n = "", e == "" ? (e = '""', n) : (t = this.parseAndCheck(e), t == 0 ? !1 : (r = this.QuoteKeys ? '"' : "", n = _processObject(t, 0, this.TAB, !1, r, !1, !1), n = "<PRE class='CodeContainer'>" + n + "</PRE>", n));
  }, exports = JsonParser;
});;
define("lib/xmlParser.js", [], function(e, t, n) {
  "use strict";

  function s() {
    this.parse = i;
  }
  var r = function(e) {
      var t = "    ",
        n = [];
      for (var r = 0; r < e; ++r) n.push(t);
      return n.join("");
    },
    i = function(e) {
      e = "\n" + e.replace(/(<\w+)(\s.*?>)/g, function(e, t, n) {
        return t + " " + n.replace(/\s+(\w+=)/g, " $1");
      }).replace(/>\s*?</g, ">\n<"), e = e.replace(/\n/g, "\r").replace(/<!--(.+?)-->/g, function(e, t) {
        var n = "<!--" + escape(t) + "-->";
        return n;
      }).replace(/\r/g, "\n");
      var t = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg,
        n = [],
        i = e.replace(t, function(e, t, i, s, o, u, a, f) {
          var l = o == "/" || u == "/" || a == "/" || f == "/",
            c = "";
          s == "!" ? c = r(n.length) : s != "/" ? (c = r(n.length), l || n.push(i)) : (n.pop(), c = r(n.length));
          var h = "\n" + c + t;
          return h;
        }),
        s = -1,
        o = i.substring(1);
      return o = o.replace(/\n/g, "\r").replace(/(\s*)<!--(.+?)-->/g, function(e, t, n) {
        t.charAt(0) == "\r" && (t = t.substring(1)), n = unescape(n).replace(/\r/g, "\n");
        var r = "\n" + t + "<!--" + n.replace(/^\s*/mg, t) + "-->";
        return r;
      }), o.replace(/\s+$/g, "").replace(/\r/g, "\r\n");
    };
  return t = s;
});;
/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/
typeof JSON != "object" && (JSON = {}),
function() {
  "use strict";

  function f(e) {
    return e < 10 ? "0" + e : e;
  }

  function quote(e) {
    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
      var t = meta[e];
      return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + e + '"';
  }

  function str(e, t) {
    var n, r, i, s, o = gap,
      u, a = t[e];
    a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
    switch (typeof a) {
      case "string":
        return quote(a);
      case "number":
        return isFinite(a) ? String(a) : "null";
      case "boolean":
      case "null":
        return String(a);
      case "object":
        if (!a) return "null";
        gap += indent, u = [];
        if (Object.prototype.toString.apply(a) === "[object Array]") {
          s = a.length;
          for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
          return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
        }
        if (rep && typeof rep == "object") {
          s = rep.length;
          for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
        } else
          for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
        return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;
    }
  }
  typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
    return this.valueOf();
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    },
    rep;
  typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
    var r;
    gap = "", indent = "";
    if (typeof n == "number")
      for (r = 0; r < n; r += 1) indent += " ";
    else typeof n == "string" && (indent = n);
    rep = t;
    if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
      "": e
    });
    throw new Error("JSON.stringify");
  }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
    function walk(e, t) {
      var n, r, i = e[t];
      if (i && typeof i == "object")
        for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
      return reviver.call(e, t, i);
    }
    var j;
    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
      return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
    }));
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
      "": j
    }, "") : j;
    throw new SyntaxError("JSON.parse");
  });
}();;
define("common/eventCenter.js", [], function(e, t, n) {
  "use strict";
  var r = {
    eventList: [],
    bind: function(e, t, n, r, i, s) {
      var o, u;
      this.eventList[e] || (this.eventList[e] = []), u = {
        handler: t,
        name: r,
        context: n,
        once: !!s
      }, o = this.eventList[e];
      if (!!i)
        for (var a = 0, f = o.length; a < f; a++)
          if (o[a].handler === t) return;
      o.push(u);
    },
    once: function(e, t, n, r) {
      this.bind(e, t, n, r, !1, !0);
    },
    bindOnce: function(e, t, n, r) {
      this.bind(e, t, n, r, !0);
    },
    trigger: function(e) {
      var t, n, r, i, s, o, u;
      this.eventList[e] || (this.eventList[e] = []), i = [], t = this.eventList[e];
      for (var a = 0; a < t.length; a++) return u = t[a], r = Array.prototype.slice.call(arguments, 1), o = u.name, s = u.context, n = u.handler.apply(s, r), o ? i[o] = n : i.push(n), u.isOnce === !0 && (t.splice(a, 1), a--), n === !1 ? !1 : i;
    },
    unbind: function(e, t) {
      if (!this.eventList) throw new Error("The eventList was undefined");
      if (!this.eventList[e]) throw new Error("The event type " + e + " was not found");
      if (t === undefined) this.eventList[e] = [];
      else {
        var n = this.eventList[e],
          r = n.length;
        for (var i = 0; i < r; i++)
          if (n[i].handler === t) {
            n.splice(i, 1);
            break;
          }
      }
    }
  };
  return t = r;
});;
define("common/viewer.js", ["formValidator.js", "common/eventCenter.js"], function(e, t, n) {
  "use strict";

  function A() {
    this.elemTemplate = f, this.formTemplate = l, this.argsTemplate = c, this.textareaTemplate = h, this.formOptionTemplate = p, this.typeOptionTemplate = d, b(), this.subscribeEvents();
  }
  var r = $("#content"),
    i = $("#methodType"),
    s = $("#typeSelector"),
    o = $("#formSelector"),
    u = $("#formContainer"),
    a = $("#formSelectorDiv"),
    f = _.template($("#elem-template").html()),
    l = _.template($("#form-template").html()),
    c = _.template($("#args-template").html()),
    h = _.template($("#textarea-template").html()),
    p = _.template($("#form-option-template").html()),
    d = _.template($("#type-option-template").html()),
    v = e("formValidator.js"),
    m = e("common/eventCenter.js"),
    g = new v,
    y = function(e, t) {
      var n = "";
      return t.method === "GET" ? n += 'reserved-name="' + t.name + '"' : n += 'name="' + t.name + '"', n += ' method="' + t.method + '"', n += ' data-type="' + t.type + '"', t.required && (n += " required=" + t.required + " "), (e === "string" || e === "number" || e === "url" || e === "email") && t.diabled !== "" && (n += ' value="' + t.diabled + '"', n += ' disabled="true"', n += ' readonly="true"'), t.sync && (n += ' sync="true"'), n;
    },
    b = function() {
      $(document).on("change", "#typeSelector", function(e) {
        m.trigger("App::selectType", e.target.value);
      }), $(document).on("change", "#formSelector", function(e) {
        m.trigger("FormFactory::selectForm", e.target.value);
      }), $(document).on("blur", "#formContent input[type='text']", function(e) {
        var t, n, r, i;
        return $(this).attr("readonly") ? !0 : (g.validate($(this), !0), r = $(this).parent().parent(), i = r.find("#submit"), g.validateForm(r, !1) ? i.removeClass("unsubmit").addClass("submit") : i.removeClass("submit").addClass("unsubmit"), !0);
      }), $(document).on("change", "#formContent input[type='file']", function(e) {
        var t, n, r, i;
        g.validate($(this), !0), r = $(this).parent().parent(), i = r.find("#submit"), g.validateForm(r, !1) ? i.removeClass("unsubmit").addClass("submit") : i.removeClass("submit").addClass("unsubmit");
      }), $(document).on("change", "#formContent select", function(e) {
        var t, n;
        t = $(this).parent().parent(), n = t.find("input[type='file']"), n.after(n.clone().val("")), n.remove();
      }), $(document).on("click", "#submit", function(e) {
        var t, n;
        return t = e.target, n = m.trigger("FormFactory::submit", t), n.submit || n;
      });
    },
    w = function(e) {
      return u.html(e), e = u.find("form :eq(0)"), e;
    },
    E = function(e) {
      i.html("方法：" + e);
    },
    S = function(e) {
      var t, n;
      t = d({
        forms: e
      }), n = $.trim(s.html()), n || s.html(t);
    },
    x = function(e) {
      $("#typeSelector").get(0).selectedIndex = e;
    },
    T = function(e) {
      var t;
      t = p({
        forms: e
      }), o.html(t), m.trigger("FormFactory::selectForm", o.val());
    },
    N = function(e) {
      $("#formSelector").val(e);
    },
    C = function(e) {
      var t, n, r, i, s, o, u, a, p;
      a = !1;
      if (e.type === "args" && (u = e.args)) {
        for (var d = 0; d < u.length; d++) t = u[d], n = t.diabled.split(","), r = y(t.type, t), i = f({
          type: t.type,
          attrString: r,
          typesArray: n
        }), i = $.trim(i), t.inputElem = i, t.type === "file" && (a = !0);
        s = c({
          args: u
        });
      } else s = h();
      return o = l({
        form: e,
        formContent: s
      }), p = $("<div></div>"), p.html(o), o = p.children().eq(0), a === !0 && o.attr("enctype", "multipart/form-data"), o;
    },
    k = function(e, t) {
      var n;
      n = "#formContainer  *[" + e + "='" + t + "']", $(document).on("keyup", n, function(n) {
        var r, i;
        r = $(n.target), r.attr("sync") && ($.cache.sync[t] = n.target.value, m.trigger("FormFactory::setValueByName", e, t, n.target.value));
      });
    },
    L = function() {
      var e, t;
      return t = [], e = $("#formContainer").find("form"), e.children().each(function(e, n) {
        var r, i;
        r = {}, n = $(n), i = n.find("input");
        if (i.length === 0 || i.attr("type") === "submit") return !0;
        i.attr("method") === "GET" ? r.name = i.attr("reserved-name") : r.name = i.attr("name");
        if (r.name === "url") return !0;
        r.value = i.val(), r.type = i.attr("data-type"), t.push(r);
      }), t;
    };
  return A.prototype.subscribeEvents = function() {
    m.bind("Viewer::showForm", w, this, "showForm"), m.bind("Viewer::createForm", C, this, "createForm"), m.bind("Viewer::setFormSelector", T, this), m.bind("Viewer::setTypeSelector", S, this), m.bind("Viewer::showMethodOfForm", E, this), m.bind("Viewer::syncValueByName", k, this), m.bind("Viewer::getFormConfigs", L, this, "formConfigs"), m.bind("Viewer::changeTypeSelector", x, this), m.bind("Viewer::changeFormSelector", N, this);
  }, t = A;
});;
define("packages/formFactory/apiinfoFormFactory.js", ["lib/jsonParser.js", "formValidator.js", "packages/formFactory/formFactory.js", "packages/formFactory/formRegister.js"], function(e, t, n) {
  "use strict";

  function c() {}

  function h(e, t) {
    this.init(e, t);
  }
  var r = e("lib/jsonParser.js"),
    i = e("formValidator.js"),
    s = e("packages/formFactory/formFactory.js"),
    o = e("packages/formFactory/formRegister.js"),
    u = new i,
    a = new r({
      QuoteKeys: !0
    }),
    f = function(e, t, n) {
      var r;
      return t.find(n).each(function(t, n) {
        var r, i, s;
        n = $(n), s = n.attr("method"), s === "GET" && (r = n.attr("reserved-name"), i = n.val(), n[0].removeAttribute("name"), e === "" ? e = r + "=" + i : e = e + "&" + r + "=" + i);
      }), e;
    },
    l = function(e, t) {
      var n, r, i, s, o;
      r = e.configs[e.currentFormIndex], n = r.args;
      for (var u = 0, f = n.length; u < f; u++) {
        i = n[u];
        if (i.parse_type === "json") {
          i.method.toLowerCase() === "post" ? o = t.find("*[name=" + i.name + "]") : o = t.find("*[reserved-name=" + i.name + "]"), s = a.filter(o.val());
          if (s === !1) return !1;
          o.val(s);
        }
      }
      return !0;
    };
  return c.prototype = s.prototype, h.prototype = new c, h.prototype.parent_init = s.prototype.init, h.prototype.init = function(e, t) {
    this.parent_init(e, t);
  }, h.prototype.submit = function(e) {
    var t, n, r, i, s, o, a, c, h, p, d, v, m, g, y;
    return m = "", i = "http://127.0.0.1:18080/apiagent", t = $(e).parent(), v = t.attr("action-target") + "?", g = t.attr("form-method"), c = l(this, t), c ? (this.checkResult = u.validateForm(t, !0), this.checkResult === !1 ? (a = t.find("#submit"), a.removeClass("submit").addClass("unsubmit"), !1) : (t.attr("form-type") === "args" ? (m = f(m, t, "input"), m = f(m, t, "select"), v += m, i = i + "?url=" + encodeURIComponent(v) + "&method=" + g + "&body=0") : (v = t.find('input[name="URL"]').val(), i = i + "?url=" + v + "&body=1"), t[0].setAttribute("action", i), t.trigger("submit"), !0)) : !1;
  }, o.register("ApiinfoFormFactory", h), t = h;
});;
define("packages/formFactory/rawinfoFormFactory.js", ["formValidator.js", "packages/formFactory/formFactory.js", "packages/formFactory/formRegister.js"], function(e, t, n) {
  "use strict";

  function u() {}

  function a(e, t) {
    this.init(e, t);
  }
  var r = e("formValidator.js"),
    i = e("packages/formFactory/formFactory.js"),
    s = e("packages/formFactory/formRegister.js"),
    o = new r;
  return u.prototype = i.prototype, a.prototype = new u, a.prototype.parent_init = i.prototype.init, a.prototype.init = function(e, t) {
    this.parent_init(e, t);
  }, a.prototype.submit = function(e) {
    var t, n, r;
    return n = $(e).parent(), body = n.find("input[name='body']").val(), t = n.find("input[reserved-name='URL']").val(), this.checkResult = o.validateForm(n, !0), this.checkResult === !1 ? (button = n.find("#submit"), button.removeClass("submit").addClass("unsubmit"), !1) : (r = "/debug/callbackagent?url=" + encodeURIComponent(t), n[0].setAttribute("action", r), !0);
  }, s.register("RawinfoFormFactory", a), t = a;
});;
define("packages/formFactory/callbackinfoFormFactory.js", ["formValidator.js", "common/eventCenter.js", "packages/formFactory/formFactory.js", "packages/formFactory/formRegister.js"], function(e, t, n) {
  "use strict";

  function f() {}

  function l(e, t) {
    this.init(e, t);
  }
  var r = e("formValidator.js"),
    i = e("common/eventCenter.js"),
    s = e("packages/formFactory/formFactory.js"),
    o = e("packages/formFactory/formRegister.js"),
    u = new r,
    a = function(e) {
      var t, n, r, s;
      r = i.trigger("Viewer::getFormConfigs"), n = r.formConfigs, s = "<xml>";
      for (var o = 0, u = n.length; o < u; o++) t = n[o], t.type === "string" ? s += "<" + t.name + ">" + "<![CDATA[" + t.value + "]]></" + t.name + ">" : s += "<" + t.name + ">" + t.value + "</" + t.name + ">";
      return s += "</xml>", s;
    };
  return f.prototype = s.prototype, l.prototype = new f, l.prototype.parent_init = s.prototype.init, l.prototype.init = function(e, t) {
    this.parent_init(e, t);
  }, l.prototype.parent_selectForm = s.prototype.selectForm, l.prototype.selectForm = function(e) {
    var t, n;
    this.parent_selectForm(e), t = $("#formContainer").find("form"), t.length !== 0 && t.find("#bodyInputContainer").length === 0 && (n = $('<input type="text" class="hide" name="body" id="bodyInputContainer"/>'), t.append(n));
  }, l.prototype.submit = function(e) {
    var t, n, r, i, s, o;
    return n = $(e).parent(), o = n.find("input[name='body']").val(), t = n.find("input[reserved-name='URL']").val(), r = "http://127.0.0.1:18080/callbackagent?url=" + encodeURIComponent(t), n[0].setAttribute("action", r), i = a.call(this), n.find("#bodyInputContainer").val(i), !0;
  }, o.register("CallbackinfoFormFactory", l), t = l;
});;
define("packages/formFactory/formFactory.js", ["common/viewer.js", "common/eventCenter.js", "formValidator.js"], function(e, t, n) {
  "use strict";

  function T() {
    if (this.__proto__ && this.__proto__ === T.prototype) throw Error("Can't Instantiate from a absctract class 'FormFactory'");
    if (this.constructor === T) throw Error("Can't Instantiate from a absctract class 'FormFactory'");
  }
  var r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y = e("common/viewer.js"),
    b = e("common/eventCenter.js"),
    w = e("formValidator.js"),
    E = this,
    S = new y,
    x = new w;
  return T.prototype.submit = function() {}, T.prototype.setValueByName = function(e, t, n, r) {
    var i, s, o, u;
    s = this.formArray, o = $("#formContainer").find("form");
    for (var a = 0, f = s.length; a < f; a++)
      if (s[a] && s[a].length) {
        if (!r && s[a][0] === o[0]) continue;
        i = "[" + e + "='" + t + "']", u = s[a].find(i);
        if (!u.length || !u.attr("sync")) continue;
        u.val(n);
      }
  }, T.prototype.init = function(e, t) {
    var n, r, i;
    this.formArray = [], this.checkResult = !0, this.typeName = e, this.configs = t, this.currentFormIndex = 0, r = $("<div></div>");
    for (var s = 0, o = t.length; s < o; s++) i = b.trigger("Viewer::createForm", this.configs[s]), n = i.createForm, r.html(n), this.formArray[s] = r.children(":eq(0)");
  }, T.prototype.syncValues = function(e) {
    var t, n, r, i, s;
    if (!e.args) return;
    $.cache.sync || ($.cache.sync = {}), t = e.args;
    for (var o = 0, u = t.length; o < u; o++) {
      i = t[o], s = i.name, i.method.toUpperCase() === "GET" ? r = "reserved-name" : r = "name";
      if (!$.cache.sync[s]) $.cache.sync[s] = !0, b.trigger("Viewer::syncValueByName", r, s);
      else {
        if ($.cache.sync[s] === !0) continue;
        n = $.cache.sync[s], this.setValueByName(r, s, n, !0);
      }
    }
  }, T.prototype.selectForm = function(e) {
    var t, n;
    n = this.formArray;
    for (var r = 0, i = n.length; r < i; r++) n[r] && r !== e && n[r].remove();
    b.trigger("Viewer::showMethodOfForm", this.configs[e].method), n[e] || (t = b.trigger("Viewer::createForm", this.configs[e]), n[e] = t.createForm), t = b.trigger("Viewer::showForm", n[e]), n[e] = t.showForm, this.syncValues(this.configs[e]), this.currentFormIndex = e;
  }, T.prototype.off = function() {
    b.unbind("FormFactory::submit", this.submit), b.unbind("FormFactory::selectForm", this.selectForm), b.unbind("FormFactory::setValueByName", this.setValueByName);
  }, T.prototype.on = function() {
    b.bind("FormFactory::submit", this.submit, this, "submit"), b.bind("FormFactory::selectForm", this.selectForm, this, "selectForm"), b.bind("FormFactory::setValueByName", this.setValueByName, this, "setValueByName");
  }, t = T;
});;
define("packages/formFactory/formRegister.js", [], function(e, t, n) {
  "use strict";
  var r = {
    classContainer: [],
    register: function(e, t) {
      this.classContainer[e] = t;
    },
    getClass: function(e) {
      return this.classContainer[e];
    },
    removeClass: function(e) {
      this.classContainer[e] = undefined;
    }
  };
  return t = r;
});;
define("formValidator.js", [], function(e, t, n) {
  "use strict";
  var r = function() {
    var e, t, n, r;
    t = {}, n = {
      "0": "校验通过",
      "1": "该项不能为空",
      "2": "不合法的数字",
      "4": "电子邮件地址格式不正确，缺少@符号",
      "5": "电子邮件地址格式不正确，邮件服务器域名错误",
      "6": "声音文件格式不正确",
      "7": "图片文件格式不正确",
      "8": "视频文件格式不正确",
      "9": "缩略图文件格式不正确",
      "10": "url格式不正确",
      "11": "未知错误",
      "12": "参数中请勿带有空格"
    }, e = this, t.num = {}, t.num.validate = function(e) {
      var t;
      return t = $.trim(e.val()), e.attr("required") && t === "" ? 1 : t.split(" ").length > 1 ? 12 : isNaN(Number(t)) ? 2 : (e.val(t), 0);
    }, t.email = {}, t.email.validate = function(e) {
      var t, n;
      return t = $.trim(e.val()), e.attr("required") && t === "" ? 1 : t.split(" ").length > 1 ? 12 : (n = t.split("@"), n.length === 1 ? 4 : n[1].split(".").length === 1 ? 5 : (e.val(t), 0));
    }, t.url = {}, t.url.validate = function(e) {
      var t;
      return t = $.trim(e.val()), e.attr("required") && t === "" ? 1 : t.split(" ").length > 1 ? 12 : (e.val(t), 0);
    }, t.string = {}, t.string.validate = function(e) {
      var t;
      return t = $.trim(e.val()), e.attr("required") && t === "" ? 1 : t.split(" ").length > 1 ? 12 : (e.val(t), 0);
    }, r = {
      image: {
        jpg: !0,
        jpeg: !0
      },
      voice: {
        amr: !0
      },
      video: {
        mp4: !0
      },
      thumb: {
        jpg: !0,
        jpeg: !0
      }
    }, t.file = {}, t.file.validate = function(e) {
      var t, n, i;
      if (!e.attr("required") || e.val() !== "" && e.val() != null) return t = e.parent().parent().find("select").val(), t = t.toLowerCase(), n = e.val().split("."), i = n[n.length - 1], i = i.toLowerCase(), t === "image" && !r[t][i] ? 7 : t === "voice" && !r[t][i] ? 6 : t === "video" && !r[t][i] ? 8 : t === "thumb" && !r[t][i] ? 9 : 0;
      return 1;
    }, e.validate = function(e, r) {
      var i, s, o, u, a, f;
      f = !0, i = e.attr("data-type");
      if (!i || i === "selector" || e.attr("type") === "submit") return !0;
      s = i.split("&"), o = i.split("|");
      var l = function(n) {
        var r, i;
        for (var s = 0; s < n.length; s++) {
          i = t[n[s]];
          if (!i) return 8;
          r = i.validate(e);
          if (r !== 0) return r;
        }
      };
      return s.length === 1 && o.length === 1 ? u = t[i].validate(e) : s.length === 1 ? u = l(o) : o.length === 1 && (u = l(s)), r ? (a = n[u], u !== 0 ? (e.parent().find(".errMsg").html(a).removeClass("green").addClass("red"), f = !1) : e.parent().find(".errMsg").html(a).removeClass("red").addClass("green")) : u !== 0 && (f = !1), f;
    }, e.validateForm = function(e, t) {
      var n, r;
      return r = this, n = !0, e.find("input").each(function(e, i) {
        i = $(i), r.validate(i, t) === !1 && (n = !1);
      }), n;
    };
  };
  return t = r;
});;
define("resultHandler.js", ["resultViewer.js", "common/eventCenter.js"], function(e, t, n) {
  "use strict";
  var r = e("resultViewer.js"),
    i = e("common/eventCenter.js"),
    s = {
      resultList: [],
      addNewResult: function(e, t) {
        var n;
        this.foldAllResults(), n = r.showResult(e, t), this.resultList.push(n);
      },
      foldAllResults: function() {
        var e;
        e = this.resultList;
        for (var t = 0, n = e.length; t < n; t++) i.trigger("ResultViewer::foldResult", e[t]);
      },
      unfoldAllResults: function() {
        var e;
        e = this.resultList;
        for (var t = 0, n = e.length; t < n; t++) i.trigger("ResultViewer::unfoldResult", e[t]);
      },
      deleteResult: function(e) {
        var t, n;
        t = this.resultList;
        for (var r = 0, i = t.length; r < i; r++) e[0] === t[r][0] && (n = r, e.fadeOut(1e3, function() {
          e.remove();
        }));
        n !== undefined && t.splice(n, 1);
      },
      clearAllResults: function() {
        var e;
        e = this.resultList;
        for (var t = 0, n = e.length; t < n; t++) e[t].remove();
        e = [];
      },
      subscribeEvents: function() {
        i.bind("ResultHandler::deleteResult", this.deleteResult, this), i.bind("ResultHandler::clearAllResults", this.clearAllResults, this), i.bind("ResultHandler::foldAllResults", this.foldAllResults, this), i.bind("ResultHandler::unfoldAllResults", this.unfoldAllResults, this);
      },
      init: function() {
        this.subscribeEvents();
      }
    };
  return s.init(), t = s;
});;
define("resultViewer.js", ["lib/jsonParser.js", "lib/xmlParser.js", "common/eventCenter.js"], function(e, t, n) {
  "use strict";

  function S(e) {
    var t = document.createElement("div");
    t.innerHTML = e;
    var n = t.innerText || t.textContent;
    return t = null, n;
  }
  var r = e("lib/jsonParser.js"),
    i = e("lib/xmlParser.js"),
    s = e("common/eventCenter.js"),
    o = $(parent.document.body).find("#resultContainer"),
    u = _.template($(parent.document.body).find("#result-template").html()),
    a = function(e) {
      var t = document.createElement("div");
      return t.appendChild(document.createTextNode(e)), t.innerHTML;
    },
    f = new i,
    l = new r({
      QuoteKeys: !0
    }),
    c = function(e) {
      var t, n, r;
      n = $(e.target).parent(), t = n.parent(), r = t.find(".result"), r.toggleClass("hide");
    },
    h = function(e) {
      s.trigger("ResultHandler::foldAllResults");
    },
    p = function(e) {
      s.trigger("ResultHandler::unfoldAllResults");
    },
    d = function(e) {
      var t;
      t = $(e.target).parent().parent(), s.trigger("ResultHandler::deleteResult", t);
    },
    v = function(e) {
      s.trigger("ResultHandler::clearAllResults");
    },
    m = function(e) {
      var t;
      t = $(e.target), t.addClass("banner_hover");
    },
    g = function(e) {
      var t;
      t = $(e.target), t.removeClass("banner_hover");
    },
    y = function(e) {
      var t;
      t = $(e.target), t.addClass("banner_active");
    },
    b = function(e) {
      var t;
      t = $(e.target), t.removeClass("banner_active");
    },
    w = function(e, t) {
      var n;
      if (!e.media || e.media.type !== "image") return t(-1, -1), !1;
      n = new Image, n.src = e.media.url, n.complete ? t(n.width, n.height, e.media.url) : n.onload = function() {
        t(n.width, n.height, e.media.url);
      };
    },
    E = function(e, t, n, r) {
      var i, s, o;
      return t <= 0 || n <= 0 ? e : (o = e.find(".body").find("code"), t >= 700 && (s = t / n, t = 500, n = t / s), i = $('<img src="' + r + '" width="' + t + '" height="' + n + '" />'), o.html(i), e);
    },
    x = {
      bindEvents: function() {
        $(document).on("click", ".bannerDiv .banner", c), $(document).on("click", ".bannerDiv .closeButton", d), $(document).on("mouseenter", ".bannerDiv a", m), $(document).on("mouseleave", ".bannerDiv a", g), $(document).on("mousedown", ".bannerDiv a", y), $(document).on("mouseup", ".bannerDiv a", b);
      },
      showResult: function(e, t) {
        var n, r, i, s, a, c;
        return r = $(document.body).find("#typeSelector").find("option:selected").text(), i = $(document.body).find("#formSelector").find("option:selected").text(), e.media ? n = "<div style='margin-top:20px;'><img src='https://mp.weixin.qq.com/mpres/htmledition/images/icon/common/icon16_loading_light.gif' /><span>图片加载中...</span></div>" : t === "json" ? n = l.process(e.body) : (e.body = decodeURIComponent(e.body.replace(/\+/g, "%20")), n = "<xmp>" + f.parse(e.body) + "</xmp>"), c = u({
          request_url: decodeURIComponent(e.request_url),
          status_line: e.status_line,
          headers: e.header,
          body: n,
          hint: e.hint,
          formName: i,
          typeName: r
        }), a = $("<div></div>"), a.html(c), s = a.children(":eq(0)"), w(e, function(e, t, n) {
          s = E(s, e, t, n);
        }), o.prepend(s), s;
      },
      foldResult: function(e) {
        var t;
        t = e.find(".result"), t && t.addClass("hide");
      },
      unfoldResult: function(e) {
        var t;
        t = e.find(".result"), t && t.removeClass("hide");
      },
      subscribeEvents: function() {
        s.bind("ResultViewer::showResult", this.showResult, this, "showResult"), s.bind("ResultViewer::unfoldResult", this.unfoldResult, this), s.bind("ResultViewer::foldResult", this.foldResult, this);
      },
      init: function() {
        this.bindEvents(), this.subscribeEvents();
      }
    };
  return x.init(), t = x;
});;
define("app.js", ["resultViewer.js", "resultHandler.js", "common/eventCenter.js", "packages/formFactory/formFactory.js", "packages/formFactory/formRegister.js", "packages/formFactory/apiinfoFormFactory.js", "packages/formFactory/rawinfoFormFactory.js", "packages/formFactory/callbackinfoFormFactory.js"], function(e, t, n) {
  "use strict";
  var r = e("resultViewer.js"),
    i = e("resultHandler.js"),
    s = e("common/eventCenter.js"),
    o = e("packages/formFactory/formFactory.js"),
    u = e("packages/formFactory/formRegister.js"),
    a = e("packages/formFactory/apiinfoFormFactory.js"),
    f = e("packages/formFactory/rawinfoFormFactory.js"),
    l = e("packages/formFactory/callbackinfoFormFactory.js");
  window.ResultHandler = i;
  var c = ["_", "-"],
    h = function(e) {
      var t, e;
      e = e.toLowerCase();
      for (var n = 0, r = c.length; n < r; n++) e = e.replace(c[n], "");
      return e.substring(0, 1).toUpperCase() + e.substring(1) + "FormFactory";
    },
    p = {
      forms: [],
      currentForm: null,
      configs: null,
      init: function(e) {
        var t, n, r, i;
        this.configs = e;
        for (var o = 0, a = e.length; o < a; o++) t = e[o], r = t.show_name, i = h(t.class_name), n = u.getClass(i), n && (this.forms[o] = new n(r, t.content));
        $.cache.sync = {}, this.subscribeEvents(), s.trigger("Viewer::setTypeSelector", e), this.selectTypeAndFormByUrlParams(e);
      },
      selectTypeAndFormByUrlParams: function(e) {
        var t, n, r, i, o, u, a, f, l, c, h, p, d;
        n = document.createElement("a"), t = window.location.href, n.href = t, r = decodeURIComponent(n.search), r = r.slice(1), i = r.split("&");
        for (var v = 0, m = i.length; v < m; v++) o = i[v].split("="), a = o[0], f = o[1], a === "form" && (c = f), a === "type" && (l = f);
        for (var v = 0, m = e.length; v < m; v++) {
          u = e[v];
          if (l === u.show_name) {
            h = v, d = u.content;
            for (var g = 0, y = d.length; g < y; g++)
              if (c === d[g].show_name) {
                p = g;
                break;
              }
            break;
          }
        }
        h !== undefined && p !== undefined ? (this.selectType(h), s.trigger("Viewer::changeTypeSelector", h), s.trigger("Viewer::changeFormSelector", p), s.trigger("FormFactory::selectForm", p)) : (this.selectType(0), s.trigger("FormFactory::selectForm", 0));
      },
      selectType: function(e) {
        this.currentForm && this.currentForm.off(), this.currentForm = this.forms[e], this.currentForm.on(), s.trigger("Viewer::setFormSelector", this.configs[e].content);
      },
      subscribeEvents: function() {
        s.bind("App::selectType", this.selectType, this);
      }
    };
  return t = p;
});;