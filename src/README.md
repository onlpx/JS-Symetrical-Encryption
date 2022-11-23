```js
// Copyright 2022 Onlp Inc. All rights reserved.

class SyEnc {
    constructor(t) {
        this.key = t, this.__abase__ = this.s2a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 
        this.fkey = this.__format__(t);
    }
    enc(t) {
        "object" != typeof t && (t = this.s2a(t));
        var s = [], a = this.__base__(t);
        this.__abase__ = a.alphabet;
        var e = a.rest;
        for (let t = 0; t < this.s2a(this.key).length; t++) if (![ ...this.__abase__ ].includes(this.s2a(this.key)[t])) throw new Error("wrong key");
        var _ = [];
        for (let t = 0; t < this.fkey.length; t++) _.push(this.__alphabet__(this.fkey[t]));
        for (let a = 0, e = 0; a < t.length; a++, e++) {
            var h = this.__abase__.indexOf(t[a]);
            a >= 32 && (e = 0), s.push(_[e][h]);
        }
        return btoa(this.a2s(s)) + ("" == e ? "" : ".") + e;
    }
    dec(t) {
        var s = "", a = null;
        2 == t.split(".").length ? (s = t.split(".")[1], a = this.s2a(atob(t.split(".")[0]))) : a = this.s2a(atob(t));
        var e = [];
        this.__abase__ = this.__fromrest__(s).alphabet;
        for (let t = 0; t < this.s2a(this.key).length; t++) if (![ ...this.__abase__ ].includes(this.s2a(this.key)[t])) throw new Error("Key contain byte that are not in alphabetBase");
        var _ = [];
        for (let t = 0; t < this.fkey.length; t++) _.push(this.__alphabet__(this.fkey[t]));
        for (let t = 0, s = 0; t < a.length; t++, s++) {
            t >= 32 && (s = 0);
            var h = _[s].indexOf(a[t]);
            e.push(this.__abase__[h]);
        }
        return this.a2s(e);
    }
    __format__(t) {
        var s = [];
        for (let a = 0; s.length < 32; a++) {
            for (let a = 0; a < t.length; a++) s.push(this.s2a(t)[a]);
            s = s.reverse();
        }
        return s.slice(0, 32);
    }
    __base__(t) {
        var s = "";
        for (let a = 0; a < t.length; a++) this.__abase__.includes(t[a]) || (s += String.fromCharCode(t[a]), 
        this.__abase__.push(t[a]));
        return {
            alphabet: this.__abase__,
            rest: btoa(s)
        };
    }
    __alphabet__(t) {
        var s = [ ...this.__abase__ ];
        return s.splice(this.__abase__.indexOf(t), s.length - 1).concat(s);
    }
    __fromrest__(t) {
        for (let s = 0; s < this.s2a(atob(t)).length; s++) this.__abase__.includes(this.s2a(atob(t))[s]) || (this.__abase__ = this.__abase__.concat(this.s2a(atob(t))[s]));
        return {
            alphabet: this.__abase__,
            rest: ""
        };
    }
    a2s(t) {
        var s = "";
        return t.forEach(t => {
            s += String.fromCharCode(t);
        }), s;
    }
    s2a(t) {
        var s = [];
        for (let a = 0; a < t.length; a++) s.push(t.charCodeAt(a));
        return s;
    }
}
```

Onlp @ 2022