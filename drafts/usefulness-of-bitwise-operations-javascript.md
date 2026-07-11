<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

# Usefulness of Bitwise Operations (JavaScript)

I feel a bit like bit-wise operations are the dark, back ally of programming. The few people that remember they exist generally prefer not to deal with them, and most folks seem to be happy to ignore their existence altogether. Bitwise, operations aren’t really necessary to concern ourselves with in the higher-level language world, and they can introduce confusion into a code base, so it is best to discuss their use before implementing them, but that doesn’t mean there aren’t some interesting use cases.

### **As an Integer conversion & Math.floor / rounding method**

Anytime a bitwise operation is performed, the value is converted into an integer, this involves dropping the digits to the right of the decimal. This means that if we perform any kind of bitwise operation that would not modify a value, the value will be rounded down. There are many ways to keep the original value, but some examples are: x or 0 (x|0), x and x (x&x) or not not x (~~x). These cases would be almost the same as Math.floor(Number(x)), although some atypical values of x like NaN deviates from this.

```
5.1 | 0 === 5   // OR takes any 1 bit values, 0 has no 1s
3.6 & 3.6 === 3  // AND is true where 1s align, itself will align
~~7.1 === 7  // NOT NOT just inverses the bits twice
```

Because of this conversion process strings are also converted to Numbers, and various non-integer values are also cast to 0 like: Infinity & null.

```
“3” | 0 === 3
null | 0 === 0
Infinity | 0 === 0
```

### As a Toggle

The Xor operator returns 1s in positions in all cases except where there are 1s in both positions. (so a 1 where the bits are different) This means that 0 ^ 1 = 1 and 1 ^ 1 = 0. This behavior can be used as a toggle where xor’ing a 1 will always flip our binary value.

```
let isClicked = 0;
const clickButton = ()=>isClicked^=1;
// value of isClicked starts at 0
clickButton(); // value is now 1
clickButton(); // value is now 0
clickButton(); // value is now 1
// ... etc.
```

### **Parsing Hexidecimal Color Values**

Hexidecimal colors have three positions red/green/blue, generally recommended in hexidecimal. Bitwise allows us to shift these values, effectively chopping off …. (see color extracting bottom article)

```
var hex = 'ffaadd';
var rgb = parseInt(hex, 16);

var red   = (rgb >> 16) & 0xFF; // returns 255
var green = (rgb >> 8) & 0xFF;  // 170
var blue  = rgb & 0xFF;     // 221
```

### Determining odd / even

Personally I like using modulus for this, but if we use x&1 this would be true only where there is a 1 bit in the 1s place, this will only ever be true for an odd number.

```
const isOdd3 = x=>{return x&1;};
isOdd(1) === 1
isOdd(2) === 0
isOdd(432) === 0
isOff(531) === 1
```

### Bitmasking

Bitmasking is the

### Sources

To give credit where it is due, I pulled some of these ideas from these sources:[**Where would I use a bitwise operator in JavaScript?** *I heavily use bitwise operators for numerical convertions in production scripts, because sometimes they're much faster…*stackoverflow.com](https://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript)

[https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/](https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/)
