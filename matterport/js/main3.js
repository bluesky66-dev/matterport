
!function (e, t, n) {
    "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t[e] = n()
}("Keen", this, function () {
    "use strict";

    function Keen() {
        return _init.apply(this, arguments)
    }

    function _init(e) {
        if (_isUndefined(e)) throw new Error("Check out our JavaScript SDK Usage Guide: https://keen.io/docs/clients/javascript/usage-guide/");
        if (_isUndefined(e.projectId) || "String" !== _type(e.projectId) || e.projectId.length < 1) throw new Error("Please provide a projectId");
        this.configure(e)
    }

    function _extend(e) {
        for (var t = 1; t < arguments.length; t++) for (var n in arguments[t]) e[n] = arguments[t][n];
        return e
    }

    function _isUndefined(e) {
        return void 0 === e
    }

    function _type(e) {
        var t = e && e.constructor ? e.constructor.toString() : void 0;
        return t ? t.match(/function (.*)\(/)[1] : "Null"
    }

    function _each(e, t, n) {
        var r;
        if (!e) return 0;
        if (n = n ? n : e, "array" === _type(e)) {
            for (r = 0; r < e.length; r++) if (t.call(n, e[r], r, e) === !1) return 0
        } else for (r in e) if (e.hasOwnProperty(r) && t.call(n, e[r], r, e) === !1) return 0;
        return 1
    }

    function _parse_params(e) {
        for (var t, n = {}, r = /\+/g, i = /([^&=]+)=?([^&]*)/g, o = function (e) {
            return decodeURIComponent(e.replace(r, " "))
        }, a = e.split("?")[1]; t = i.exec(a);) n[o(t[1])] = o(t[2]);
        return n
    }

    function _set_protocol(e) {
        switch (e) {
            case"http":
                return "http";
            case"auto":
                return location.protocol.replace(/:/g, "");
            case"https":
            case void 0:
            default:
                return "https"
        }
    }

    function _set_request_type(e) {
        var t = e || "jsonp", n = !1;
        return ("Object" === _type(XMLHttpRequest) || "Function" === _type(XMLHttpRequest)) && "withCredentials" in new XMLHttpRequest && (n = !0), null == t || "xhr" == t ? n ? "xhr" : "jsonp" : t
    }

    function _build_url(e) {
        return this.client.endpoint + "/projects/" + this.client.projectId + e
    }

    function _uploadEvent(e, t, n, r, i) {
        var o = _build_url.apply(this, ["/events/" + e]), a = {};
        n = n !== !1, this.client.globalProperties && (a = this.client.globalProperties(e));
        for (var c in t) t.hasOwnProperty(c) && (a[c] = t[c]);
        switch (this.client.requestType) {
            case"xhr":
                _request.xhr.apply(this, ["POST", o, null, a, this.client.writeKey, n, r, i]);
                break;
            case"jsonp":
                var s = JSON.stringify(a), l = Keen.Base64.encode(s);
                o = o + "?api_key=" + this.client.writeKey, o = o + "&data=" + l, o = o + "&modified=" + (new Date).getTime(), _request.jsonp.apply(this, [o, this.client.writeKey, r, i]);
                break;
            case"beacon":
                var s = JSON.stringify(a), l = Keen.Base64.encode(s);
                o = o + "?api_key=" + encodeURIComponent(this.client.writeKey), o = o + "&data=" + encodeURIComponent(l), o = o + "&modified=" + encodeURIComponent((new Date).getTime()), o += "&c=clv1", _request.beacon.apply(this, [o, null, r, i])
        }
    }

    Keen.prototype.configure = function (e) {
        return e.host = _isUndefined(e.host) ? "api.keen.io/3.0" : e.host.replace(/.*?:\/\//g, ""), e.protocol = _set_protocol(e.protocol), e.requestType = _set_request_type(e.requestType), this.client = {
            projectId: e.projectId,
            writeKey: e.writeKey,
            readKey: e.readKey,
            globalProperties: null,
            endpoint: e.protocol + "://" + e.host,
            requestType: e.requestType
        }, Keen.trigger("client", this, e), this.trigger("ready"), this
    };
    var _request = {
        xhr: function (e, t, n, r, i, o, a, c) {
            if (!i) return Keen.log("Please provide a writeKey for https://keen.io/project/" + this.client.projectId);
            var s = new XMLHttpRequest;
            if (s.onreadystatechange = function () {
                    if (4 == s.readyState) if (s.status >= 200 && s.status < 300) {
                        var e;
                        try {
                            e = JSON.parse(s.responseText)
                        } catch (e) {
                            Keen.log("Could not JSON parse HTTP response: " + s.responseText), c && c(s, e)
                        }
                        a && e && a(e)
                    } else Keen.log("HTTP request failed."), c && c(s, null)
                }, s.open(e, t, o), i && s.setRequestHeader("Authorization", i), r && s.setRequestHeader("Content-Type", "application/json"), n) for (var l in n) n.hasOwnProperty(l) && s.setRequestHeader(l, n[l]);
            var u = r ? JSON.stringify(r) : null;
            s.send(u)
        }, jsonp: function (e, t, n, r) {
            if (!t) return Keen.log("Please provide a writeKey for https://keen.io/project/" + this.client.projectId);
            if (t && e.indexOf("api_key") < 0) {
                var i = e.indexOf("?") > 0 ? "&" : "?";
                e = e + i + "api_key=" + t
            }
            for (var o = "keenJSONPCallback" + (new Date).getTime(); o in window;) o += "a";
            var a = !1;
            window[o] = function (e) {
                a = !0, n && e && n(e), window[o] = void 0
            }, e = e + "&jsonp=" + o;
            var c = document.createElement("script");
            c.id = "keen-jsonp", c.src = e, document.getElementsByTagName("head")[0].appendChild(c), c.onreadystatechange = function () {
                a === !1 && "loaded" === this.readyState && (a = !0, r && r())
            }, c.onerror = function () {
                a === !1 && (a = !0, r && r())
            }
        }, beacon: function (e, t, n, r) {
            if (t && e.indexOf("api_key") < 0) {
                var i = e.indexOf("?") > 0 ? "&" : "?";
                e = e + i + "api_key=" + t
            }
            var o = !1, a = document.createElement("img");
            a.onload = function () {
                if (o = !0, "naturalHeight" in this) {
                    if (this.naturalHeight + this.naturalWidth === 0) return void this.onerror()
                } else if (this.width + this.height === 0) return void this.onerror();
                n && n({created: !0})
            }, a.onerror = function () {
                o = !0, r && r()
            }, a.src = e
        }
    }, Events = Keen.Events = {
        on: function (e, t) {
            this.listeners || (this.listeners = {});
            var n = this.listeners[e] || (this.listeners[e] = []);
            return n.push({callback: t}), this
        }, off: function (e, t) {
            if (!e && !t) return this.listeners = void 0, delete this.listeners, this;
            for (var n = this.listeners[e] || [], r = n.length; r--;) t && t == n[r].callback && this.listeners[e].splice(r, 1), t && 0 != n.length || (this.listeners[e] = void 0, delete this.listeners[e]);
            return this
        }, trigger: function (e) {
            if (!this.listeners) return this;
            for (var t = Array.prototype.slice.call(arguments, 1), n = this.listeners[e] || [], r = 0; r < n.length; r++) n[r].callback.apply(this, t);
            return this
        }
    };
    _extend(Keen.prototype, Events), _extend(Keen, Events), Keen.loaded = !0, Keen.utils = {
        each: _each,
        extend: _extend,
        parseParams: _parse_params
    }, Keen.ready = function (e) {
        Keen.loaded ? e() : Keen.on("ready", e)
    }, Keen.log = function (e) {
        "object" == typeof console && console.log("[Keen IO]", e)
    };
    var Plugins = Keen.Plugins = {};
    Keen.prototype.addEvent = function () {
        _uploadEvent.apply(this, arguments)
    }, Keen.prototype.addEventSync = function (e, t, n, r) {
        _uploadEvent.apply(this, [e, t, !1, n, r])
    }, Keen.prototype.trackExternalLink = function (e, t, n, r, i) {
        var o = e, a = o.metaKey, c = o.target, s = !1, l = function () {
        };
        return void 0 === r && (r = 500), "A" === c.nodeName ? l = function () {
            a || s || (s = !0, window.location = c.href)
        } : "FORM" === c.nodeName && (l = function () {
            s || (s = !0, c.submit())
        }), i && (l = function () {
            s || (s = !0, i())
        }), _uploadEvent.call(this, t, n, l, l), setTimeout(function () {
            l()
        }, r), !!a && void 0
    }, Keen.prototype.setGlobalProperties = function (e) {
        if (!this.client) return Keen.log("Check out our JavaScript SDK Usage Guide: https://keen.io/docs/clients/javascript/usage-guide/");
        if (!e || "function" != typeof e) throw new Error("Invalid value for global properties: " + e);
        this.client.globalProperties = e
    }, Keen.Base64 = {
        map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
            var t, n, r, i, o, a, c, s = "", l = 0, u = this.map;
            for (e = this.utf8.encode(e); l < e.length;) t = e.charCodeAt(l++), n = e.charCodeAt(l++), r = e.charCodeAt(l++), i = t >> 2, o = (3 & t) << 4 | n >> 4, a = isNaN(n) ? 64 : (15 & n) << 2 | r >> 6, c = isNaN(n) || isNaN(r) ? 64 : 63 & r, s = s + u.charAt(i) + u.charAt(o) + u.charAt(a) + u.charAt(c);
            return s
        }, decode: function (e) {
            var t, n, r, i, o, a, c, s = "", l = 0, u = this.map, f = String.fromCharCode;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < e.length;) t = u.indexOf(e.charAt(l++)), n = u.indexOf(e.charAt(l++)), r = u.indexOf(e.charAt(l++)), i = u.indexOf(e.charAt(l++)), o = t << 2 | n >> 4, a = (15 & n) << 4 | r >> 2, c = (3 & r) << 6 | i, s = s + (f(o) + (64 != r ? f(a) : "")) + (64 != i ? f(c) : "");
            return this.utf8.decode(s)
        }, utf8: {
            encode: function (e) {
                for (var t, n = "", r = 0, i = String.fromCharCode; r < e.length;) t = e.charCodeAt(r++), n += 128 > t ? i(t) : t > 127 && 2048 > t ? i(t >> 6 | 192) + i(63 & t | 128) : i(t >> 12 | 224) + i(t >> 6 & 63 | 128) + i(63 & t | 128);
                return n
            }, decode: function (e) {
                for (var t, n, r = "", i = 0, o = String.fromCharCode; i < e.length;) n = e.charCodeAt(i), r += 128 > n ? [o(n), i++][0] : n > 191 && 224 > n ? [o((31 & n) << 6 | 63 & (t = e.charCodeAt(i + 1))), i += 2][0] : [o((15 & n) << 12 | (63 & (t = e.charCodeAt(i + 1))) << 6 | 63 & (c3 = e.charCodeAt(i + 2))), i += 3][0];
                return r
            }
        }
    }, "object" != typeof JSON && (JSON = {}), function () {
        function f(e) {
            return 10 > e ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, o, a, c = gap, s = t[e];
            switch (s && "object" == typeof s && "function" == typeof s.toJSON && (s = s.toJSON(e)), "function" == typeof rep && (s = rep.call(t, e, s)), typeof s) {
                case"string":
                    return quote(s);
                case"number":
                    return isFinite(s) ? String(s) : "null";
                case"boolean":
                case"null":
                    return String(s);
                case"object":
                    if (!s) return "null";
                    if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(s)) {
                        for (o = s.length, n = 0; o > n; n += 1) a[n] = str(n, s) || "null";
                        return i = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + c + "]" : "[" + a.join(",") + "]", gap = c, i
                    }
                    if (rep && "object" == typeof rep) for (o = rep.length, n = 0; o > n; n += 1) "string" == typeof rep[n] && (r = rep[n], i = str(r, s), i && a.push(quote(r) + (gap ? ": " : ":") + i)); else for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (i = str(r, s), i && a.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + c + "}" : "{" + a.join(",") + "}", gap = c, i
            }
        }

        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent,
            meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function (e, t, n) {
            var r;
            if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " "; else "string" == typeof n && (indent = n);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {"": e})
        }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && "object" == typeof i) for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), void 0 !== r ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }

            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), !function (e, t, n) {
        "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t[e] = n()
    }("domready", Keen.utils, function (e) {
        function t(e) {
            for (d = 1; e = r.shift();) e()
        }

        var n, r = [], i = !1, o = document, a = o.documentElement, c = a.doScroll, s = "DOMContentLoaded",
            l = "addEventListener", u = "onreadystatechange", f = "readyState", p = c ? /^loaded|^c/ : /^loaded|c/,
            d = p.test(o[f]);
        return o[l] && o[l](s, n = function () {
            o.removeEventListener(s, n, i), t()
        }, i), c && o.attachEvent(u, n = function () {
            /^c/.test(o[f]) && (o.detachEvent(u, n), t())
        }), e = c ? function (t) {
            self != top ? d ? t() : r.push(t) : function () {
                try {
                    a.doScroll("left")
                } catch (n) {
                    return setTimeout(function () {
                        e(t)
                    }, 50)
                }
                t()
            }()
        } : function (e) {
            d ? e() : r.push(e)
        }
    });
    var loaded = window.Keen, cached = window._Keen || {}, clients, ready;
    if (loaded && cached) {
        clients = cached.clients || {}, ready = cached.ready || [];
        for (var instance in clients) if (clients.hasOwnProperty(instance)) {
            var client = clients[instance];
            for (var method in Keen.prototype) Keen.prototype.hasOwnProperty(method) && (loaded.prototype[method] = Keen.prototype[method]);
            if (loaded.Query = Keen.Query ? Keen.Query : function () {
                }, loaded.Visualization = Keen.Visualization ? Keen.Visualization : function () {
                }, client._config && (client.configure.call(client, client._config), delete client._config), client._setGlobalProperties) {
                for (var globals = client._setGlobalProperties, i = 0; i < globals.length; i++) client.setGlobalProperties.apply(client, globals[i]);
                delete client._setGlobalProperties
            }
            if (client._addEvent) {
                for (var queue = client._addEvent || [], i = 0; i < queue.length; i++) client.addEvent.apply(client, queue[i]);
                delete client._addEvent
            }
            var callback = client._on || [];
            if (client._on) {
                for (var i = 0; i < callback.length; i++) client.on.apply(client, callback[i]);
                client.trigger("ready"), delete client._on
            }
        }
        for (var i = 0; i < ready.length; i++) {
            var callback = ready[i];
            Keen.on("ready", function () {
                callback()
            })
        }
    }
    return Keen.loaded && setTimeout(function () {
        Keen.utils.domready(function () {
            Keen.trigger("ready")
        })
    }, 0), Keen
});