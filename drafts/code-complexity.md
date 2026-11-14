<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->
<!-- title: Scoring Code Complexity — Blog of Nathan Hoffman -->

# Computing Code Complexity (n-Factor)

## What makes code complex?
Code complexity is really a question about size moreso than how clean and organized it is (though that plays a role). If a child creates the most messy arrangement they can with the number of objects in their room but there are only 4, there is only so much they can do. 

This whole post began as I was thinking about Miller's Number which I discussed in [Small and Understandable](https://nathanhoffman.me/coding/small-and-understandable) where a psychologist in the 1950s named George Miller determined that:

> The human brain can hold roughly 7 items +/- 2 (5-9) in short term recall

In 2001 Nelson Cowan found something different: we could only remember 4+/-1 (3-5 items). The reason for the difference is that George Miller was estimating items that could be grouped. Think about having a grocery list that you left at home that had the ingredients for pasta: noodles, tomato sauce, olive oil and garlic, you might group all 4 items into your head as "pasta" thus making it easier to remember what was on the grocery list in the first place. Even moreso, Miller himself admitted that getting to numbers greater than 7 required incredibly simple information like duplicate numbers of objects.

This short term recall is what we rely on constantly as programmers: we scan information and try to map it out in our head. With only 3-7 items possible in our short-term, we also encounter a "comprehension-maximum" or in otherwords the largest amount of stuff we can even conceptually imagine. This is what I call n^n. Think of it as trying to store the conceptual map in your head of how things are interelated. 

## How complexity scales

Lets say you have 5 items on your grocery list, but leave it at home, you are probably still able to remember what was on the list (based on Miller and Conway's findings). Now let us say you had put 5x5 items on your grocery list (grouping the 5 items each under 5 categories) you might not remember the items but you would remember the 5 general categories of what you needed: spices, vegetables, drinks, etc. Similarly if you abstract this to a shopping list for each physical location of which there are 5 (hardware store, grocery store, electronics store, etc.): then you end up with 5^3 (125 things you need to buy). What I was curious about is what happens if we have so many things we need to buy and this layering scales that the layering itself exceeds the number of things we can remember? This would be like organizing folders within one another so much that you dont remember the heirarchy. In our recipe example this is akin to having so much you needed to do with shopping just one of them, and so many stores you needed to visit, that by the time you got there you forgot your purpose was to buy things at all, you have the list, but you forgot what it was for.

Another way to think about this is if the number of groupings you can conceive of is also limited by Conway then the maximum scale a human can reasonably conceive of must lie between 3^3-5^5 (27 to 3,125) likely 27 is easy to conceive of and 3,125 stretches the boundaries of what we can stretch our brain to even imagine. This is Conway-based since scale requires discrete-distinct imagining of units.

Yet another way to imagine this is like a manager managing employees an organization of 5^5 would be 5 levels deep with 3,125 employees that is probably fine, but extract it a few more layers and people can't even remember every one of their bosses-bosses a sign things have gone seriously awry.

Now code isn't memorization or imagining scale but like everything else it almost certainly falls within that 3^3-7^7: 27-824k unit range, and this is only true if the 6 & 7 ranges can somehow be grouped in some measure, and I think it can be for code.

## Mapping n^n onto Code (solo & manually written - no AI assistance)
The most obvious thing to do is to map n (the items we were buying in our example before) onto lines. The interesting thing is that whether we use lines as a single item depends on experience:
- n=1 (1 line): Someone **off the street** struggles with a single line they see it as 3-5 (Conway) words or symbols and have no ability to group anything (1 line).
- n=2 (4 lines): Someone who has coded a **hello world** understands individual lines but not how they work together (3-5 conway lines) (conveniently 2^2)
- n=3 (27 lines): Someone who has **dabbled** a bit might finally be able to use lines together like loops combined with ifs low_conway^low_conway (3^3 = 27 lines).
- n=4 (256 lines): Someone who is into schooling or has made code a bit of a **hobby** might handle mid_conway as their line parsing improves, they can code a large linear script (4^4 = 256 lines)
- n=5 (3k lines): Someone who has now coded for a couple years: maybe a graduate or starting jr. dev is now doing well with line syntax and some concepts: high_conway (5^5 = 3,125 lines)
- n=6 (47k lines): Someone who is a **professional** or an enthusiastic hobbiest now has enough experience that they can (at times) think in blocks rather than lines (a modest Millers number). (6^6 = 46,656 lines).
- n=6.5 (192k lines): Someone who is a **typical professional** now can manage this much code by relying on long-term memory from working on the project and having enough experience to group even more concepts together.
- n=7 (824k lines): A highly-experienced **architect or senior** at their absolute ceiling with tons of experience, maximal work on the codebase, and brute force might push this high: this is the highest Miller's number for practical grouping of complex information. Decades of commitment on the codebase is likely required to maintain it. (7^7=823,543 lines). *It should be noted this is an absolute ceiling: most sr. devs are probably much lower.

## Comparing to Realworld n-s (these are pre-AI numbers)
- **7.0:** Dwarf Fortress ~700,000 lines of code (Tarn Adams), possibly the highest number of lines of any solo-production-project
    - Admitted it was extremely messy
- **6.3 - 7.1** Stardew Valley (unknown but likely between 100k-1M lines)
    - Creator admitted it was getting extremely difficult to maintain and add to and it was labarinthian
- **6.6** - SQLLite (~238,000 lines) 
    - Richard Hipp admitted there were some design mistakes, but has generally maintained the project is manageable
- **6.0 - 6.27** - Undertale (50k-100k estimate)
     - Described the code as a bunch of rubberbands and determination
- **6.0** - htop (48k -> but has community contributions)
    - Acknowledged he sometimes did hasty work on it, but never complained about the quality in any great degree
- **5.8** - Balatro 30,000 lines
    - Specifically commented the code wasn't great and it was "held together with hopes and dreams"
- **5.7** - CP/M as published is around 20k lines, not all of which was likely original to Garys work, but most was
    - Most of the community considers it reasonably clean code
- **5.5** - The Original Linux Kernel 0.01: 10,239 lines of code  (Linus Torvalds)
    - Generally cosidered very clean and well architected
- **5.2** - fd (utility) (~5,000)
    - Less information is available, but given no one has complained and the code looks clean on git it is likely reasonable
- **3.6 - 5.4** - Early applications on PDP One (100-10k lines, >10k was rare)
    - Some of early pioneers code started at this size like Richard Stallman, generally prided themselves in quality


## How AI Plays In
To imagine how AI can be factored into our equation think about a customer save feature:

[6 lines of code]<-Save Customer To Table <- Save Customer Fn <- Save Customer Button <- Customer Profile Component <- Page [6 Pages in the app].

Now if we use AI to abstract one layer (n-1) or in otherwords effectively 100% vibe the lines of code that determine how things happen (our 6 lines above) we lost sight of the SQL tables, the customer object, how it is saved. What is worse though is that since knowledge is not a hard cut-off but a fuzzy cut off, it is more probable that you will also forget the customer is even saved to a SQL table in the first place (in the same way you might have forgotten what 1 of those 6 lines did when u manually coded it). At that point it could result in some awkward interactions with an attentive business owner.

At 0.5 layers it is a bit more feasible you likely still know perhaps the main customer table, the fuzziest details on how we might save it, but importantly you definitely know that we save the customer and can answer business owners: as a result I surmise AI is best when used somewhere in the 0.25 to 0.75 n-range (roughly one-half layer up). Below is a table to get a sense of how much more more productive you could be at each AI delta at relative sizes of your code base (n).

| n | lines | Δ = -0.25 | Δ = -0.50 | Δ = -0.75 | Δ = -1 |
|---|---|---|---|---|---|
| 5 | 3,125 | 1.9x | 3.6x | 6.7x | 12.2x |
| 5.5 | 11,803.1 | 2.0x | 3.8x | 7.2x | 13.6x |
| 6 | 46,656 | 2.0x | 4.0x | 7.7x | 14.9x |
| 6.5 | 192,281.2 | 2.0x | 4.1x | 8.2x | 16.3x |
| 7 | 823,543 | 2.1x | 4.3x | 8.7x | 17.7x |


### The Ideal Solo-Dev Codebase
What is interesting is that 6-6.5 is likely the range for most experienced non-AI devs are comfortable with and thus adding +0.5n to that limit for AI use gets us 6.5-7. Meaning most devs both with or without AI likely should find a responsible ceiling somewhere between n=6 and n=7, and even in a world of AI an n of 6.5 (~200k) lines remains a good suggestion for most solo-coders to start putting on the brakes once they surpass it. Below is the tables we discussed merged for a general scale:

| n | Lines | Programmer tier | Real World Pre-AI Examples | Sr. Dev without AI | Sr. Dev with AI |
|---|---|---|---|---|---|
| 1 | 1 | Novice | - | Trivial | Trivial |
| 2 | 4 | Hello-world coder | - | Trivial | Trivial |
| 3 | 27 | Dabbler | - | Trivial | Trivial |
| 4 | 256 | Hobbyist or student | - | Trivial | Trivial |
| 5 | 3,125 | Junior developer | Early PDP applications (Meticulous (scrupulous)); fd ~5k (Probably clean) | Very easy | Trivial |
| 6 | 46,656 | Typical Professional | Linux 0.01 10,239 (Very clean); CP/M ~20k (Clean); Balatro ~30k (Admittedly poor); htop ~48k (Acceptable); Undertale 50k-100k (Makeshift (improvised)) | **Reasonable** | Easy |
| 6.5 | ~192k | Professional Ceiling | Stardew Valley 100k-1M (Labyrinthine (convoluted)); SQLite ~238k (Manageable) | Difficult | **Reasonable** |
| 7 | 823,543 | Senior or Architect Ceiling | Dwarf Fortress ~700k (Messy) | Great hardship | Difficult |
| 7.5 | ~3.66M | Potentially Beyond Manual Code (Team efforts only) | - | Probably Impossible | Great Hardship |
| 8 | ~17M | Potentially Beyond AI Code (Large Companies Only) | Modern Linux Kernel, Chrome, Worlds Largest Applications | Absolutely Impossible | Probably Impossible
| 9 | ~387M | Huge Companies Only | Entire codebase of Google | Absolutely Impossible | Absolutely Impossible
| 10 | ~10B | Human Civilization Effort | - | Absolutely Impossible | Absolutely Impossible

## Including Quality and Team Size
As a simple adjustment you can include Quality and Team Size simply, although I have less evidence to back this my quick modification uses:

```
effective_lines = lines/sqrt(team_size)
quality_adjustment = percent_grade/100 - 0.75

// compute_n_to_n is not perfectly solvable so you need to either guess at it or use nested logs
n_factor = compute_n_to_n(effective_lines) + quality_adjustment
```

This means that quality actually can allow you to punch above your weight if it rises above a C grade of 75%. The way I see the grade for quality is "what % of the code base am I reasonably happy with?" The fact this ranges an entire n from -0.75 to +0.25 modifier means quality can make as much of a difference as AI, however since most codebases are not <50% and AI started at 0% in most practical scenarios more can be gained from A-use than cleaning up code. This also means that like AI, code quality is exponential, increase the amount of it, and you can get exponentially more done.

If you want to play around with some of this math I have a [utility here](https://data.nathanhoffman.me/maintainability-calculator)

## Final Thoughts
The n-factor is interesting because it can be thought as a scale from 1-100dn or deci-n.  With 100 being a humanity level effort, and 1 being a random person off the street seeing code for the first time. It is a pretty convenient scale to judge code quality and comprehension. There are other factors such as how dense a language is since some languages are wordier than others while others support heavy functional approaches on single lines or can do the whole game of life in one line (like APL), but in general I think the general magnitude of the scale holds. I do have ideas on how to adjust for language density though and it will be in a forthcoming post!

