class SyEnc {

    constructor(key) {
        this.key = key
        this.__abase__ = this.s2a("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
        this.fkey = this.__format__(key)
    }

    encrypt(plain) {
        if (typeof plain != 'object')
            plain = this.s2a(plain)

        var result      = [];
        var __abase__   = this.__base__(plain);
        this.__abase__  = __abase__.alphabet;
        var rest        = __abase__.rest;

        for (let i = 0; i < this.s2a(this.key).length; i++) {
            if (![...this.__abase__].includes(this.s2a(this.key)[i]))
                throw new Error("wrong key")
        }

        var __alist__ = [];
        for (let i = 0; i < this.fkey.length; i++)
            __alist__.push(this.__alphabet__(this.fkey[i]));

        for (let i = 0, o = 0; i < plain.length; i++, o++) {
            var at = this.__abase__.indexOf(plain[i]);
            if (i >= 32)
                o = 0;
            result.push(__alist__[o][at]);
        }

        return btoa(this.a2s(result)) + (rest == "" ? "" : ".") + rest;
    }

    decrypt(encrypted_b64) {
        var rest      = "";
        var encrypted = null;

        if (encrypted_b64.split('.').length == 2) {
            rest      = encrypted_b64.split('.')[1];
            encrypted = this.s2a(atob(encrypted_b64.split('.')[0]));
        } else {
            encrypted = this.s2a(atob(encrypted_b64));
        }

        var result     = [];
        this.__abase__ = this.__fromrest__(rest).alphabet;

        for (let i = 0; i < this.s2a(this.key).length; i++) {
            if (![...this.__abase__].includes(this.s2a(this.key)[i]))
                throw new Error("Key contain byte that are not in alphabetBase")
        }

        var __alist__ = [];
        for (let i = 0; i < this.fkey.length; i++)
            __alist__.push(this.__alphabet__(this.fkey[i]));

        for (let i = 0, o = 0; i < encrypted.length; i++, o++) {
            if (i >= 32)
                o = 0;
            var at = __alist__[o].indexOf(encrypted[i]);
            result.push(this.__abase__[at]);
        }

        return this.a2s(result);
    }

    __format__(key) {
        var res = [];
        for (let i = 0; res.length < 32; i++) {
            for (let _ = 0; _ < key.length; _++) {
                res.push(this.s2a(key)[_]);
            }
            res = res.reverse();
        }
        return res.slice(0, 32);
    }

    __base__(plain) {
        var rest = "";
        for (let i = 0; i < plain.length; i++) {
            if (!this.__abase__.includes(plain[i])) {
                rest += String.fromCharCode(plain[i]);
                this.__abase__.push(plain[i]);
            }
        }
        return {
            alphabet: this.__abase__,
            rest: btoa(rest)
        };
    }

    __alphabet__(keybyte) {
        var result = [...this.__abase__];
        var res = result.splice(this.__abase__.indexOf(keybyte), result.length - 1);
        return res.concat(result)
    }

    __fromrest__(rest) {
        for (let i = 0; i < this.s2a(atob(rest)).length; i++) {
            if (!this.__abase__.includes(this.s2a(atob(rest))[i])) {
                this.__abase__ = this.__abase__.concat(this.s2a(atob(rest))[i]);
            }
        }
        return {
            alphabet: this.__abase__,
            rest: ""
        };
    }

    a2s(arr) {
        var result = "";
        arr.forEach(charcode => {
            result += String.fromCharCode(charcode);
        });
        return result;
    }

    s2a(str) {
        var result = [];
        for (let i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i))
        }
        return result;
    }
}

plain = "Hello World"
key   = "key"
enc   = new SyEnc(key)
encr  = enc.encrypt("test")
decr  = enc.decrypt(encr)

console.log("plain > ", plain); // Hello World
console.log("key   > ", key);   // key
console.log("encr  > ", encr);  // aDhTaA==
console.log("decr  > ",decr);   // test