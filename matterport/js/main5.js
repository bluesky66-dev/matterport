!function (i, e) {
    "use strict";
    var s = "", r = "?", o = "function", a = "undefined", n = "object", t = "major", d = "model", w = "name",
        l = "type", p = "vendor", m = "version", c = "architecture", u = "console", g = "mobile", f = "tablet",
        h = "smarttv", b = {
            has: function (i, e) {
                return e.toLowerCase().indexOf(i.toLowerCase()) !== -1
            }, lowerize: function (i) {
                return i.toLowerCase()
            }
        }, y = {
            rgx: function () {
                for (var i, s, r, t, d, w, l, p = 0, m = arguments; p < m.length; p += 2) {
                    var c = m[p], u = m[p + 1];
                    if (typeof i === a) {
                        i = {};
                        for (t in u) d = u[t], typeof d === n ? i[d[0]] = e : i[d] = e
                    }
                    for (s = r = 0; s < c.length; s++) if (w = c[s].exec(this.getUA())) {
                        for (t = 0; t < u.length; t++) l = w[++r], d = u[t], typeof d === n && d.length > 0 ? 2 == d.length ? typeof d[1] == o ? i[d[0]] = d[1].call(this, l) : i[d[0]] = d[1] : 3 == d.length ? typeof d[1] !== o || d[1].exec && d[1].test ? i[d[0]] = l ? l.replace(d[1], d[2]) : e : i[d[0]] = l ? d[1].call(this, l, d[2]) : e : 4 == d.length && (i[d[0]] = l ? d[3].call(this, l.replace(d[1], d[2])) : e) : i[d] = l ? l : e;
                        break
                    }
                    if (w) break
                }
                return i
            }, str: function (i, s) {
                for (var o in s) if (typeof s[o] === n && s[o].length > 0) {
                    for (var a = 0; a < s[o].length; a++) if (b.has(s[o][a], i)) return o === r ? e : o
                } else if (b.has(s[o], i)) return o === r ? e : o;
                return i
            }
        }, v = {
            browser: {
                oldsafari: {
                    major: {1: ["/8", "/1", "/3"], 2: "/4", "?": "/"},
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {sprint: {model: {"Evo Shift 4G": "7373KT"}, vendor: {HTC: "APA", Sprint: "Sprint"}}},
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        RT: "ARM"
                    }
                }
            }
        }, k = {
            browser: [[/(opera\smini)\/((\d+)?[\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i, /(opera).+version\/((\d+)?[\w\.]+)/i, /(opera)[\/\s]+((\d+)?[\w\.]+)/i], [w, m, t], [/\s(opr)\/((\d+)?[\w\.]+)/i], [[w, "Opera"], m, t], [/(kindle)\/((\d+)?[\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?((\d+)?[\w\.]*)/i, /(?:ms|\()(ie)\s((\d+)?[\w\.]+)/i, /(rekonq)((?:\/)[\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron)\/((\d+)?[\w\.-]+)/i], [w, m, t], [/(trident).+rv[:\s]((\d+)?[\w\.]+).+like\sgecko/i], [[w, "IE"], m, t], [/(yabrowser)\/((\d+)?[\w\.]+)/i], [[w, "Yandex"], m, t], [/(comodo_dragon)\/((\d+)?[\w\.]+)/i], [[w, /_/g, " "], m, t], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i], [w, m, t], [/(dolfin)\/((\d+)?[\w\.]+)/i], [[w, "Dolphin"], m, t], [/((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i], [[w, "Chrome"], m, t], [/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i], [m, t, [w, "Mobile Safari"]], [/version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i], [m, t, w], [/webkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i], [w, [t, y.str, v.browser.oldsafari.major], [m, y.str, v.browser.oldsafari.version]], [/(konqueror)\/((\d+)?[\w\.]+)/i, /(webkit|khtml)\/((\d+)?[\w\.]+)/i], [w, m, t], [/(navigator|netscape)\/((\d+)?[\w\.-]+)/i], [[w, "Netscape"], m, t], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?((\d+)?[\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i, /(mozilla)\/((\d+)?[\w\.]+).+rv\:.+gecko\/\d+/i, /(uc\s?browser|polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|qqbrowser)[\/\s]?((\d+)?[\w\.]+)/i, /(links)\s\(((\d+)?[\w\.]+)/i, /(gobrowser)\/?((\d+)?[\w\.]+)*/i, /(ice\s?browser)\/v?((\d+)?[\w\._]+)/i, /(mosaic)[\/\s]((\d+)?[\w\.]+)/i], [w, m, t], [/(apple(?:coremedia|))\/((\d+)[\w\._]+)/i, /(coremedia) v((\d+)[\w\._]+)/i], [w, m, t], [/(aqualung|lyssna|bsplayer)\/([\w\.-]+)/i], [w, m], [/(ares|ossproxy)\s((\d+)[\w\.-]+)/i], [w, m, t], [/(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i, /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i, /(lg player|nexplayer)\s((\d+)[\d\.]+)/i, /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i], [w, m, t], [/(nexplayer)\s((\d+)[\w\.-]+)/i], [w, m, t], [/(flrp)\/((\d+)[\w\.-]+)/i], [[w, "Flip Player"], m, t], [/(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i], [w], [/(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i], [w, m, t], [/(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i, /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i, /(lavf)((\d+)[\d\.]+)/i], [w, m, t], [/(htc_one_s)\/((\d+)[\d\.]+)/i], [[w, /_/g, " "], m, t], [/(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i], [w, m], [/(mplayer)(?:\s|\/)((\d+)[\w\.-]+)/i, /(mplayer) unknown-((\d+)[\w\.\-]+)/i], [w, m, t], [/(mplayer)/i, /(yourmuze)/i, /(media player classic|nero showtime)/i], [w], [/(nero (?:home|scout))\/((\d+)[\w\.-]+)/i], [w, m, t], [/(nokia\d+)\/((\d+)[\w\.-]+)/i], [w, m, t], [/\s(songbird)\/((\d+)[\w\.-]+)/i], [w, m, t], [/(winamp)3 version ((\d+)[\w\.-]+)/i, /(winamp)\s((\d+)[\w\.-]+)/i, /(winamp)mpeg\/((\d+)[\w\.-]+)/i], [w, m, t], [/(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i], [w], [/(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i], [w, m, t], [/(smp)((\d+)[\d\.]+)/i], [w, m, t], [/(vlc) media player - version ((\d+)[\w\.]+)/i, /(vlc)\/((\d+)[\w\.-]+)/i, /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i, /(foobar2000)\/((\d+)[\d\.]+)/i, /(itunes)\/((\d+)[\d\.]+)/i], [w, m, t], [/(wmplayer)\/((\d+)[\w\.-]+)/i, /(windows-media-player)\/((\d+)[\w\.-]+)/i], [[w, /-/g, " "], m, t], [/windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i], [m, t, [w, "Windows"]], [/(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i], [w, m, t], [/(rad.io)\s((\d+)[\d\.]+)/i, /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i], [[w, "rad.io"], m, t]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[c, "amd64"]], [/(ia32(?=;))/i], [[c, b.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[c, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[c, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[c, /ower/, "", b.lowerize]], [/(sun4\w)[;\)]/i], [[c, "sparc"]], [/(ia64(?=;)|68k(?=\))|arm(?=v\d+;)|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [c, b.lowerize]],
            device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [d, p, [l, f]], [/applecoremedia\/[\w\.]+ \((ipad)/], [d, [p, "Apple"], [l, f]], [/(apple\s{0,1}tv)/i], [[d, "Apple TV"], [p, "Apple"]], [/(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [p, d, [l, f]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [d, p, [l, g]], [/\((ip[honed|\s\w*]+);/i], [d, [p, "Apple"], [l, g]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [p, d, [l, g]], [/\((bb10);\s(\w+)/i], [[p, "BlackBerry"], d, [l, g]], [/android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i], [[p, "Asus"], d, [l, f]], [/(sony)\s(tablet\s[ps])/i], [p, d, [l, f]], [/(nintendo)\s([wids3u]+)/i], [p, d, [l, u]], [/((playstation)\s[3portablevi]+)/i], [[p, "Sony"], d, [l, u]], [/(sprint\s(\w+))/i], [[p, y.str, v.device.sprint.vendor], [d, y.str, v.device.sprint.model], [l, g]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [p, [d, /_/g, " "], [l, g]], [/\s((milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?))[\w\s]+build\//i, /(mot)[\s-]?(\w+)*/i], [[p, "Motorola"], d, [l, g]], [/android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i], [[p, "Motorola"], d, [l, f]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i], [[p, "Samsung"], d, [l, f]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[p, "Samsung"], d, [l, g]], [/(sie)-(\w+)*/i], [[p, "Siemens"], d, [l, g]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[p, "Nokia"], d, [l, g]], [/android\s3\.[\s\w-;]{10}((a\d{3}))/i], [[p, "Acer"], d, [l, f]], [/android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i], [[p, "LG"], d, [l, f]], [/((nexus\s[45]))/i, /(lg)[e;\s-\/]+(\w+)*/i], [[p, "LG"], d, [l, g]], [/android.+((ideatab[a-z0-9\-\s]+))/i], [[p, "Lenovo"], d, [l, f]], [/(lg) netcast\.tv/i], [p, [l, h]], [/(mobile|tablet);.+rv\:.+gecko\//i], [l, p, d]],
            engine: [[/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [w, m], [/rv\:([\w\.]+).*(gecko)/i], [m, w]],
            os: [[/microsoft\s(windows)\s(vista|xp)/i], [w, m], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [w, [m, y.str, v.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[w, "Windows"], [m, y.str, v.os.windows.version]], [/\((bb)(10);/i], [[w, "BlackBerry"], m], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)\/([\w\.]+)/i, /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i], [w, m], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[w, "Symbian"], m], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[w, "Firefox OS"], m], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [w, m], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[w, "Chromium OS"], m], [/(sunos)\s?([\w\.]+\d)*/i], [[w, "Solaris"], m], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [w, m], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[w, "iOS"], [m, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i], [w, [m, /_/g, "."]], [/(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos)/i, /(unix)\s?([\w\.]+)*/i], [w, m]]
        }, x = function (e) {
            var r = e || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : s);
            return this instanceof x ? (this.getBrowser = function () {
                return y.rgx.apply(this, k.browser)
            }, this.getCPU = function () {
                return y.rgx.apply(this, k.cpu)
            }, this.getDevice = function () {
                return y.rgx.apply(this, k.device)
            }, this.getEngine = function () {
                return y.rgx.apply(this, k.engine)
            }, this.getOS = function () {
                return y.rgx.apply(this, k.os)
            }, this.getResult = function () {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }, this.getUA = function () {
                return r
            }, this.setUA = function (i) {
                return r = i, this
            }, void this.setUA(r)) : new x(e).getResult()
        };
    if (typeof exports !== a) typeof module !== a && module.exports && (exports = module.exports = x), exports.UAParser = x; else if (i.UAParser = x, typeof define === o && define.amd && define(function () {
            return x
        }), typeof i.jQuery !== a) {
        var A = i.jQuery, _ = new x;
        A.ua = _.getResult(), A.ua.get = function () {
            return _.getUA()
        }, A.ua.set = function (i) {
            _.setUA(i);
            var e = _.getResult();
            for (var s in e) A.ua[s] = e[s]
        }
    }
}(this);