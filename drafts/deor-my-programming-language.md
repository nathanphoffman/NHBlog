<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

# Deor — My Programming Language

![](/images/0-iY8Hz-qPvcL1dS8r.png)

*Little Deer Mascot*

*I recommend going to* [*deor.dev*](https://deor.dev) *if you want to get started.*

Although I have been working on a few projects over the last couple months, continuing a massive coding binge I have been on, I spent much of that time on a programming language called “[Deor,](http://deor.dev)” old English for deer (pronounced D-ay-or but I prefer the more familiar Dee-or). It is cheer-leaded by a simple sprite of a red deer, emblematic of: leanness (limited syntax), red-rustyness (for its red-crab Rust heritage), occasional but reserved antler power (machine-code), predictability (opinionated code patterns), yet its pleasantness (readability), and peacefulness (ease prioritized over power) — except where needed.

```
# A really simple example of its ease of readability
fn ask_and_repeat()
  print("What would you like to say?")
  (first) in input()
  print(s_join(["You said ", first]))
```

One of the chief motivations behind Deor was to find a way to make Rust a more pleasant experience to write, a bit Python-like, with a bit of my own flare from many languages I love, while not actually creating an entirely new compiler (like Mojo), allowing use of crates and Rust code. *Deor clones everything by default to make it easier to work with and avoid ownership (but copy types get uncloned by the compiler since they dont need it) Ownership still exists with the move keyword.*

```
# for loops are a bit reminiscent of python and other simpler languages
# deconstruction is the only way to access fields deor reads like a book
for item in collection
  (name) in item
  print(name)

# count from 1 to 10, but it uses the - index like other langs
for idx in range(2,11)
  print(idx)
```

I found myself on many occasions trying to do extremely simple patterns where I really didn’t care about performance or the ownership pattern, I wanted to opt-in when needed rather than opt-out. I also didn’t care much for the way Rust handles strings out of the box, with both String and string slices of &str. I realized that if I transpiled to Rust I could still allow raw rust to be inserted into the code in rust blocks (or even wrapped in Deor functions as helpers), infact this is how Deor handles many system functionality like strings and lists to keep the transpiler lean.

```
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

I do want to say here that I respect rust immensely, it may be the low-level language to end all low level languages — esp. for those trying to do OS development — it recently allowed me to use an alloc library to replace the std lib for a unikernel that had no base support for heap/vectors —insane! However, these I find are the exceptions to the rule — why not have both so that you can use whichever your application demands? If Deor transpiles to Rust, why can’t they live in harmony?

Another one of my chief motivations was to lean HEAVILY into procedural and imperative code designs. This means this is the closest you can get to OOP is this, which is to say literally not at all ;)

```
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

Structs are not reference types, they are treated as values and cloned around and are fully immutable. Further rejecting OOP design — if you want to try to modify a struct you must create a new one. The good news is the “with” pattern makes this easy to construct a new struct using a base with new fields.

```
fn Person change_struct_name(Person person, string first_name)
  new_person as person with (first_name)
  return new_person
```

There are no interfaces, classes, methods, or even ways to attach functions to objects like many other more procedural languages these days (like Rust impl). It takes a hard stance, going back more towards the days of Fortran 90 and C (structs are only structure)

For funcctional patterns like lambdas, closures, etc. there is very little support by intention — as this would overcomplicate things — rust blocks exist for that! The only pattern that survives is that a declared function can be passed as a first class member if it has one in and one output, this was added to still allow use popular first-class patterns like filter() / map(), etc. — but those are still up to you to create.

```
shape filterFn as func of Employee to bool
shape employeeList as list of Employee

fn employeeList filter(employeeList employees, filterFn filter_employee)
  employeeList employee_results = empty
  for employee in employees
    is_match as filter_employee(employee)
    if is_match
      employee_results at end = employee

  return employee_results
```

You will notice above there are no generics in a traditional sense, only symbols which are a bit restrictive (must be explicitly defined and have only 1 param : 1 output for funcs) this is another part of the Deor philosophy: only human-language not symbol-language. Just like when reading a book you will not find {} or <> you will not find them in Deor either. You will also rarely see colons or semicolons, same thing in Deor (actually they don’t exist at all). Paranthesis are used mainly to break up the world flow and are probably more common than both : and semicolons in texts — though the jury is out on that one — but it is such standard programming convention removing it would *decrease readability* — a cardinal sin in Deor.

All of this sounds highly limiting until you realize how much code is just this simple, and when it is more complex or in need of power — break out those rust blocks!
