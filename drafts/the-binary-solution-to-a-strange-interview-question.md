<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

# The Binary Solution to a Strange Interview Question

![](/images/0-GA6ckcDtfDWwddzF.png)

Note: this was actually originally written a couple years ago, but I recently wrapped it up and am now publishing it!

At an interview I had a some years back, I was asked to solve a problem that I couldn’t answer. I came up with a few ideas, but none of them followed the rules they laid down; at the time I was frustrated with myself, “it was so obvious!,” but now I realize there is actually an alternative (perhaps better) solution than the one they gave.

### The problem:

*Using JavaScript, you must log the original value of “a” which is an unknown integer (the value denoted as ?). You are limited to the variables a & b as shown, and can only change the right side of the 2nd line (right of const b = 9).*

```
let a = ?   // a can't be directly assigned any variable
const b = 9
a = b;
// log the original value of a & b
```

In response to this, I suggested using arrays/objects, but they corrected this and said that b must stay a number. As a result, they didn’t accept any solution I came up with they were looking for this:

### Their Solution:

```
let a = ?;
const b = 9 + a;
a = b;
console.log(9);      // known b value
console.log(b - 9);  // a value
```

In their solution, they were looking for the value to be deduced mathematically, but this also means they must know the additional value of b. This also means that the additive value of b, 9 most remain static.

However, as time as gone on, I realized there is a much better solution than this that still fulfills their requirements, yet preserves both values independently while still fulfilling their requirements of keeping b as a number.

### With Bitmasking:

```
let a = ?;
const b = 9 | a << 4;
a = b;
console.log(b & 0b1111); // value of b
console.log(b >> 4); // value of a
```

For those unfamiliar with bitmasking & bitwise operations, these operations compose a single number in binary to house both of our values (line 2), in this case the whole thing will be approximately 8-bits long (00000000) divided into two 4-bit values that look like this: a:XXXX–b:XXXX.

This is a breakdown of what is happening in the code snippet above:

```
// our original values in binary
let a = 101;     // 5 (I picked 5 for a to show how this works)
let b = 1001;    // 9
// replacing these values in line 2 of our code:
b = 1001 | 101 << 4;
// we now "left-shift" our value 4-spaces (adding 4 0s on the right)
b = 1001 | 1010000
// this can be rewritten with some leading 0s for clarity as:
b = 00001001 | 01010000
// now we take all the 1 bits and merge them (bit-wise or)
// this value is the value of a:0101(5) and b:1001(9) put together
b = 01011001
// finally we log the result of b
console.log(b & 1111)
// which can be filled in and written as:
console.log(01011001 & 00001111)
// we take only bits that match as true (1)  (bit-wise and)
console.log(00001001);  // logs 9
// next we extract "a":
console.log(01011001 >> 4);
// this is a rightshift (bits going past the 1s are chopped off)
// 00101100->1  // 1st shift the 1 gets chopped
// 00010110->0  // 2nd shift a 0 gets chopped
// 00001011->0  // 3rd shift a 0 gets chopped
// 00000101->1  // 4th shift a 1 gets chopped
// so a right-shift 4 is the same as:
console.log(00000101); // logs 5
```

*It should be noted the one downside of this approach is the size of the number must not exceed 15 (4–bit integers) for either number and all values will drop any decimal places (my assumption is that they are single digit numbers). For larger numbers we can extend the functionality by shifting further and adjusting our mask to a larger binary number in the multiples of: 16,32,64… representing 8, 16,and 32 bit integers respectively. We could also automatically detect the length needed by adding some more code.*

But ultimately, the interview question is frankly flawed.

### There are many loopholes in this question

The wording is vague and many things could be assumed incorrectly. Does not being able to assign a to any other value mean that we can’t assign a if we modify it in a minor but otherwise meaningless way? Like Stringifying it or adding a value that would be easily rounded off like 0.000001 (since all numbers in JS are floating point based and prone to accuracy errors anyway). What does it mean to assign a value, particularly since the solution involves assigning the value (just with a modification to it). This is a semantics question.

### This solution is never going to happen in the real world

Bitmasking has a place in the world because it is intended to preserve ALL information in a concise manner (often as flags / settings). Modern examples of this are: chmod permissions and hex colors. Arbitrarily adding numbers however, particularly when information is lost, has no place in the coding world.

Imagine if someone was designing an application where they didn’t store the price of the first item in a cart. Instead they stored the total cost of the cart and all the other items in it, and had to work our way backwards with algebra to deduce what the cost of the original item was. This would obviously not be a good idea.

### There are better solutions to a problem like this

I realize this is fairly obvious, but off the top of my head much better alternatives are assigning better types to represent multiple data points:
- Arrays
- Objects
- Sets
- Dictionaries or KVP/Associative Arrays (Objects in JS)
- Concatenating multiple values as a String like a comma delimited list.
- (As mentioned: storing the values on a bit level, bitmasking)

or rewriting this such that we can pass these values in different ways, such as:
- Function arguments
- Chainable functions
- Variables in scope

Or even just doing it the same way they demonstrated, but allowing us to assign the original value of a to a useful variable.

### A Better Interview Question

I would change this interview question to be much more open-ended: Define the boolean/bit settings: write = 1, read = 1, and owner = 0 (with those specified defaults) and pass them to a commitSettings function. The commitSettings function can have a maximum of 1 argument but may return whatever types you wish. You do not have to show anything other than how you would pass these values to the commitSettings functions. Come up with several different ways of doing this, and explain which you think is best and why.

This allows some creativity, here are a number of ways I could see this being done: (I am sure there are more)

```
let settings = { write: 1, read: 1, owner: 0 };
commitSettings(settings);
let settings = 0b110;  // write, read, owner
commitSettings(settings);
function Settings(write = 1, read = 1, owner = 0) {
  this.write = write;
  this.read = read;
  this.owner = owner;
  this.commitSettings = ...
}
// you could also pass settings into a class
(new Settings()).commitSettings();

class Settings{
  constructor(write = 1, read = 1, owner = 0)
    this.write = write;
    this.read = read;
    this.owner = owner;
  }
  commitSettings() {
    // code here using class properties
  }
  static generator() {
    return new();
  }
}
// you could also instantiate directly Settings.generator().commitSettings();
commitSettings("write,read");
commitSettings().write().read();
// set defaults in commitSettings instead,
// I said at least 1 not that it must be an argument :)
commitSettings()
// commitSettings.X represents Symbols in JS
commitSettings([commitSettings.write,commitSettings.read]);
// you could get cute and claim that array spreading into arguments
// might be exempt since it is still written as a single argument, // even if it is defined as multiple parameters
const defaults = [write,read];
commitSettings(...defaults);
// if you go super odd-ball and frankly dumb
// you could pass an integer of all possible permutations.
// 9 for all 3 setting combinations
commitSettings(6);
/***
There are also many other ways of doing this, if allowing typescript we could also look for types like enums, or we could simply use Symbols in vanilla JS.
***/
```

### Conclusion

The one thing I am happy for is that this question got me more interested in understanding bitwise operations & bit masking, which is not something I encounter on a day-to-day basis. It just goes to show, you can learn something from just about anything.

###
