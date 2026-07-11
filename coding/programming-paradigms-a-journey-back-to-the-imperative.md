date posted: 2026-07-09
# Programming Paradigms — A Journey Back to the Imperative

![](/images/1-BTFTiskn2oKbIOuEaY58uw.png)

*A Rexx Pi Generator, an older language which is very procedural*

Recently I have been interested in older programming languages, and in the process of discovering more imperative and procedural styles — I have discovered that there are so many definitions to these terms I think one needs a better way to define them. Some define them by “control flow” or the way the code flows from one point to another, and while this works, I think the easiest way to define each is to ask this question: “How are functions handled in these languages?” Which captures much of the same flow philosophy but is simpler to explain.

## Paradigm Definitions

**Imperative**: [Functions take a back seat]: they are either very large or don’t exist. The code is more script-like with long running blocks: GOTO and macros are used to organize code and flow. Examples: Assembly, BASIC, Cobol, Fortran (though Fortran was on the edge of Procedural).

**Procedural**: [Functions are used to organize the code]. GOTO’s and macros might exist, but they take a back seat to function-first organization. Procedure was the old term for function in many languages, and this is the older functional style, hence why this is *not* called “Functional.” Examples: C, Go, Algo, Mojo, Pascal, and Rust (to some extent).

**Functional**: [The functions are the code]*.* They are thrown around as first-class members, closures can store data, they themselves can be stored in variables, they can be piped and chained. They go far beyond organization to expressing very detailed minutia of the code. Examples: Lisp, Haskell, F#, Clojure.

**Object-Oriented**: [Functions are attached to data-structures] and frequently operate exclusively or partially on those data-structures. Examples: Simula, C#, Java, and to a lesser extend C++ (which still shows some procedural ancestry).

There are also a few others like Declarative and Relational, and of course MANY multi-paradigm languages, some of which above might technically fall under those terms as well, but the top 4 general classifications likely can catalog 90% or more of programming language DNA that is out there now (provided you don’t quantify HTML, XML, and SQL as languages)

## A Journey Back to the Imperative

When I first started programming I used BASIC, JS, C and C++. I pretty much wrote them all the same way in a BASIC imperative flow style. It wasn’t until I started working professionally in C# as a Jr. Developer (coming from a Desktop Support role) that I truly understood what objects were while learning C# (a concept I seriously struggled with on C++). It took me forever to understand that an Apple having colors does not mean you need to be able to apply real world logic to structure. As soon as I figured that out, and realized that objects could be abstract, it all clicked and I was hooked, I ate up every detail on OOP in C# I could find.

As functional styles were also unlocked for me and tinkering with Clojure and F# grabbed hold of my imagination, I began to write clever, and probably not “good” code where I was using self-executing anonymous functions everywhere, wrapping everything with chains, etc. In JS I passed around lambdas and self-executing anon-functions like there was no tomorrow, abstracting everything I could with OOP and functional designs. At my peak of absurd abstractions I decided to overload the XOR operator (^) in C# to .ToString(), I greatly apologize to the developer who found those few instances ;) Some programmers have called this the “Astronaut Coder” phase, where the ideas and creativity are grand, but you lose sight of the codebase.

Now that I am approaching my 40s, I have had a chance to reflect on my 25-ish years of programming since my middle school days, and I find myself more and more embracing procedural and well named predictable functions. Not heavy abstraction, basically the code I was writing when I was 13, just a lot cleaner and well intentioned.

### A Blast From the Past

What inspired this article was when I encountered Fortran and Rexx (Rexx is shown above) in a bit of a historical trek through programming languages. I found them extremely easy to understand despite being so old, and while Fortran I would say is slightly odder than Rexx with slightly strange conventions — some of which I like, like enforced type definitions at the top of each subroutine —they both are charming in their own way.

Infact, and this is what I wanted to talk about — they might be *more* readable than many languages of today. It is why I am falling in love with Imperative design (and to a lesser extent its Procedural child). There is a reason we all begin coding long scripts when we first start: it is the easiest to understand. There is also a reason machine-code literally flows over a single string of binary (and uses actual gotos) — it is more efficient for it. And there is a reason AI is good at great at imperative-flows because *AI is* both a computer and (somewhat) a digital brain — meaning it is also once again more important for us to use.

### Conclusion

So is imperative better than the others? Well imperative and procedural are family members, technically procedural code is a form of imperative code even if many people (like me) define them separately. I would say the only real difference (since I hear no one championing 100,000 line files or gotos) is if you think macros is a good way to organize large blocks of code or would rather use functions with more boilerplate but at an improvement to scope transparency.

We have also seen an explosion of languages that, while not ditching objects and functional code, don’t necessary encourage rampant use of it: I would say history is starting to show that Imperative (and thereby Procedural) is winning out: Rusts structs (requiring an outside impl for methods), a lot of people using Python as a more imperative script syntax (over its objects), Mojo arising as a popular more procedural-leaning language, the enduring legacy of C (perhaps the grandfather of procedure), the continued strength of C++ (which while more OOP is more procedural than most OOP langs) and the continued persistence of Fortran in scientific circles (truly imperative), the behemeth that is rising that is Go (maybe the most procedural / imperative of all of these), and even Rust resurrecting macros (an extremely imperative paradigm we have not seen encouraged in most recent languages).

Not only this, it doesn’t seem to me that pure functional or OOP paradigms have ever done well (except for one burst of OOP’s success with JAVA). People might have heard of LISP, maybe even Clojure, F#, R, Simula. But has anyone seriously used them for a large Enterprise application? And how about C#? While it isn’t collapsing, it also isn’t exactly growing — and yet Java *has* been collapsing, and most languages that have any OOP presence these days are either perfectly multi-paradigm or more procedural in nature — even C# seems like it is pulling the plug a bit on pure OOP design now allowing root-level code instead of classes. I would say things are headed to a 20/40/15/15 split of imperative : procedural : func : oop - ratio, which I am happy to see even if I am more a 50/35/5/10 ratio myself.

The future will be interesting, and it is interesting to me to see the old times return — as has happened in so many fields. From streaming->vinyl, phone cameras -> film cameras, from SQL -> Blob -> SQL Again — the old is coming back. Maybe before long the imperative will get even more love and we will see even heavier macro use, and although (not entirely my thing), it would be hilarious to see GOTO make a return after all these years — even if it makes us hate each other — boy oh boy do I look at those little `label` and `goto` guys — a sort of “your cute” … but “ugly” kind of love. ❤
