date posted: 2026-04-25
# Entropy with AI (and Humans) in Code Systems

![](/images/1-U37B7r0Ms3jzE2S61wkkjQ.png)

*The code quality (or inverse entropy) calculation I came up with over the last few days*

Something occurred to me several days ago while I was having a surprisingly difficult time generating a basic table for amateur astronomy targets using Claude. After multiple prompts it seemed to get worse: I had a realization that code projects could be represented as a state of entropy (rather than compounding error) just as we measure the universe. The idea being: could AI (and humans for that matter) simply trend towards a more chaotic state without some kind of brake? Or perhaps is it just that humans have a more directed understanding and prioritization so most systems humans are a part of correct enough to undo the error at least for a time?

Many people have noted that AI can compound error, but what if the correction they also apply can’t undo the compounding error? What if projects just tend towards chaos but AI accelerates it? (as I have started to notice both at jobs I have worked at whose code matures but also as AI accelerates that maturity).

It turns out that if you have a system, even a 100% stable one and you introduce 1% error and 1% correction each at a random probability of 50% of the time, it will actually end up in a state of pure entropy (100% error) given enough time and code turnover. This is because a system can’t be more stable than 100% which gives things a momentum downwards, opening up more downward trends that then build on the trends below them. *Note: this assumes an unguidedness of 1 (this will be covered later).*

As an experiment I had AI graph this relationship:

![](/images/1-jiaHiPMUHyz1CADJwi8ZYg.png)

While the state it reached at 2300 steps was 62.9% it actually would have decayed to 0 stability (100% entropy) given enough time.

Even more interestingly, this relationship still decreases even when Cp (Correction %) is greater than Dp (Degradation %), but it does balance above 0 depending on the ratio of Cp : Dp.

AI helped me a bit express this in mathematical notation

![](/images/1-wGMqDhuZcQNb0EOywOzfSQ.png)

Delta Q here represents the change in quality for each step (or commit in our case), Dp and Cp we have already discussed. Ci represents the commit impact (the percentage of the codebase the commit represents). Ep or the probability of error (which as we will discuss later is better defined as entropy) is what determines if Degradation (Dp) should be applied, and correction is the inverse of this (whenever degradation does not occur). Now it might seem like fair criticism that the opposite of entropy (or non ideal code including errors) is not the same thing as correction: but it is. If code is not disordered, then by the very definition of entropy: it’s ordered. And this is why entropy is a much better term for what I am trying to figure out here. I don’t care about just bugs, or just readability, or just code smell: I care about a hypothetical “disorder” vs “order” which relates to all these things and more. *The role of U (unguidedness) and the role of the exponent 1 to e (as in 2.7…) will be covered further down in this post.*

What is important to note is that balancing these two factors determines the ultimate end state of the system over a certain number of steps (or commits in coding terms). The real question is how are Cp, Dp, and Ep related? My hypothesis is that in actuality they are heavily correlated (with Ep and Dp being effectively equivalent and Cp being the inverse (correction increases as entropy drops).

![](/images/1-HsHylImve_Y77CrdpUCMLA.png)

The idea is that a developer who fails a PR 10% of the time is not 100% wrong 10% of the time. Remember, entropy here is disorder or degradation. It is chaos, not necessarily “hey one bug in 100 lines means the whole commit is meaningless, toss it out.” Obviously the line that introduced the bug is degradation, but all of the other lines might be just fine. And so it wasn’t a 10% chance they introduced 100% entropy it was a maximum of a X% chance they introduced a maximum of X% entropy. And this is key, its one thing that should be noted: if Ep and Dp are equal, and we want to represent the *maximum* entropy in a system (not the average), then Ep and Dp must assume the maximal possible value either could result in degradation in a commit and the amount of that degradation. So in actuality if it was proven the developer actually pushed 20% sloppy code 15% of the time, then Ep = Dp = 0.20 not 0.15. And the correction: Cp = 1–0.20 = 0.80 (as anything not entropy = correction/order).

This is the foundation of the entire work, but there were additional things that needed to be introduced to make it more analogous to entropy and more applicable to coding.

![](/images/1-mUxCO9YymrMXKDMagdvMaA.png)

*Calculating unguidedness from intuition: it’s just the inverse scaled from 0–1*

**Intuition/Unguidedness (I/U) —** The exponent (U) you see in the top notation assumes unguidedness (a result from 1 to e). In otherwords the amount of a lack of intuition or a random distribution of priority. AI tools do not possess out-of-context knowledge like the meeting, the angry person who stormed up to your desk, or the emotions you have driving you. They weigh everything equally. A human on the other-hand must have intuition. We ask too many questions, come with a preset of stubborn ideas, are present in the original project meetings, and likely will refuse to work on a project until we have at some understanding. But a human still has flaws, and so their intuition (which I scaled from 0–1 as it is easier to work with) is likely to be below 1 (which computes to an unguidedness: U > 1) and in some cases if not well informed could be almost as bad as AI’s “intuition” as a result of no instruction. (which is I=0 or a max unguidedness of e). The reason unguidedness maxes at the natural number (e) is because e often shows up in unordered states, or doing something without order or purpose: maximally unguided. *It is my opinion that this is what people really should talk about when they talk about why vibe coding doesn’t work. Its not that error is the issue, its that the AI is not given enough insight into how something should work, and likely never will and so the human will always have superior intuition as to how to do something as it relates to the team, project, and structure. I cannot emphasize how important this is, if you play around with the graph at the end you will see just how much intuition matters.*

![](/images/1-SOynqvXJVaBy-1v3ZjC-IQ.png)

*Potential entropy of the commit n (Ec) is equal to the entropy(commits + e)*

**Potential Entropy of the Commit (Ec) —** We know that the entropy in the universe at any given moment is represented by log(W) where log is the natural log (ln) and W is the current state of the system. Here we base it on commits: Cb is the base number of commits that came before, n is the number of commits afterwards up to and including this one, and e is there as E(c) must be *at least 1* as that is the baseline for the product that comes later (ln(e) = 1 guarantees Ec ≥ 1). It should be noted that this implementation of entropy represents the maximum disorder not the actual present disorder as, unlike the universe, coders introduce intelligent order changes. In our code terms, using this calculation would represent the resultant disorder if degradation is 100% this cycle. Deciding on the simplest unit to “order” was difficult, as we do not push code in lines yet they are one of the smallest parts (sometimes indivisible). I used commits merely because commits are the way code is integrated, moved, reviewed, and judged for problems, and it makes everything else so much easier, and most of the time, most dev shops will force commits of similar sizes, but it should be noted that if your commits are wildly different in sizes, it could impact this model as it assumes that any two commits are proportional in their impacts.

![](/images/1-YuKybf9bumhUF0mCryKtUQ.png)

*Fragility is the linear inverse of Quality*

**Fragility (F) —** While max entropy measures the *maximum* *potential* entropy, it does not measure the increasing fragility of the system. In the universe entropy rate does not decay faster simply because there is more entropy, but in code it certainly does. A code base that is 50% entropic (ie. unknown, uncertain, disordered, and potentially bugged) is definitely harder to work with than a system that is 100% known and understood and fully entropy free (likely code you just made that was highly reviewed and tested). In theory 50% quality should be 2x as hard to work with as 100% quality, there is an argument to be made it should be more even more punishing than the ratio this represents, such as 1/2 the stability = 4x the complexity to work with, but this is more the intuition failing to capture the project. The fact it is *even* harder to work with is more a result of compounding factors that fragility pushes over the top: increasing commits raising natural entropy, and a failing of intuition as problems scale.

Now we plug in the potential entropy of the commit (Ec) and fragility (F) to get Ep(n) or the overall entropy probability/amount at step n (since we decided entropy probability and amount are one and the same earlier). Eb here represents the base rate of entropy. This is where you would put in your “I add 10% entropy 10% of the time” factor (in that example 0.10).

![](/images/1-sgcoTk-gdRf_TNHSY9_XHg.png)

*Final calculation we need*

Now that we have everything we need, we compute everything by taking our first equation, calculating the quality (Q) over n iterations (commits) and taking advantage of our hypothesis that Ep~Dp~(1-Cp) allowing us to replace Cp and Dp using a unified Ep for everything:

![](/images/1-MW5d9lUk9IhvnN90HiBYQg.png)

The last thing is Ci, which represents “Commit impact” it is the % of the codebase that the commit will touch, and therefore scales down the amount of degradation or correction (as it has an impact relative to the size of the change*). This exposes the very final assumption we make: that the size of commits will scale with the code size to keep the resultant percentage the same. **One thing I should note as a result of fragility and natural entropy is it is possible to impose entropy well beyond the base entropy, this is intentional: it is because code touches more than itself, it interacts and can break code elsewhere (this is why it is called base entropy and not the entropy rate, that is decided by the whole entropy term seen in the top line above with probability Ep(n)).*

The rest of this is just plugging in and solving, here is the JS code I put together which might be easier to follow (included is the math notation to help follow along). I also had AI throw it into a graph tool so you can see how things decay or stabilize depending on the settings ([https://qualitygraph.netlify.app/](https://qualitygraph.netlify.app/)) remember: percents are represented in decimal! 1 = 100% for intuition, base entropy, and commit impact.

```
function computeQualityScenario(params) {
  const {
    numberOfCommits,
    commitImpact = 0.001,
    baseCommits = 1,
    baseEntropy = 0.15,
    startingQuality = 1,
    intuition = 0,
  } = params;

  // math aliases to allow you to compare to the math formula
  const numberOfCommits_Cn = numberOfCommits;
  const commitImpact_Ci    = commitImpact;
  const baseCommits_Cb     = baseCommits;
  const baseEntropy_Eb     = baseEntropy;
  const startingQuality_Q0 = startingQuality;
  const intuition_I        = intuition;

  // unguidedness is more friendly to compute than intuition
  //  but intuition is easier to think about which is the reason why
  //   we invert things here, it also allows us to bound 0-1 by e-1
  const unguidedness_U = 1 + (1 - intuition_I) * (Math.E - 1);

  return (new Array(Math.ceil(numberOfCommits_Cn)))
    .fill(0)
    .reduce((Qn, _, n) => { // Qn is the last calculated quality we have

      // Ec = log(Cb + n + e), Commit entropy here performs the
      //  Boltzmann formula on commits (base) + how many commits thus far
      //   + Math.E to guarantee > 1 as it is used as a modifying product
      const entropyOfCommit_Ec = Math.log(
        baseCommits_Cb + n + Math.E
      );

      // F = 1 / Qn, fragility increases with a reduction in Quality
      const fragility_F = 1 / Math.max(Qn, 0.01);

      // Ep = Ec * F * Eb, entropy probability is a product of
      //  fragility and base entropy
      const entropyProbability_Ep = Math.min(0.99,
        entropyOfCommit_Ec * fragility_F * baseEntropy_Eb
      );

      // Ep of the time: Qn1 = (1-Ep)^U
      // Otherwise: Qn1 = (1 + (1-Ep)*Ci)^(1/U), we reverse out Ci
      // We scale each down to the impact of the commit, lower impact:
      //  less the change in entropy
      const Qn1 = Math.random() < entropyProbability_Ep
        ? Qn * Math.pow(1 - entropyProbability_Ep * commitImpact_Ci, unguidedness_U)
        : Qn * Math.pow(1 + (1 - entropyProbability_Ep) * commitImpact_Ci, 1 / unguidedness_U);

      // returning the computed quality safely, will become Qn next
      return Math.min(1, Math.max(0, Qn1));

    }, startingQuality_Q0);
}

function computeQuality({samples = 1000, ...params}) {
  const results = (new Array(samples).fill(0)).map(() => computeQualityScenario(params));
  let result = results.reduce((acc, curr) => acc + curr, 0) / results.length;

  // output a percent
  console.log(result*100);
}
```
