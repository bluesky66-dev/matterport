!function () {
    "use strict";

    function t(t, i) {
        return typeof t === i
    }

    function i(t, i) {
        return t instanceof i
    }

    function n(t) {
        return t && t.nodeType
    }

    function e(t) {
        return n(t) ? t : i(t, g) ? t[0] : void 0
    }

    function o(t, i, n) {
        return g.each(t, function (t, e) {
            n = i.call(e, n, t, e)
        }), n
    }

    function r(t, i, n) {
        var e, o, r;
        if (t === i) return !0;
        if (!t || !i || t.constructor !== i.constructor) return !1;
        for (e = 0, o = n.length; o > e; e += 1) {
            if (r = n[e], t[r] && y(t[r].equals) && !t[r].equals(i[r])) return !1;
            if (t[r] !== i[r]) return !1
        }
        return !0
    }

    function s(t, i, n, e) {
        this.left = E(t), this.top = E(i), this.width = E(n), this.height = E(e), this.right = this.left + this.width, this.bottom = this.top + this.height
    }

    function h(t, i, n, e) {
        this.visible = t || 0, this.viewport = i || 0, this.possible = n || 0, this.rects = e && T({}, e) || null
    }

    function l(t, i) {
        this.els = t, this.viewport = i
    }

    function c(t, i, n) {
        var e;
        return g.inArray(n, q) >= 0 ? e = s.ofElement(t) : g.inArray(n, S) >= 0 && (e = h.of(t, i)), e ? e[n] : 0
    }

    function u(t, i) {
        return t.val - i.val
    }

    function a(t, i) {
        return i.val - t.val
    }

    function f(t) {
        var i = s.ofContent(t, !0), n = s.ofViewport(t, !0), e = i.width - n.width, o = i.height - n.height;
        this.content = i, this.viewport = n, this.width = 0 >= e ? null : n.left / e, this.height = 0 >= o ? null : n.top / o, this.left = n.left, this.top = n.top, this.right = i.right - n.right, this.bottom = i.bottom - n.bottom
    }

    function p(t) {
        this.el = t || window
    }

    function d(t, i) {
        this.context = t, this.viewport = i, this.init()
    }

    function v(t, i, n, e) {
        this.context = new l(t, i), this.property = n, this.descending = e, this.init()
    }

    function w(t) {
        t && t !== window && t !== document ? (this.context = t, this.$autoTarget = g(t)) : this.context = window, this.init()
    }

    var g = jQuery, m = g(window), b = g(document), T = g.extend, y = g.isFunction, k = Math.max, V = Math.min,
        E = Math.round, x = function () {
            var t = {}, i = 1;
            return function (n) {
                return n ? (t[n] || (t[n] = i, i += 1), t[n]) : 0
            }
        }();
    T(s.prototype, {
        equals: function (t) {
            return r(this, t, ["left", "top", "width", "height"])
        }, area: function () {
            return this.width * this.height
        }, relativeTo: function (t) {
            return new s(this.left - t.left, this.top - t.top, this.width, this.height)
        }, intersection: function (t) {
            if (!i(t, s)) return null;
            var n = k(this.left, t.left), e = V(this.right, t.right), o = k(this.top, t.top),
                r = V(this.bottom, t.bottom), h = e - n, l = r - o;
            return h >= 0 && l >= 0 ? new s(n, o, h, l) : null
        }, envelope: function (t) {
            if (!i(t, s)) return this;
            var n = V(this.left, t.left), e = k(this.right, t.right), o = V(this.top, t.top),
                r = k(this.bottom, t.bottom), h = e - n, l = r - o;
            return new s(n, o, h, l)
        }
    }), T(s, {
        ofContent: function (t, i) {
            return t && t !== document && t !== window ? i ? new s(0, 0, t.scrollWidth, t.scrollHeight) : new s(t.offsetLeft - t.scrollLeft, t.offsetTop - t.scrollTop, t.scrollWidth, t.scrollHeight) : new s(0, 0, b.width(), b.height())
        }, ofViewport: function (t, i) {
            return t && t !== document && t !== window ? i ? new s(t.scrollLeft, t.scrollTop, t.clientWidth, t.clientHeight) : new s(t.offsetLeft, t.offsetTop, t.clientWidth, t.clientHeight) : new s(m.scrollLeft(), m.scrollTop(), m.width(), m.height())
        }, ofElement: function (t) {
            var i = g(t);
            if (!i.is(":visible")) return null;
            var n = i.offset();
            return new s(n.left, n.top, i.outerWidth(), i.outerHeight())
        }
    }), T(h.prototype, {
        equals: function (t) {
            return this.fracsEqual(t) && this.rectsEqual(t)
        }, fracsEqual: function (t) {
            return r(this, t, ["visible", "viewport", "possible"])
        }, rectsEqual: function (t) {
            return r(this.rects, t.rects, ["document", "element", "viewport"])
        }
    }), T(h, {
        of: function (t, i) {
            var e, o, r;
            return t = n(t) && s.ofElement(t) || t, i = n(i) && s.ofViewport(i) || i || s.ofViewport(), t instanceof s && (e = t.intersection(i)) ? (o = e.area(), r = V(t.width, i.width) * V(t.height, i.height), new h(o / t.area(), o / i.area(), o / r, {
                document: e,
                element: e.relativeTo(t),
                viewport: e.relativeTo(i)
            })) : new h
        }
    });
    var q = ["width", "height", "left", "right", "top", "bottom"], S = ["possible", "visible", "viewport"];
    T(l.prototype, {
        sorted: function (t, i) {
            var n = this.viewport;
            return g.map(this.els, function (i) {
                return {el: i, val: c(i, n, t)}
            }).sort(i ? a : u)
        }, best: function (t, i) {
            return this.els.length ? this.sorted(t, i)[0] : null
        }
    }), T(f.prototype, {
        equals: function (t) {
            return r(this, t, ["width", "height", "left", "top", "right", "bottom", "content", "viewport"])
        }
    }), T(p.prototype, {
        equals: function (t) {
            return r(this, t, ["el"])
        }, scrollState: function () {
            return new f(this.el)
        }, scrollTo: function (t, i, n) {
            var e = g(this.el === window ? "html,body" : this.el);
            t = t || 0, i = i || 0, n = isNaN(n) ? 1e3 : n, e.stop(!0).animate({scrollLeft: t, scrollTop: i}, n)
        }, scroll: function (t, i, n) {
            var e = this.el === window ? m : g(this.el);
            t = t || 0, i = i || 0, this.scrollTo(e.scrollLeft() + t, e.scrollTop() + i, n)
        }, scrollToRect: function (t, i, n, e) {
            i = i || 0, n = n || 0, this.scrollTo(t.left - i, t.top - n, e)
        }, scrollToElement: function (t, i, n, e) {
            var o = s.ofElement(t).relativeTo(s.ofContent(this.el));
            this.scrollToRect(o, i, n, e)
        }
    });
    var C = {
        init: function () {
            this.callbacks = g.Callbacks("memory unique"), this.currVal = null, this.prevVal = null, this.checkProxy = g.proxy(this.check, this), this.autoCheck()
        }, bind: function (t) {
            this.callbacks.add(t)
        }, unbind: function (t) {
            t ? this.callbacks.remove(t) : this.callbacks.empty()
        }, trigger: function () {
            this.callbacks.fireWith(this.context, [this.currVal, this.prevVal])
        }, check: function (t) {
            var i = this.updatedValue(t);
            return void 0 !== i && (this.prevVal = this.currVal, this.currVal = i, this.trigger(), !0)
        }, $autoTarget: m, autoEvents: "load resize scroll", autoCheck: function (t) {
            this.$autoTarget[t === !1 ? "off" : "on"](this.autoEvents, this.checkProxy)
        }
    };
    T(d.prototype, C, {
        updatedValue: function () {
            var t = h.of(this.context, this.viewport);
            return this.currVal && this.currVal.equals(t) ? void 0 : t
        }
    }), T(v.prototype, C, {
        updatedValue: function () {
            var t = this.context.best(this.property, this.descending);
            return t && (t = t.val > 0 ? t.el : null, this.currVal !== t) ? t : void 0
        }
    }), T(w.prototype, C, {
        updatedValue: function () {
            var t = new f(this.context);
            return this.currVal && this.currVal.equals(t) ? void 0 : t
        }
    });
    var L = function (t, i) {
        var n = [].slice, e = jQuery, o = e.extend, r = e.isFunction, s = o({}, i), h = function (i, n, o, s) {
            return o = r(o) ? o.apply(i, n) : o, r(s[o]) ? s[o].apply(i, n) : void e.error('Method "' + o + '" does not exist on jQuery.' + t)
        }, l = function () {
            return h(this, n.call(arguments), s.defaultStatic, l)
        }, c = function (t) {
            return r(c[t]) ? c[t].apply(this, n.call(arguments, 1)) : h(this, n.call(arguments), s.defaultMethod, c)
        }, u = function (t) {
            t && (o(l, t.statics), o(c, t.methods)), l.modplug = u
        };
        u.prev = {statics: e[t], methods: e.fn[t]}, u(i), e[t] = l, e.fn[t] = c
    }, M = "fracs";
    L(M, {
        statics: {
            version: "0.15.0",
            Rect: s,
            Fractions: h,
            Group: l,
            ScrollState: f,
            Viewport: p,
            FracsCallbacks: d,
            GroupCallbacks: v,
            ScrollStateCallbacks: w,
            fracs: function (t, i) {
                return h.of(t, i)
            }
        }, methods: {
            content: function (t) {
                return this.length ? s.ofContent(this[0], t) : null
            }, envelope: function () {
                return o(this, function (t) {
                    var i = s.ofElement(this);
                    return t ? t.envelope(i) : i
                })
            }, fracs: function (i, n, o) {
                t(i, "string") || (o = n, n = i, i = null), y(n) || (o = n, n = null), o = e(o);
                var r = M + ".fracs." + x(o);
                return "unbind" === i ? this.each(function () {
                    var t = g(this).data(r);
                    t && t.unbind(n)
                }) : "check" === i ? this.each(function () {
                    var t = g(this).data(r);
                    t && t.check()
                }) : y(n) ? this.each(function () {
                    var t = g(this), i = t.data(r);
                    i || (i = new d(this, o), t.data(r, i)), i.bind(n)
                }) : this.length ? h.of(this[0], o) : null
            }, intersection: function () {
                return o(this, function (t) {
                    var i = s.ofElement(this);
                    return t ? t.intersection(i) : i
                })
            }, max: function (t, i, n) {
                return y(i) || (n = i, i = null), n = e(n), i ? (new v(this, n, t, !0).bind(i), this) : this.pushStack(new l(this, n).best(t, !0).el)
            }, min: function (t, i, n) {
                return y(i) || (n = i, i = null), n = e(n), i ? (new v(this, n, t).bind(i), this) : this.pushStack(new l(this, n).best(t).el)
            }, rect: function () {
                return this.length ? s.ofElement(this[0]) : null
            }, scrollState: function (i, n) {
                var e = M + ".scrollState";
                return t(i, "string") || (n = i, i = null), "unbind" === i ? this.each(function () {
                    var t = g(this).data(e);
                    t && t.unbind(n)
                }) : "check" === i ? this.each(function () {
                    var t = g(this).data(e);
                    t && t.check()
                }) : y(n) ? this.each(function () {
                    var t = g(this), i = t.data(e);
                    i || (i = new w(this), t.data(e, i)), i.bind(n)
                }) : this.length ? new f(this[0]) : null
            }, scroll: function (t, i, n) {
                return this.each(function () {
                    new p(this).scroll(t, i, n)
                })
            }, scrollTo: function (t, i, n, o) {
                return g.isNumeric(t) && (o = n, n = i, i = t, t = null), t = e(t), this.each(function () {
                    t ? new p(this).scrollToElement(t, i, n, o) : new p(this).scrollTo(i, n, o)
                })
            }, scrollToThis: function (t, i, n, o) {
                return o = new p(e(o)), o.scrollToElement(this[0], t, i, n), this
            }, softLink: function (t, i, n, o) {
                return o = new p(e(o)), this.filter("a[href^=#]").each(function () {
                    var e = g(this);
                    e.on("click", function () {
                        o.scrollToElement(g(e.attr("href"))[0], t, i, n)
                    })
                })
            }, sort: function (i, n, o) {
                return t(n, "boolean") || (o = n, n = null), o = e(o), this.pushStack(g.map(new l(this, o).sorted(i, !n), function (t) {
                    return t.el
                }))
            }, viewport: function (t) {
                return this.length ? s.ofViewport(this[0], t) : null
            }
        }, defaultStatic: "fracs", defaultMethod: "fracs"
    })
}();