<!-- date posted: 2022-04-18 -->
# Rust, my initial thoughts thus far

Posted on Medium: 2022-04-18

![](/images/0-JeMe_UqbU6Ti8TCA.png)

The Rust programming language has topped the most loved language in all of the Stack Overflow development surveys since 2016 and first appeared as one of the most popular languages in 2019, since then it has only become more popular and more loved. The popularity of the Rust language was up to 7% of all respondents in 2021. (+29% growth in popularity over one year).

![](/images/1-Oelytm1nJ7Pf8hzS_5LlwA.png)

What is the purpose of Rust? According to Rust’s official documentation:

> The Rust programming language helps you write faster, more reliable software. High-level ergonomics and low-level control are often at odds in programming language design; Rust challenges that conflict. Through balancing powerful technical capacity and a great developer experience, Rust gives you the option to control low-level details (such as memory usage) without all the hassle traditionally associated with such control. ([Source](https://doc.rust-lang.org/book/ch00-00-introduction.html))

After several hours playing with the language and going through their book on Rust, I would describe it as a compromise between what many developers expect from modern languages, while maintaining a foothold in some of the syntax and low-level capacities of C/C++. However, this description alone sells the language short; the language also does do some new things and combines a lot of preexisting ideas such that everything feels like it has a purpose to its design.

### Feature 1: Rust’s Default Immutability

```
// doesn't work because myNum is not mutable
let myNum = 2;
myNum += 1;
println!("{}", myNum)
```

![](/images/1-QLVxIeZs_DCvVTAn-GxsLA.png)

```
// works and prints "3"
let mut myNum = 2;
myNum += 1;
println!("{}", myNum)
```

At the outset, it might seem crazy that a “mut” modifier must be applied to every variable that needs to be mutable (writable), particularly since Rust already has a concept of const. (compile time constants, like C# or C++’s equivalent const) It therefore is assuming that every ‘let’ variable in Rust is the equivalent of readonly variable. (such as in C#).

However, as many developers are aware, it is all too common when developers make things mutable that don’t need to be. This can cause unintended side-effects and encourages the use of impure functions, so the principle of making immutability default has precedence, but it seems that there would still be a lot of use cases where **mut** would need to be applied. What if the developer needed to simply reset a variable, such as a timestamp in a request being retried? There is a solution to this with **Shadowing**.

### Feature 2: Variable Shadowing

Rust allows the same immutable variable to be redefined; Rust calls this shadowing. This might seem messy, but there are some extremely good reasons for this.

```
 let myNum = 2;
 // do something here
 let myNum = 3;
 // do something else
 println!(“{}”, myNum)
```

- It makes clear the intention of the developer to other developers. “I am not calculating or building a variable — I am specifically redoing / resetting / repurposing this variable”
- It gives a distinction when compared to ‘mut’ which communicates that the developer intends to “edit or calculate” the value. This also gives reasoning as to why Feature 1 is not as annoying as it would seem (default immutability) because it makes immutable variables re-definable/re-settable.
- It makes clear to the Rust compiler how to automatically clean memory (more on this later)

### Feature 3: Variable types are inferred (unless specified / ambiguous)

A problem I have with many languages is that they often mix inferred types and specified types, which causes ambiguity between the developers intentions. In C#, for example, the following is all-to-common of an occurrence:

```
// In C#
int a = 0;
long b = 0;
var c = 0;
```

Since there is no information given in the variable names, I can come to several conclusions here:
- a: Did the developer mean for this to be set to a default int (32 bit) or is that just their coding preference that they like to hardcode every type even when they don’t need to?
- b: Did the developer set it to a long because they needed it to be a long? The default value doesn’t seem to require it. Do they just use long as their development preference for numbers because they don’t care about memory?
- c: Why is this a var when the others aren’t? Was the intention to use this as some other type or is it just the preference of the developer (who might have added this one line) to use var for everything?

```
// in Rust
let a = 0;
let mut b : u64 = 0;
let c = 0;
```

In Rust it now becomes absolutely clear that the developer wanted to leave a&c up to the compiler and was ok with the default types it assigned, but wanted to specifically state that b should be a 64-bit unsigned integer. This also tells us something about the variable as it likely is computed to something much larger, something further affirmed by the mutability specified for the variable (as discussed before). This tells a much better picture of a developer’s intentions.

This format is not unique to Rust, it is also seen in TypeScript (and I am sure some other language implementations) but it is a good example of Rust being very well planned.

### Feature 4: Return values & expressions

The “return” keyword still exists in Rust, but it is not needed when a function returns only a single expression. The only catch is that for something to be returned from an expression in Rust it must not have the semicolon terminating the line.

```
println!(“{}”,addOne(2));
fn addOne(value : i32) -> i32 {
 value + 1
}
```

Since expressions also can be represented as brackets {} something like this is possible also:

```
// result gets assigned 3
let result = {
  let x = 1;
  x + 2
}
```

This is somewhat like a self-executing anonymous function. Although it should be noted that passing anonymous functions as arguments is not the same syntax since the expression always executes.

```
DoSomeThingWith({
  let x = 1;
  x + 2
});
// is the same as
DoSomeThingWith(3)
// so it is not the same as: (javascript)
DoSomeThingWith(()=>{
  let x = 1;
  return x + 2;
});
```

Passing a function as an argument would require a defined function:

```
fn myInputFn() { /* what to do here*/ }
DoSomeThingWith(myInputFn)
```

### Feature 5: Nulls are kinda gone, though not really

Rust enforces that every basic type be assigned a value as there is no default value or null value for types. This resolves a whole host of if statement and null-comparison checking, while simultaneously avoiding a multitude of errors.

However, for cases where a null value is truly needed, Rust does provide a build-in enum called “Option” which allows datatypes to be wrapped using Option’s generic type and it can be set to None. (Null’s equivalent)

```
let myNullNum : Option<i32> = None;
```

This means that all other data types are not nullable, technically Option itself can’t be assigned null, as it just defines a None enum option which should be treated throughout the app to check on for “None” values.

There is also a Some() value provided by the same “Option” which takes a value if Option is not None (more on this later).

### Feature 6: Expression Matching

Switch statements are not used in Rust, instead there are “matches.” This is reminiscent of [switch expressions in C#](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)

```
// example taken from the Rust Book (doc.rust-lang.org/book)
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

This far more concise matching syntax with expressions is used to return the data in the expression and/or execute the logic within.

There is also an “other” and an “_” value that can be used as catch-all’s (the former is used if you need to use the value in the expression)

### Feature 7: Tuples feel natural and less dirty

Tuples can be defined without even typing the world “Tuple,” the only thing needed is parenthesis, and optionally typing (as discussed earlier)

Here a tuple with three values, and it is deconstructed into 3 variables x,y,z.

```
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;
// x is 500, y is 6.4, and z is 1
```

Because of this simple format, tuples are incredibly easy to implement as a return value:

```
fn surveyYears() -> (i32,i32,i32) {
  (2020,2021,2022)
}
```

I know tuples can have a “code smell” about them so perhaps having such ease of access is not ideal, but for me it makes them much less of an eyesore and it mixes well with the deconstructing support provided by Rust.

### Feature 8: Method implementation is portable & strict

Rust does not have classes like some languages, instead it relies mainly on structs for object data.

```
let mut obj = User {
   active,
   username: String::from(“jsmith”)
 };

 obj.disable();
 println!(“{} {}”, obj.active, obj.username);
struct User {
    active: bool,
    username: String
}
impl User {
    fn disable(&mut self) {
        self.active = false;
    }
}
```

The struct itself contains only data / properties, it does not contain method implementation. This must be specified on the struct with the “impl” keyword which keeps method implementation separate from data. Additionally, multiple impl {struct_name} statements can exist allowing extensibility of the struct without the need of excessive inheritance; speaking of inheritance:

Methods that are implemented must reference the object’s self (like the disable method in the example above), otherwise they must be defined as functions on the namespace/struct itself, somewhat like static functions. Imagine a User function that generically puts together the first and last name of any user:

```
let fullName = User::GetFullName(firstName,lastName)
```

I particularly like this since the :: notation makes it extremely clear that this function is not doing anything with underlying object data.

### Feature 9: The way inheritance works is neat and flexible

Inheritance is done using traits. Traits are effectively abstract classes or less-strict forms of interfaces.

Traits can provide either implementation details or, as in traditional interfaces: merely a signature that must be fulfilled by the derived class (or in this case struct).

```
// an example from https://doc.rust-lang.org/book/
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

What I like about this is that there is no need to specify abstract keywords or have separate interfaces and classes, there is just a single inherited trait that specified methods (with or without implementation) and those without must be implemented by the inheriting struct. (in this case the impl for Tweet) Additionally, there is no limit to implementations of traits, so a single Struct can have multiple method implementations (as discussed in the previous feature) and multiple inherited traits.

Perhaps even cooler is the concept of constraints in Rust allows inherited traits to be specified in any combination.

Consider this signature:

```
pub fn notify<T: Summary + Display>(item: &T)
```

Generic type (T) must be a struct that implements the traits Summary & Display, giving the function access to all relevant methods contained therein.

### Feature 10: Enums can have values

Rust allows a value to be tied to an enum’s type, like a Tuple.

```
enum IpAddr {
        V4(u8, u8, u8, u8),
        V6(String),
    }

let home = IpAddr::V4(127, 0, 0, 1);
if let IpAddr::V4(x,y,z,a) = home {
  println!("{}{}{}{}",x,y,z,a);
}
```

The if statement at the bottom is an example of how to extract the value: it simultaneously compares the enum and deconstructs the value if the matching enum type is V4.

As discussed earlier, the Option is just an included Enum that contains a Some() & None value. This Some value can be used when the value is not null (not None) and given the non-none value. This works exactly like the enum values discussed here.

```
let someNumber = Option::Some(5)  // the type is: Option of an integer type
```

### Feature 11: The Compiler has Galaxy-Brain intelligence

![](/images/0-ARYFHl7DxPcsixpL.png)

The compiler in Rust provides a large number of warnings and errors to make sure code is written as efficiently as it knows how and to make sure that the proper disposal of memory / intended behavior works as expected. Any good compiler will do this, but I find myself drawn to the number of things Rust warns of and protects from. I also would like to go more into how memory disposal is handled (as the logic for disposing of memory is handled at compile time) rather than using a garbage collector, but I will need a bit more time playing with Rust to get that far.

### Rust met my high expectations

Rust has been quite “hyped” and so I was expecting to be disappointed, but I gained a great deal of respect for the language. This isn’t to say Rust is entirely without its faults: I don’t love the handling of extracting values from enums (though I love the idea), a little of the syntax takes some getting used to, and sometimes the low-level aspects of needing to use references gets annoying, but everything they did makes sense; Jan Reimer said it best: *“…they have a clear vision of the language and carefully choose what to add to the language and what to rework”* ([source](https://stackoverflow.blog/2020/06/05/why-the-developers-who-use-rust-love-it-so-much/)) As I have said countless times in this post: everything Rust does is intentional and clean; the developers really knew what they were doing.

I am not sure if Rust will actually dethrone other languages out there on a huge scale, but it likely will (and already has) challenged preconceptions that a low-level language can’t break the mold of C/C++. Until then, I will keep enjoying my tinkering and raise a glass to this most beloved of languages and be one among many voices to shout some love for it at the next Stack Overflow survey.

