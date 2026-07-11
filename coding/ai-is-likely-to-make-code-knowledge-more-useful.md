<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

<!-- date posted: 2026-05-05 -->
# AI is likely to make code knowledge more useful

Posted on Medium: 2026-05-05

![](/images/0-S7kQJB6S4E56wIYB.png)

*A graph from my previous post on [AI Entropy](https://medium.com/@nathanphoffman/entropy-with-ai-and-humans-in-code-systems-1ebdcff9642f) which shows how systems naturally decay even if they correct by the same amount they introduce error by*

An interesting argument I have heard is that AI will remove our ability to think critically about programming, and discourage newer programmers from learning how to code. Interestingly, I think it is a bit of the opposite.

I have recently been trying to compose computed tables using AI for astronomy targets and another for ethical food choices (based on ecosystems, intelligent animals, pesticide use, etc). What shocked me is how horrific it was at composing these tables using calculations across rows. It would frequent randomly compute something with 1000x error (dropping) 10³ in one case

> Wait — 2.8284 × 1⁰¹² is 2,828,427,124,000 not 2,828,427,124. I dropped three zeros.

In some cases it would lie about neuron counts, as neuron count sources are pretty limited, so it would often guess for specific species, but worse it wouldn’t tell me that it guessed, and even worse it would then change its mind when recomputing the table resulting in fluctuating numbers with no explanation, and in some cases the fluctuations became drastic especially when involving exponents.

The astronomy table had similar problems: it got so bad that every iteration of the table spiraled more out of control until I had to abandon it entirely — something I have now done 3 times with my food sources table. The astronomy table was so problematic it inspired me to spend days coming up with a concept I call AI Entropy which is looking at compounding AI error a slightly different way which you can read here: [https://medium.com/@nathanphoffman/entropy-with-ai-and-humans-in-code-systems-1ebdcff9642f](https://medium.com/@nathanphoffman/entropy-with-ai-and-humans-in-code-systems-1ebdcff9642f)

That got me thinking: maybe to get the most out of AI knowing programming is actually the most useful. Having AI output a separate table of data for inputs and code that shows me how the table is produced would let me audit both the table data and the source of the data. While spreadsheets could handle some of this, the nice thing about programming is I could extend it and reuse it, plus one could argue that complex spreadsheet logic is a form of programming anyhow. All of which allows us to audit what the AI is doing, which makes these skills more useful than ever now.

I have found the more broad general purpose models really are only good at basic aggregation and echoing common known knowledge / current discourse. The minute you either ask it for something complex, or expect it to understand complex input tokens (or god forbid both) it spirals into insanity and requires you to help build its logic with it — something programming is just the right thing to handle.

It is still shocking to me how often people will claim that AI will soon become conscious and we will have walking robots that are indescribable from humans; we are so far away (likely infinitely far) from that future, that it is likely not happening in any lifetime of those who read this (if even possible at all). As a tool sure its useful, just like a calculator is super useful, but as some miracle technology that will change the world — I think you need to look to the past at all the other predictions like that made — sure some became somewhat true like the usefulness of computers, the internet, the smartphone, but even those aren’t perfect, often took longer to mature than expected, didn’t go as far as predictions (people said computers not AI or mechanical servos would make humanoid robots possible), and ironically there is a movement today to move away from screens more and more which might make those technologies be less used by future generations anyhow.

For now I will keep enjoying AI as a learning tool for basic information and using it as a code companion, but I am far far far from ever relying on it for anything even remotely complex without heavy auditing of its internal logic — which calls into question if AI APIs are a bit over-hyped — as the risk of getting something wrong for your customer seems to me to be worse than limiting the functionality a bit. Though I suppose there might be some highly limited use-cases out there like a customer being able to ask questions about your product in an FAQ section.

>https://nathanhoffman.me/coding/ai-is-likely-to-make-code-knowledge-more-useful
