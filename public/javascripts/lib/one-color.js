(function (e, t, n, r, i, s) {
    function h(n) {
        if (Object.prototype.toString.apply(n) === "[object Array]") {
            if (typeof n[0] == "string" && typeof h[n[0]] == "function")return new h[n[0]](n.slice(1, n.length));
            if (n.length === 4)return new h.RGB(n[0] / 255, n[1] / 255, n[2] / 255, n[3] / 255)
        } else if (typeof n == "string") {
            var r = n.toLowerCase();
            u[r] && (n = "#" + u[r]), r === "transparent" && (n = "rgba(0,0,0,0)");
            var i = n.match(c);
            if (i) {
                var s = i[1].toUpperCase(), o = a(i[8]) ? i[8] : e(i[8]), f = s[0] === "H", l = i[3] ? 100 : f ? 360 : 255, p = i[5] || f ? 100 : 255, d = i[7] || f ? 100 : 255;
                if (a(h[s]))throw new Error("one.color." + s + " is not installed.");
                return new h[s](e(i[2]) / l, e(i[4]) / p, e(i[6]) / d, o)
            }
            n.length < 6 && (n = n.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, "$1$1$2$2$3$3"));
            var v = n.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);
            if (v)return new h.RGB(t(v[1], 16) / 255, t(v[2], 16) / 255, t(v[3], 16) / 255)
        } else if (typeof n == "object" && n.isColor)return n;
        return!1
    }

    function p(e, t, i) {
        function l(e, t) {
            var r = {};
            r[t.toLowerCase()] = new n("return this.rgb()." + t.toLowerCase() + "();"), h[t].propertyNames.forEach(function (e, i) {
                r[e] = r[e === "black" ? "k" : e[0]] = new n("value", "isDelta", "return this." + t.toLowerCase() + "()." + e + "(value, isDelta);")
            });
            for (var i in r)r.hasOwnProperty(i) && h[e].prototype[i] === undefined && (h[e].prototype[i] = r[i])
        }

        h[e] = new n(t.join(","), "if (Object.prototype.toString.apply(" + t[0] + ") === '[object Array]') {" + t.map(function (e, n) {
            return e + "=" + t[0] + "[" + n + "];"
        }).reverse().join("") + "}" + "if (" + t.filter(function (e) {
            return e !== "alpha"
        }).map(function (e) {
            return"isNaN(" + e + ")"
        }).join("||") + "){" + 'throw new Error("[' + e + ']: Invalid color: ("+' + t.join('+","+') + '+")");}' + t.map(function (e) {
            return e === "hue" ? "this._hue=hue<0?hue-Math.floor(hue):hue%1" : e === "alpha" ? "this._alpha=(isNaN(alpha)||alpha>1)?1:(alpha<0?0:alpha);" : "this._" + e + "=" + e + "<0?0:(" + e + ">1?1:" + e + ")"
        }).join(";") + ";"), h[e].propertyNames = t;
        var s = h[e].prototype;
        ["valueOf", "hex", "hexa", "css", "cssa"].forEach(function (t) {
            s[t] = s[t] || (e === "RGB" ? s.hex : new n("return this.rgb()." + t + "();"))
        }), s.isColor = !0, s.equals = function (n, i) {
            a(i) && (i = 1e-10), n = n[e.toLowerCase()]();
            for (var s = 0; s < t.length; s += 1)if (r.abs(this["_" + t[s]] - n["_" + t[s]]) > i)return!1;
            return!0
        }, s.toJSON = new n("return ['" + e + "', " + t.map(function (e) {
            return"this._" + e
        }, this).join(", ") + "];");
        for (var u in i)if (i.hasOwnProperty(u)) {
            var f = u.match(/^from(.*)$/);
            f ? h[f[1].toUpperCase()].prototype[e.toLowerCase()] = i[u] : s[u] = i[u]
        }
        s[e.toLowerCase()] = function () {
            return this
        }, s.toString = new n('return "[one.color.' + e + ':"+' + t.map(function (e, n) {
            return'" ' + t[n] + '="+this._' + e
        }).join("+") + '+"]";'), t.forEach(function (e, r) {
            s[e] = s[e === "black" ? "k" : e[0]] = new n("value", "isDelta", "if (typeof value === 'undefined') {return this._" + e + ";" + "}" + "if (isDelta) {" + "return new this.constructor(" + t.map(function (t, n) {
                return"this._" + t + (e === t ? "+value" : "")
            }).join(", ") + ");" + "}" + "return new this.constructor(" + t.map(function (t, n) {
                return e === t ? "value" : "this._" + t
            }).join(", ") + ");")
        }), o.forEach(function (t) {
            l(e, t), l(t, e)
        }), o.push(e)
    }

    var o = [], u = {}, a = function (e) {
        return typeof e == "undefined"
    }, f = /\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/, l = /\s*(\.\d+|\d+(?:\.\d+)?)\s*/, c = new RegExp("^(rgb|hsl|hsv)a?\\(" + f.source + "," + f.source + "," + f.source + "(?:," + l.source + ")?" + "\\)$", "i");
    h.installMethod = function (e, t) {
        o.forEach(function (n) {
            h[n].prototype[e] = t
        })
    }, p("RGB", ["red", "green", "blue", "alpha"], {hex: function () {
        var e = (i(255 * this._red) * 65536 + i(255 * this._green) * 256 + i(255 * this._blue)).toString(16);
        return"#" + "00000".substr(0, 6 - e.length) + e
    }, hexa: function () {
        var e = i(this._alpha * 255).toString(16);
        return"#" + "00".substr(0, 2 - e.length) + e + this.hex().substr(1, 6)
    }, css: function () {
        return"rgb(" + i(255 * this._red) + "," + i(255 * this._green) + "," + i(255 * this._blue) + ")"
    }, cssa: function () {
        return"rgba(" + i(255 * this._red) + "," + i(255 * this._green) + "," + i(255 * this._blue) + "," + this._alpha + ")"
    }}), typeof module != "undefined" ? module.exports = h : typeof define == "function" && !a(define.amd) ? define([], function () {
        return h
    }) : typeof jQuery != "undefined" && a(jQuery.color) ? jQuery.color = h : (one = window.one || {}, one.color = h), p("HSV", ["hue", "saturation", "value", "alpha"], {rgb: function () {
        var e = this._hue, t = this._saturation, n = this._value, i = s(5, r.floor(e * 6)), o = e * 6 - i, u = n * (1 - t), a = n * (1 - o * t), f = n * (1 - (1 - o) * t), l, c, p;
        switch (i) {
            case 0:
                l = n, c = f, p = u;
                break;
            case 1:
                l = a, c = n, p = u;
                break;
            case 2:
                l = u, c = n, p = f;
                break;
            case 3:
                l = u, c = a, p = n;
                break;
            case 4:
                l = f, c = u, p = n;
                break;
            case 5:
                l = n, c = u, p = a
        }
        return new h.RGB(l, c, p, this._alpha)
    }, hsl: function () {
        var e = (2 - this._saturation) * this._value, t = this._saturation * this._value, n = e <= 1 ? e : 2 - e, r;
        return n < 1e-9 ? r = 0 : r = t / n, new h.HSL(this._hue, r, e / 2, this._alpha)
    }, fromRgb: function () {
        var e = this._red, t = this._green, n = this._blue, i = r.max(e, t, n), o = s(e, t, n), u = i - o, a, f = i === 0 ? 0 : u / i, l = i;
        if (u === 0)a = 0; else switch (i) {
            case e:
                a = (t - n) / u / 6 + (t < n ? 1 : 0);
                break;
            case t:
                a = (n - e) / u / 6 + 1 / 3;
                break;
            case n:
                a = (e - t) / u / 6 + 2 / 3
        }
        return new h.HSV(a, f, l, this._alpha)
    }}), p("HSL", ["hue", "saturation", "lightness", "alpha"], {hsv: function () {
        var e = this._lightness * 2, t = this._saturation * (e <= 1 ? e : 2 - e), n;
        return e + t < 1e-9 ? n = 0 : n = 2 * t / (e + t), new h.HSV(this._hue, n, (e + t) / 2, this._alpha)
    }, rgb: function () {
        return this.hsv().rgb()
    }, fromRgb: function () {
        return this.hsv().hsl()
    }})
})(parseFloat, parseInt, Function, Math, Math.round, Math.min)