<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

<!-- date posted: 2026-07-14 -->
# Scoring Code Complexity

Posted: 2026-07-14

Something I have been thinking about a lot lately is how to quantiy code complexity.

A starting point I decided on was to use the Millers Number. It is a number George Miller (a psychologist) determined 
in the 1950s, the idea is:

> The human brain can hold roughly 7 items +/- 2 (5-9) in short term recall

This is something I have mentioned before, and thought quite a bit about, like 
in my [Small and Understandable](https://nathanhoffman.me/coding/small-and-understandable) post.

What got me thinking about this was computing from line count a "Millers Layer" score or the number 
of abstractions the human brain has to unwind to hold the codebase in memory, the rough idea is:

```
difficulty = lines_of_code^(1/6)
```

The 6 is used here (over any other number in the 5-9 range) due to two different ideas:

The first is that **dividing things makes concepts much easier to remember** (this is something I discovered when memorizing 
pi in chunks of 3 digits when I was younger (except for the very first digit which everyone knows) -- 
I still know 100 digits to this day -- 33x3 blocks + 3.x) 6 is extremely divisible given its small size, infact its cousin 60 
is still used for time (carried over from the days of babylon's base-60) because of how divisible it is.

The second is that 7-9 is likely a bit of an over-estimate. In 2001, Nelson Cowan found it was closer to 4+/-1 (3-5 items). The reason he disagreed was that Miller did not try to prevent 
data which could be "chunked" which made the results of his tests allow people to group like items. Since code somewhat allows both (Imagine a for loop with a counter above it or a single computation line). 
 The for loop is a miller-concept, the computation line a conway concept.  6 feels extremely natural to use, as it is the midpoint between both ranges.

---
## Maximum Conception

So if we define 6 as easy to remember, then what is the maximum possible number we can conceive of? My theory is that it is:
```
memorize alone = 6 things  (we already know this)
maximum_conception = 6^6 ~ 47,000 things
```
Or in other words, once we have abstracted more than 6 layers (think about zooming out 6 lines in 6 functions in 6 files in 6 folders ... ) we start to have problems storing 
the map in our heads. At this point not only do we not have the logic in our heads, we can't even hold abstract birds-eye views in our heads.

The one exception to this is true long term memory. In theory, someone could memorize maps of code, as maps of code are not as numerous as lines. Once comitted to long term, this eases recall. 
So it could extend 6^6 even higher, perhaps 6^9, though I would caution that going beyond this means that even combining long term memory with short term mapping overflows the miller limit with 
chunking.

Additionally, AI may aid with these windows -- my argument would be only 1 layer if you didn't want to trust it (6x), 1.5 if you balanced between reviewing and vibing (15x), 
2 if you were willing to vibe it almost completely (36x).

So it is probably fair to say that for reasonably clean code with only 1 developer, we get something like:

| Layer | Solo A+ Lines | Difficulty      | Comments                         | Context
|-------|---------------|-----------------|----------------------------------|--------------
| 1     | 6             | Truly Trivial   | Hello world!                     | All code can be held within ones head without even a screen
| 2     | 36            | Trivial         | Beginners feel comfortable       | All code can be held within ones head with a screen (as an aid)
| 3     | 216           | Simple          | Students feel comfortable        | Within the lower bound of conway (easy memorization of relations)
| 4     | 1,296         | Standard        | Most devs feel comfortable       | Within mid-point of conway (modest memorization of relations)
| 5     | 7,776         | A Bit Tough     | Most devs start to see complexity| Approaching high-end of conway (hard memorization of relations)
| 6     | 46,656        | Difficult       | All devs see complexity          | Surpassed conway, miller chunking begins, **likely the highest most codebases should dare go**
| 7     | 279,936       | Very Difficult  | Progress starts to slow          | Chunking becomes the predominant way to map the code, starts failing as most relations are unchunkable
| 8     | 1,679,616     | Nigh Impossible | Progress grinds to a halt        | Chunking becomes the only way to map the code, confusion at this point is guaranteed
| 9+    | 10,077,696    | Impossible      | Approachable only by the creator | Even chunking starts failing, nearly all context is lost, only the original creators have a chance


      




## Solo Developer Framework

- Dwarf Fortress ~700,000 lines of code (Tarn Adams), possibly the highest lines of code of any solo-project
 - Admitted it was extremely messy
- Stardew Valley (unknown but likely between 100k-1000k lines)
 - Creator admitted it was getting extremely difficult to maintain and add to and it was labarinthian
- SQLLite (~238,000 lines) 
 - Richard Hipp admitted there were some design mistakes, but has generally maintained the project is manageable, he had extensive experience coming into it which likely helped
- Undertale (50k-100k estimate)
 - Described the code as a bunch of rubberbands and determination
- 50K - Considered in some studies to be the approximate maximum at which most devs can maintain a codebase
- htop (48k -> but has community contributions)
    - Acknowledged he sometimes did hasty work on it, but never complained about the quality in any great degree
- Balatro 30,000 lines
    - Specifically commented the code wasn't great and it was "held together with hopes and dreams"
- CP/M as published is around 20k lines, not all of which was likely original to Garys work, but most was
    - Most of the community considers it reasonably clean code
- Data from 
- The Original Linux Kernel 0.01: 10,239 lines of code  (Linus Torvalds)
    - Generally cosidered very clean and well architected
- fd (~5,000)
    - Less information is available, but given no one has complained and the code looks clean on git it is likely reasonable
- Early applications on PDP One (100-10k lines, >10k was rare)
    - Some of early pioneers code started at this size like Richard Stallman, generally prided themselves in quality


So as established, we could memorize 6 lines of code in our heads.

Without writing it down, with a screen we can hold easily in our head 36 lines (maybe 6 functions of 6 lines) since this is only 1 level of paging 
and the screen is there to catch us, as it allows us to temporarily forget the 6 lines and rescan, knowing exactly where 
each group of 6 is (as it fits in our memory).  36 lines can even reside easily in one file (the terminal text 
editor I am using to type this which is zoomed in heavily is showing about 36 lines right now)

But while it is unclear where the human brain breaks down, given modern tooling does allow for organization, files, 
 directories, and even breaking code into modules or microservices, it is HIGHLY unlikely that human beings can even 
conceive of more than 6^6 items, let alone have any idea what is going on, in a system that is our_memory_capacity multipled by itself 
our memory_capacity times. (~47k lines).  I am not saying it is not possible to code more lines than this, but absolutely 
without a doubt, it becomes necessary to constantly abstract maps of the code in your head, blur your understanding of it, 
and it becomes difficult for new devs to wrap their heads around it.

My theory then is that all codebases should strive to keep the difficulty (or miller layers) at <6. with the equation:
```
difficulty = lines_of_code^(1/6)
```

A natural extension of this is to also include the quality of the code, since squaring code 

```
Q = 1 + E*(100-percent_grade)/100
difficulty = lines_of_code^(Q/6)
```

## Including a Team
So far we have assumed complexity for an individual, teams are going 
```
Q = 1 + (E-1)*(100-percent_grade)^2/100^2
difficulty = ((S-1)^2/6*W) + S*(lines_of_code_per_subsys/sqrt(W))^(Q/6)
```
Here a couple of (I hope) reasonable assumptions are made

- S is the number of subsystems that inter-relate (if they have no relation then they fall under the final section)
- 

Subsystems are squared because subsystems share relationships, this assumes every subsystem can touch every other, which 
is not always going to be true but is usually indirectly true, it is a simplification here that may break down on high S 
figures but is "close enough" as it were.

Now each relationship a subsystem shares is divided linearly by Workers (W) as more workers does not mean they must step 
on each other's toes since they are in different codebases (unlike sqrt(W) under lines where they do step on each other). 
The 6 portion of 6W is there to scale subsystem relationships to miller layers. Why this is linear and not sublinear as in 
lines_of_code (216 lines = +3 layers not +36) is because a single line of code 
only accounts for 1 unit of information, a subsystem can act on multiple units of information, adding mental load to 
maintenance, not to mention scaffolding code (which isn't even included here). I will admit this might be the weakest part 
of the model, but it is a simple way to scale it -- and it seems to work quite well.

## Examples
The Linux Kernel (these are approximate workers, quality, etc. from AI estimates)
---
```python
subsystems = 35 with ~6000 drivers (main kernel, smaller drivers are independent and aren't squared)
regular_contributors = 4861->1620 (using 1/3 adjustment for FT eq.: 1620)
quality = 85% (some of it is very clean -- but some driver code and other areas is less than ideal)
lines = 40,000,000
lines_per_subsys = 15,886

Q = 1 + (e-1)*(100-85)^e/100^e
Q = 1.034
difficulty = (((35-1)^2+6000)/1620)^(1/6) + (35*15886^1.034/1620^(1/1.75))^(1/6)

difficulty = 6.020 (Hard)
difficulty_over_hard = 1.01x
difficulty_over_hello_world = 64.9x
```

A Terminal App I Made
---
```python
subsystems = 1
workers = 1
quality = 78% (not super ideal -- but getting better, macros need locked down)
lines = 20,000

Q = 1 + (e-1)*(100-78)^2/100^2
Q = 1.083
difficulty = (((1-1)^2)/1)^(1/6) + (1*20000^1.083/1^(1/1.75))^(1/6)
difficulty = 5.974 (Hard)
difficulty_over_hard = 2^(5.974-6) = 0.98x
difficulty_over_hello_world = 62.9x
```

```
Impossible?: 7+
Hard: 6
Modestly-Hard: 5
Modestly-Easy: 4
Easy: 3
Trivial: 2
Hello-World: 1
```

S1=5900
S2=37200
S3=42300
W=4
Q = 1.06871 < 80
Q = 1.03866 < 85
Q = 1.017182 < 90

((3-1)/4)^(1/6) + ((4425^1.06871 + 18600^1.06871 + 31725^1.06871)/4^(1/1.75))^(1/6)
((3-1)/4)^(1/6) + ((4425^1.01718 + 18600^1.01718 + 31725^1.01718)/4^(1/1.75))^(1/6)

80%: 7.45
90%: 6.88

---

## Totalling all poss


