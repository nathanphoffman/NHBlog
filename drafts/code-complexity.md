<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->
<!-- title: Scoring Code Complexity — Blog of Nathan Hoffman -->

# Computing Code Complexity (n-Factor)

## What is complexity?
Code complexity in my opinion is mostly about size and our inability to understand that size rather than how the code is structured. If a child creates the most messy arrangement they can with the number of objects in their room but there are only 4, there is only so much they can do. Quality does play a role such as having 1000 objects and grouping them in to 10 groups, but quality definitely takes a back seat to scale. 10 groups of 100 is still far far harder to reason about then 4 randomly scattered objects.

This whole post began as I was thinking about Miller's Number which I discussed in [Small and Understandable](https://nathanhoffman.me/coding/small-and-understandable) where a psychologist in the 1950s named George Miller determined that:

> The human brain can hold roughly 7 items +/- 2 (5-9) in short term recall

Furthermore, in 2001 Nelson Cowan found we could only remember 4+/-1 (3-5 items). The reason for the difference is that George Miller was estimating items that could be grouped. Think about having a grocery list that you left at home that had the ingredients for pasta: noodles, tomato sauce, olive oil and garlic, you might group all 4 items into your head as "pasta" thus making it easier to remember what was on the grocery list in the first place. Even moreso, Miller himself admitted that getting to numbers greater than 7 required incredibly simple informatio like duplicate numbers of things which could be quantified.

This short term recall is what we rely on constantly as programmers: we scan information and try to map it out in our head. With only 3-7 items possible, we also encounter a "comprehension-maximum" or in otherwords the largest amount of stuff we can even conceptually imagine. This is what I call n^n. Think of it as trying to store the conceptual map in your head of how things are interelated. 

## How complexity scales

Lets say you have 5 items on your grocery list, but leave it at home, you can probably remember them fairly well (based on the Miller and Conway findings). Now let us say you had put 5x5 items on your grocery list (5 groups of 5) you might not remember the items but you might remember the 5 general categories of what you needed: spices, vegetables, drinks, etc. Similarly if you abstract this to a shopping list for each physical location of which there are 5 (hardware store, grocery store, electronics store, etc.): then you end up with 5^3 (125 things). What I was curious about is what happens if we continue this layering and reach 5^5...5^6...5^7 now even the map of the abstraction we start to forget. If we can only remember 5 items then I forget what the heirarchy even is, it is akin to leaving your house, arriving at the store but then wondering why the heck you arrived, were you meeting a friend here?

Another way to think about this is if the number of groupings you can conceive of is also limited by Conway then the number of maximum scale a human can conceive of must lie between 3^3-5^5 (27 to 3,125) likely 27 is easy to conceive and 3,125 stretches the boundaries of what we can stretch our brain to handle. Since conception requires ditinct understanding and thus Miller is not applicable.

Now code isn't memorization or imagining scale we have tools and organization available to us so it is likely it is more appropriately somewhere in the (3^3-7^7) 27-824k unit range.

## Mapping n^n onto Code (manually written - no AI assistance)
The most obvious thing to do is to map n (the items we were buying in our example before) onto lines. The interesting thing is that whether we use lines as an item depends on experience:
- n=1 (1 line): Someone **off the street** struggles with a single line they see it as 3-5 (Conway) words or symbols and have no ability to group anything (1 line).
- n=2 (4 lines): Someone who has coded a **hello world** understands individual lines but not how they work together (3-5 conway lines) (conveniently 2^2)
- n=3 (27 lines): Someone who has **dabbled** a bit might finally be able to use some lines together low_conway^low_conway (3^3 = 27 lines).
- n=4 (256 lines): Someone who is into schooling or has made code a bit of a **hobby** might handle mid_conway as their line parsing improves (4^4 = 256 lines)
- n=5 (3k lines): Someone who has now coded for a couple years: maybe a graduate or starting jr. dev is now mastering line syntax and basic concepts: high_conway (5^5 = 3,125 lines)
- n=6 (47k lines): Someone who is a **professional** or an enthusiastic hobbiest now has enough experience that they can (at times) see lines instead as blocks that work together (a modest Millers number). (6^6 = 46,656 lines).
- n=6.5 (192k lines): Likely practical max for most career devs (a balance between 6 and 7: see below on n=7)
- n=7 (824k lines): A highly-experienced **architect or senior** at their absolute ceiling with tons of experience, maximal work on the codebase, and brute force might push this high: this is the highest Miller's number for practical grouping of complex information. Decades of commitment on the codebase is likely required to maintain it. (7^7=823,543 lines). *It should be noted this is an absolute ceiling: most sr. devs are probably more like 6.5.*

## Comparing to Realworld n-s
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


### The Ideal
What is interesting is that 6-6.5 is likely the range for most non-AI devs are comfortable with and thus adding +0.5n to that limit for AI use gets us 6.5-7. Meaning most devs both with or without AI likely should find a responsible ceiling somewhere between n=6 and n=7. Below is the tables we discussed so far merged for a general scale:

| n | Lines | Programmer tier | Real World Pre-AI Examples | Sr. Dev without AI | Sr. Dev with AI |
|---|---|---|---|---|---|
| 1 | 1 | Novice | - | Trivial | Trivial |
| 2 | 4 | Hello-world coder | - | Trivial | Trivial |
| 3 | 27 | Dabbler | - | Trivial | Trivial |
| 4 | 256 | Hobbyist or student | - | Trivial | Trivial |
| 5 | 3,125 | Junior developer | Early PDP applications (Meticulous (scrupulous)); fd ~5k (Probably clean) | Very easy | Trivial |
| 6 | 46,656 | Typical Professional | Linux 0.01 10,239 (Very clean); CP/M ~20k (Clean); Balatro ~30k (Admittedly poor); htop ~48k (Acceptable); Undertale 50k-100k (Makeshift (improvised)) | Achievable | Easy |
| 6.5 | ~192k | Professional Ceiling | Stardew Valley 100k-1M (Labyrinthine (convoluted)); SQLite ~238k (Manageable) | Hard | Achievable |
| 7 | 823,543 | Senior or Architect Ceiling | Dwarf Fortress ~700k (Messy) | Extreme hardship | Hard |
| 7.5 | ~3.66M | Potentially Beyond Manual Code | - | Impossible? | Extreme Hardship |
| 8 | ~17M | Potentially Beyond AI Code | Modern Linux Kernel, Chrome, Worlds Largest Applications | Impossible | Impossible?
| 9 | ~387M | Potentially Beyond Teams | - | Impossible | Impossible
| 10 | ~10B | Potentially Beyond Humanity | - | Impossible | Impossible

## Including Quality and Team Size
As a simple adjustment you can include Quality and Team Size simply, although I have less evidence to back this my quick modification uses:

```
effective_lines = lines/sqrt(team_size)
quality_adjustment = percent_grade/100 - 0.75

// compute_n_to_n is not perfectly solvable so you need to either guess at it or use nested logs
n_factor = compute_n_to_n(effective_lines) + quality_adjustment
```

If you want to play around with some of this math I have a [utility here](https://data.nathanhoffman.me/maintainability-calculator)

## Final Thoughts
The n-factor is interesting because it can be thought as a scale from 1-100dn or deci-n.  With 100 being likely a humanity level effort, and 1 being a random person off the street seeing code for the first time. It is a pretty convenient scale to judge code quality and comprehension. There are other factors such as how dense a language is since some languages are wordier than others while others support heavy functional approaches on single lines or can do the whole game of life in one line (like APL), but in general I think the general magnitude of the scale holds. I do have ideas on how to adjust for language density though and it will be in a forthcoming post!


