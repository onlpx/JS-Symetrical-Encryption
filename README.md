# JS-Symetrical Encryption
 Javascript Symetrical Encryption Algorithm


### usage
```js
plain = "Hello World"
key   = "key"

enc   = new SyEnc(key)
encr  = enc.enc("test")
decr  = enc.dec(encr)

console.log("plain > ", plain); // Hello World
console.log("key   > ", key);   // key
console.log("encr  > ", encr);  // aDhTaA==
console.log("decr  > ", decr);  // test
```

### how does it work
1. formatting the key:
```
while result < 32:
  for each byte in key:
    add byte to result
  reverse result
return Subsequence(result,0,32) //Get only 32 chars
```
2. Generate a base alphabet from the plain text
```
basic alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
rest = []
for each byte in plain:
  if basic alphabet does not contain byte:
    add byte to basic alphabet
    add byte to rest
    
return rest & alphabet
```
3. We generate 32 base alphabet shifted by each byte of the key
```
basic alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

if the first byte of key is f then the first alphabet will be
fghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde
```
4. For each byte in plain we take the byte at the same index in the generated alphabet
```
basic alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

if the first byte of key is f then the first alphabet will be
fghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcde

then if the first byte of plain is B, index is 1 in the basic alphabet so B will be g
```
5. In the result we add the rest encoded in base64 (this is for decryption)


RESUME:
```
key = TEST
Plain = HELLO
Encrypted = AIDEH
                        E       H         L       O
Base alphabet: A B C D [E] F G [H] I J K [L] M N [O] P Q R S T U V W X Y Z
Key:           T U V W  X  Y Z [A] B C D  E  F G [H] I J K L M N O P Q R S
               E F G H [I] J K  L  M N O  P  Q R  S  T U V W X Y Z A B C D
               S T U V  W  X Y  Z  A B C [D] E F  G  H I J K L M N O P Q R 
               T U V W  X  Y Z  A  B C D [E] F G  H  I J K L M N O P Q R S
```

creds to D-1