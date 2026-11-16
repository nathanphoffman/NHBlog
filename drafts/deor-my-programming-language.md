<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->
<!-- title: Deor — My Programming Language — Blog of Nathan Hoffman -->

# Deor — My Programming Language

![](/images/0-iY8Hz-qPvcL1dS8r.png)

*Little Deer Mascot*

*I recommend [deor.dev](https://deor.dev) if to get started, there is a pi-calculator there as an example.*

Although I have been working on quite a few projects, continuing a massive coding binge I have been on, I spent a good chunk of that time on a programming language called "Deor" old English for deer (technically pronounced D-ay-or but I prefer the more familiar Dee-or). It is cheer-leaded by a simple sprite of a red deer, emblematic of: leanness (limited syntax), red-rustyness (for its red-crab Rust heritage), occasional but reserved antler power (machine-code), predictability (opinionated code patterns), yet its pleasantness (readability), and peacefulness (ease prioritized over power) — except where needed.

## Basic Usage
```deor

# included libraries: in this case convert for c_* libs (c_int_to_string) and string: s_* s_join
import "lib/convert.deor"
import "lib/string.deor"

# A really simple example of its ease of readability
fn ask_and_repeat()
      print("What would you like to say?")
      (first, args) in input()

      const string EMPTY = ""

      if first is not EMPTY
            print(first)
      else
            print("all args are empty")

      int total_args = len(args)
      print(s_join["total args were ", c_int_to_string(total_args)])

```

Here input() takes in console input, you can specify first, second, and third as shortcuts for those positions and args contains a full array/vector of arguments passed.

## Imports
Import paths are relative to the root no matter what file is calling them. Deor works a bit like C where all items are hoisted into the same shared namespace, so all functions, structs, etc. throughout the application must named differently (which enforces wordy and good human naming -- a deor principle) and if you import the same file in multiple files the transpiler will only import it once at the first site it was called (so multi-imports are ignored). As a result import ordering can matter, and so it is recommended to not have to keep track of nested file ordering, to simply import everything in your main file or have your main file import an import file: standard convention is an imports.deor. This allows you to track the load order of all the imports in a single place instead of having to guess how imports are loaded in.

Importing uses the convention import "path" there is also a "generic" form where the import performs a T-substitution specifically to address the lack of generics in deor, some built-in libs in deor even use this like lists.

```deor
# standard import
import "src/hello_world.deor"

# a lost of integers
import "lib/list.deor" where T = int

fn int_things()
      intList nums = [10, 20, 30]

      int first_val = l_int_first(nums)
      print(first_val)

      needle as 20
      bool has_20 = l_int_contains(nums, needle)
      print(has_20)

      ninety as 90
      intList pushed = l_int_push(nums, ninety)
      print(len(pushed))

```

## Rust Interop and Libs
One of the chief motivations behind deor was to find a way to make Rust a more pleasant experience to write, a bit Python-like, with a bit of my own flare from many languages I love, while not actually creating an entirely new compiler (like Mojo), by transpiling directly to rust it gains the power of rust’s compiler and allows use of crates and raw Rust code in blocks. 

Because deor transpiles to rust there is little reason to reinvent basic helpers and system functions, so you likely noticed the use of s_join and c_int_to_string from the libs imported at the top, these are just deor files that wrap a rust block to prevent deor from having to reinvent the wheel or contaminating the transpiler with more system built-ins.  Internally the two libraries look something like this is and is something you could easily define yourself using a 'rust' block -- all items in a rust block are just passed through as rust when the code is transpiled so it inserts exactly as you wrote it (minus the rust keyword).

**lib/string**:
```deor

fn string s_join(stringList parts)
    rust
        parts.join("")

fn string s_to_upper(string str)
    rust
        str.to_uppercase()

fn string s_to_lower(string str)
    rust
        str.to_lowercase()
```

**lib/convert**:
```deor

fn string s_join(stringList parts)
    rust
        parts.join("")

fn string s_to_upper(string str)
    rust
        str.to_uppercase()

fn string s_to_lower(string str)
    rust
        str.to_lowercase()

# ... (cut for brevity)

```

The convention for libraries like this is that they go in the /lib folder (the deor installation puts a handful of basic ones there for you including these). It is recommended to lead all lib functions with a single letter, the reason for this is because Deor encourages spelling things out to at least 3 letters (all variables must be 3 letter names) so a single letter is a bit unusual, and it is meant to stand-out as a bit less-human to catch your intention and understand it is standard-deor (the machinery) not human (as in you) written.

If you are writing a third party library we encourage an x before the first letter so if I was creating a time library of my own choosing it would be xt_ (my external time library) t_ suggests it is a Deor-specific one.


## Structs: Procedural not OOP

Another one of my chief motivations was to lean HEAVILY into procedural and imperative code designs. This means this is the closest you can get to OOP is this, which is to say literally not at all ;)

```deor
struct Person
      string first_name
      string last_name
      int age

fn Person get_nate()
      first_name as "Nate"
      last_name as "Hoffman"
      age as 18              # heh heh I wish

      Person nate = (first_name, last_name, age)
      return nate
```


Structs are not reference types, they are treated as values: cloned, and are fully immutable. Furthermore, if you want to try to modify a struct you must create a new one. The good news is the “with” pattern makes this easy to construct a new struct using a base with new fields.

```deor
fn Person change_struct_name(Person person, string first_name)
      new_person as person with (first_name)
      return new_person
```

There are no interfaces, classes, methods, or even ways to attach functions to objects like many other more procedural languages these days (like Rust impl). It takes a hard stance, going back more towards the days of Fortran 90 and C (structs are only structure)

## Ownership and Loops
If you know anything about Rust you know that ownership is a big concept, for those of you who are not aware: rust is very opinionated and will pass in ownership of a variable into a function (for instance) making it totally unavailable without special modifiers applied like borrowing (&). To avoid the hassle of ownership and lean into ease that deor professes, all values are cloned nothing is ever shared, so if you pass a variable to a function (no matter what it is -- even a huge list of big structs) it will get cloned by default, this can be particularly problematic in a loop these two concerns: loops and ownership is something to keep very much in mind while using deor as it is its two largest pitfalls which can be avoided with  more performant deor approaches (sometimes macros can help), the move keyword, and simply just using rust blocks or wrappers to do it the proper rustaceon way.


```deor
# for loops are a bit reminiscent of python and other simpler languages
# deconstruction is the only way to access fields to make Deor read like a book
for item in collection
      (name) in item
      print(name)

# count from 1 to 10, --it uses half-open ranging per rust convention
for idx in range(1,11)
      print(idx)

# this move keyword (as mentioned above) restores rust ownership and moves the record to the function
process_employees(move employee_records)
# employee_records blows up if used here

# without move this works just fine, but keep in mind that employee_records is cloned here a 2nd time:
process_employees(employee_records)
log_employees(employee_records)

```

Deor is easy-by-default and then harder if you want to gain optimal-performance which is the way it should be, get the code written and then clean up where needed. There is no reason to be typing in astrophysics equations when u just want to do some amateur astronomy, but it is good to know you have that astrophysics book in your back pocket!


## First Class Functions
For functional patterns like lambdas, closures, etc. there is very little by intention — as this would overcomplicate things — rust blocks exist for that! The only pattern that survives is that a declared function can be passed as a first class member if it has one in and one output, this was added to still allow use popular first-class patterns like filter() / map(), etc. — but those are still up to you to create.

```deor
shape filterFn = func of Employee to bool
shape employeeList = list of Employee

fn employeeList filter(employeeList employees, filterFn filter_employee)
    employeeList employee_results = empty
    for employee in employees
        is_match as filter_employee(employee)
        if is_match
            employee_results at end = employee


      return employee_results

# Usage of the above
fn bool look_for_john(Employee employee)
    const JOHN as "John"
    (first_name) in employee
    is_john as first_name is JOHN
    return is_john

fn employeeList get_john_matches(employeeList employees)
    john_matches = filter(employees, look_for_john)
    return john_matches



```

## Human Readabiliy

You will notice above there are no generics in a traditional sense, only symbols which are a bit restrictive (must be explicitly defined and have only 1 param : 1 output for funcs) this is another part of the Deor philosophy: only human-language not symbol-language. Just like when reading a book you will not find {} or <> you will not find them in Deor either. Parenthesis are used mainly to break up the word flow and parenthesis probably more common than both : and semicolons in texts — though the jury is out on that one — but it is such standard programming convention removing parens would *decrease readability* — a cardinal sin in Deor.

As for typing in Deor I kept things simple, there are just a handful of types:

```deor
float e = 2.71828   # 64 bit signed
int three = 3       # 64 bit signed
bool isTrue = true
string hello_world = "Hello World"

# deor allows supports rust-like implicit assignment
pi as 3.14159265    # can be used for any type, so long as it is determinable
```

## Validator Types (and Null / Option Handling)

One of the chief decisions of Deor was that nulls should not be allowed and that Options in rust while the far better form, are also anti-Deorian to work with. C (one of Deor's influences) uses sentinels for null values (stand in defaults). In Deor the idea was to force the user to define a "Validator Type" that effectively explained why a value is not valid (why is it null?  why is it undefined?  why is it simply not valid?)

```
type Squarefeet(int sqft)
      sqft > 0 and sqft < 1_000_000

fn set_squarefeet(int user_sqft)
      Squarefeet sqft = user_sqft
      if sqft is valid
          return avow sqft
      else
          return 0

```
avow is used as a human-first syntax for Rusts "unwrap" which sounds more technical than human, it uses Rust's unwrap under the hood to return the value or throw an exception (thus the strongness of avow being "I really for sure know this is valid") and is almost always to be used with a check on validity using the "valid" keyword in Deor.

For closer types to an Option type and true null, there is a rust wrapper provided in the default libs called ""