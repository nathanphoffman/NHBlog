<!-- date posted: 2025-11-19 -->
# Ranking System Part I

Posted on Medium: 2025-11-19

I have a perpetual obsession with ranking things, I don’t know why but it is tremendously fun, it likely began with my entry into the Board Game hobby in 2013 with lists like [Board Game Geek’s top 100 ranking](https://boardgamegeek.com/browse/boardgame).

Several months back I decided to put together my own weighting system (which works quite a bit different than traditional ones) and then I applied it to Steam games and the BGG list using some code, to generate a list of recommendations I thought would be more relevant to me.

**How Weighting Normally Works**

Traditional weighting systems that rank items typically compare the number of ratings and the score of those ratings for each item in the list. How these items are weighted vary, a common approach is simply to do something like this:

```
weighted_rating = avg_rating * num_reviews / (num_reviews + base_review_count)
```

Where base_review_count is a static number that helps lower the ranking of a say an item with 10 reviews that are all 100% vs one with 1000 reviews that is 98%, like so:

```
// weighted_rating = avg_rating * num_reviews / (num_reviews + base_review_count)
let less_popular = 100 * 10 / (10 + 10) // = 50%  was 100%
let more_popular = 98 * 1000 / (1000 + 10) // = 97% was 98%
```

But this approach has a problem, what happens if the source for reviews grows in size? Adding just 10 reviews for the base_count if even unpopular things get 1000 reviews does little to judge such ratings against something with 100,000 reviews. In cases like this, devs would likely raise the base, but this is by definition arbitrary, and it also makes it impossible to compare against other review sites or get a true sense of how good that thing is in an absolute sense.

**My Approach**

My approach is extremely different, and does not have an upper bound of the review score, and will need some explanation, but here is the idea:

```
// weighted_rating = avg_rating_decimal^2 * log10(num_reviews)
let less_popular = Math.pow(1.00,2) * Math.log10(10) // = 1.00
let more_popular = Math.pow(0.98,2) * Math.log10(1000) // = 2.88
```

This entire system is based around the concept of 10s. Log base 10 of any 10^x number is always equal to x. Thus an item with 100 ratings cannot possibly exceed 2 since the multiplier of that number, the rating, is converted to a decimal percentage (a max of 1) and 1 to any power is of course 1.

This is extremely useful, as it tells us something absolute. It tells us that this item is equivalent to if 10^(score) people gave it a 100% rating. So a 1 or less is pretty unreliable as I could easily find 10 people to give something a perfect score, but a 3 (1000) starts telling a different picture. And even cooler, it does give us an extreme upper bound that is very pleasant, if the entire human population (about 10 billion people) gives that thing a perfect score (100% or 10/10) then the maximum score it could have is a 10 (10¹⁰).

The reason why the rating is taken to a power is to punish things with lower ratings (<1²= <<1). Typically when things get more reviews, while it increases their log10() score, it drastically lowers the review %. This is part of what weighting systems are intended to fight against (a small population juicing a score).

But my system goes further, it also rewards higher percentages far more than lower percentages. For example, 90% vs 99% is a difference between 0.81 and 0.98 with my scoring system that is a huge drop for a score, and rightfully so. While both are good, a 99% review score is much much more impressive than 90% not just 9-10% more impressive, especially since the number of reviews are already accounted for with this. This also means if something is pretty hated, like say a 2/5 or a 40% equivalent, that is punished even more, in this case it is factored at only 0.16 for the multiplier.

You might be thinking “hey wait a second, if a 100 million people review something mediocre say a 3/5, wouldn’t it be a pretty high score? ” Sort of, but not really. Such a theoretical item would still only have a rating of 2.88 which is largely due to the exponential punishment of low scores we previously discussed, and while a 2.88 is reasonably good, I would argue that if 100 million people rate anything average it might not be a bad idea to be aware of it because getting that many people to rate something is in and of itself astonishing.

I ran this system for many many products like Amazon, Steam listings, and Board Game reviews, and this table effectively is what I discovered using my ranking system:

![](/images/1-yGqnmU63v6ERKwsiQn-sAw.png)

For long term projections, I ran it for Agricola (a well established and beloved farming board game) over several years of data and while it grew at launch (as expected) it stabilized quite well around a 3. I ran that data looking back at a year or so ago, and it is at present a 3.01. Starfield which I tracked was beloved at first and actually hit over 3 but then fell back down as people criticized it. It turns out that this rating system, while unbounded, still bounds itself as the bigger something becomes the more critical people become of it.

More posts will be forthcoming on ranking steam games and board games with some code.

