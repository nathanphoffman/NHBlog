<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->
<!-- title: Ordering Items By Weights — Blog of Nathan Hoffman -->

# Ordering Items By Weights

Something I like doing in my spare time is creating lists, I have come up with a list system where you order items by different weighted categories. It goes something like this:

**Score** = w1 x (r1)^2 + w2 x (r2)^2 + w3 (r3)^2 …

Where r1...rn is the rating from 1-5 of the item in that category (1 worst, 5 best) and w1..wn is the weight of that category in terms of how important it is.

The rules:
- All weights must be different (this enforces )
- All weights must be in order (ie if I have 3 categories I cant do 1x 2x 4x, I must have 1x 2x and 3x as my weights)
- And thus all weights must be from 1..n where n is the number of weights
- A rating must be a single round integer, but for a single category per item you can give a 0.5 (half step) rating to, but it must be no more than 1 per category per item to lower the chance of bias.
- If after doing all this the items ranking doesn't work out, the suggestion is that you should not violate these rules, but instead should consider creating new categories or reordering them.

A huge benefit of this scoring system is that the computed score gives a relative rank which is also extremely useful because it is very unlikely two ranks are going to be the same (unlike a simple average). Because taking a rating to an exponent generates numbers that rarely can be formed from their lower values: 1,4,9,16,25  vs 1,2,3,4,5.  Adding a 2/5+2/5 easily gets 4/5 a known rating, adding 2^2+2^2 does not give any n^2 value and thus shows off the mathematical strength of this approach. Only 9+16 is able to get 25, no other combination works, and because we multiply by a *unique* weight it makes these collisions even less likely to happen.