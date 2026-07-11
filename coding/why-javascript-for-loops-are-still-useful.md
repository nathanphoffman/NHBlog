date posted: 2020-02-25
# Why JavaScript for-loops are still useful

I feel like more and more, for loops are becoming despised, and while some scratch their heads and wonder why, others are looking at the mere usage of a for loop as a sign of a green and inexperienced developers who do not know how to use Array methods. I have fallen into this trap on many occasions often feeling like I was doing something wrong when I plugged in a `for` rather than a map or a reduce, but while there are reasons why Array methods are usually better, they aren’t **always** better.

Before I argue the cases in favor of for-loops, I want to mention that there are many cases where Array methods are far superior:
- + If you have source data, you can map and filter the data without manually keeping track of indexes.
- + Rather than capturing a variable using the index of the for loop, you are provided it as a parameter of your anonymous function.
- + You do not need to mutate data as you do with a for loop, you simply return it.
- + Using Array methods enforces a more encapsulated coding approach since everything is usually wrapped in smaller batches of work and smaller functions.
- + For multiple reasons above, it is easier to know what is going on inside each Array method, whereas For loops generally encourage large unwieldy code that mutates the function block the for loop is inside of.

> **But!** we aren’t here to make the case for using Array methods, we are trying to find those exceptions where they don’t quite work.

**The cases against using Array Methods:**
- — In the case of not having source data, you must generate the Array you are iterating over. In rarer cases, this can be very convoluted and even — impossible.
- — You cannot break out of a map, reduce, or a filter; this can cause performance problems for large iterations, though in certain cases Array.find can supplant this.
- — The this context is lost when using arrow functions, unless you also use bind(this) or the more wordy “function”

*The this context is a minor point in comparison to the first two, so we shall ignore it and focus on: not having source data & performance.*

So let us start with a usual textbook case that I think shows where Array methods are better. If you have source data (classmates) and performance/control doesn’t matter (getting any classmate in an array) then you will want to use Array methods over a for loop.

```
let matches = classmates
  .filter(classmate=>classmate.name === ‘John’)
// vs
let matches = [];
for(let i = 0; i < classmates.length; i++)
{
  if(classmates[i].name === ‘John’)
    matches.push(classmates[i])
}
```

But, this can get convoluted if the array is huge, it is sorted, and we want to exit for performance reasons. Here we have to abuse Array.find, and mutate outside of our Array method — now for loops aren’t looking so bad:

```
let arr = []
let matches = classmates.find(classmate => {
  if(classmate.name > 'John') return arr
  else if(classmate.name === 'John') arr.push(classmate)
})
// vs
let matches = [];
for(let i = 0; i < classmates.length; i++)
{
  if(classmates[i].name === 'John') matches.push(classmates[i])
  else if(classmates[i].name > 'John') break
}
```

But things really start to breakdown if we don’t have an Array/dataset to work with. Sure, for simple arrays such as looping through the numbers 0–9, we can do this easily enough:

```
let arr = [...Array(10).keys()]
```

But what if the Array relied on the contents of the loop itself? What if we iterated a for loop over a calculation for Pi that got ever-increasingly more accurate? What if we wanted to stop when the calculation was within 1% accuracy? We don’t know how many attempts or iterations this should take, should it take n, where n is 1–1000 or n where n is 1–100,000? or n where n is 1–1,000,000? We have to keep looping until the condition is satisfied. The only way outside of a for loop (and outside of while/recursive functions) is to generate an absurdly large array based on a guess and exit out early with find logic, mutating an external array. Look at this monstrosity:

```
// guessing this will take a million iterations?
// this is going to be a huge array!
let rangeArr = [...Array(1000000).keys()]
let pi = 0
let matches = rangeArr.find(n=> {
  if(isAccurate(pi)) return pi
  else pi += nextPi(n+1) // + 1 since our array starts at 0
})
// vs
let pi = 0;
for(let n= 1; !isAccurate(pi); n++) pi += nextPi(n)
```

And the top sample doesn’t even satisfy our problem! What if it takes 1,000,001 calculations? Sure we could add some recursion into this, but now we have to worry about more code and possible stack-overflow issues. We could also use a generator function but that would require a loop or recursion, (see former).

As a general rule for myself, I created this diagram. This is very opinion based since in many ways code is as much about art and theory as it is form and logic.
- Green => Array methods are probably better for this
- White => Use your best judgement
- Blue => For loops might be better for this

![](/images/1-RDa9ZeScfRqtd2VBIBkABg.png)

**Key:**
- Existing Dataset = > We have an Array
- Calculated Dataset => We have what we need to easily form the Array/range
- Dependent Dataset => We can’t form the array/range properly until we know the output of each iteration: it depends on the iteration.
- (The control column represents how much control is needed over a loop, such as breaking, typically for performance reasons)

## Conclusion

I think the biggest thing that concerns me is the absolute-mentality. “Never-ever use x” or “x is always better than y” Perhaps x is often better than y, but being so absolute narrows your perspective and (in my opinion) stifles good code.

If I were to make an analogy to the whole “Array vs for” debate, it would be comparing a flat-head to a Phillips screw driver in a world where most screws and screw-drivers are now moving towards flat-heads. If I only had one tool in this world I guess I would be willing to try to get by with a flat-head (Array Methods) but it still might make certain unusual Phillip screws I encounter more difficult (or near-impossible) to deal with, so I shouldn’t be embarrassed about dusting off my old Phillips-head once in a while. Also, tossing your old screw driver away just because you discovered flat heads can be shoved into a Phillips socket , may be a bit …

wait for it…screwy!
