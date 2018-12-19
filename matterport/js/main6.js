window.Modernizr = function (n, e, t) {
    function o(n) {
        d.cssText = n
    }

    function r(n, e) {
        return typeof n === e
    }

    var i, c, u, a = "2.8.2", f = {}, s = e.documentElement, l = "modernizr", p = e.createElement(l), d = p.style,
        y = ({}.toString, {}), w = [], b = w.slice, v = {}.hasOwnProperty;
    u = r(v, "undefined") || r(v.call, "undefined") ? function (n, e) {
        return e in n && r(n.constructor.prototype[e], "undefined")
    } : function (n, e) {
        return v.call(n, e)
    }, Function.prototype.bind || (Function.prototype.bind = function (n) {
        var e = this;
        if ("function" != typeof e) throw new TypeError;
        var t = b.call(arguments, 1), o = function () {
            if (this instanceof o) {
                var r = function () {
                };
                r.prototype = e.prototype;
                var i = new r, c = e.apply(i, t.concat(b.call(arguments)));
                return Object(c) === c ? c : i
            }
            return e.apply(n, t.concat(b.call(arguments)))
        };
        return o
    }), y.webgl = function () {
        return !!n.WebGLRenderingContext
    };
    for (var h in y) u(y, h) && (c = h.toLowerCase(), f[c] = y[h](), w.push((f[c] ? "" : "no-") + c));
    return f.addTest = function (n, e) {
        if ("object" == typeof n) for (var o in n) u(n, o) && f.addTest(o, n[o]); else {
            if (n = n.toLowerCase(), f[n] !== t) return f;
            e = "function" == typeof e ? e() : e, "undefined" != typeof enableClasses && enableClasses && (s.className += " " + (e ? "" : "no-") + n), f[n] = e
        }
        return f
    }, o(""), p = i = null, f._version = a, f
}(this, this.document);