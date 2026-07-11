<!-- date posted: 2022-10-13 -->
# The Time Estimate System I Love

Posted on Medium: 2022-10-13

Back when I was working at a REIT company, I was developing a system for Revenue Management to price storage units. While the system was being developed, the revenue team was excited to start using it as it was being actively developed (effectively an alpha). The problem was, they had many wish-list items they wanted implemented quickly so that they could perform their job functions more efficiently. These requests were filed into Asana and were submitted in large numbers extremely rapidly. This led to a problem: how to estimate the time of these tasks and prioritize them.

At first I attempted to give everything a standard hours-estimate, but this proved difficult. I rarely had enough time to properly estimate tasks, we did not have proper sprints, and as the only developer on the project my resources were limited. This meant that often without proper investigation the Revenue team would categorize tickets that I had put lower estimates on just to find out that I had completely underestimated the task, requiring us to table the ticket and start a new one, re-prioritizing my queue.

To help counter this, I started over-estimating “unknown” tasks or tasks that I wasn’t 100% sure how long they would take. The issue with this is that our Revenue Management team didn’t quite understand the sudden up-tick in time estimates or why some similar-sounding items were so wildly different.

So I started verbalizing in meetings “this one is extremely unknown because I have never used this technology, this is a strange hack that had to be done that I will need to undo, or I would have to do more discovery if you wanted a better estimate on that.”

It wasn’t long before I made this official. On every single task I started putting a multiplier next to time estimates I was unsure of. It looked like this:

> [1x3] Adjust positioning of tables and row animations

This means *“I think this should take 1 hour, but it could take up to 3x as long (3 hours) if everything went to hell.”*

This was extremely effective. They could see from that three number breakdown exactly what was going on and could ask targeted questions based on it. This meant they could immediately ignore any of the more certain and typical: x1, and x2 tasks and focus on the even higher multipliers which would even help some items get unstuck:

> Manager: “why is this one an x5?”

> Me: “The support team at X hasn’t gotten back to me yet.”

> Manager: “Oh no problem, I will email them right now and get you that information”

The uncertainty modifiers I used are as follows:
- [x1] — I absolutely know this is how long it will take and completely have the expertise to achieve it. Most likely it is either extremely simple or an area of code I just worked in.
- [x2] — Standard, I am not extremely certain in this change, but I am pretty certain that I can do it in this amount of time.
- [x3] — Uncertain, I am definitively uncertain about this estimate, but I have an idea of what is involved.
- [x4] — Very Uncertain, likely there is tech I never used or entire areas of code I have never seen before.
- [x5] — Unknown, likely there is a reliance on a third party or design is not yet complete for this item. More often than not, x5 usually means *“come back to me later and estimate this better when you know more”*

My manager at the time loved the system because it gave him three estimates:
- Best case scenario possible (we didn’t tell anyone this estimate or believe it ourselves)
- Likely case scenario (the time estimate to commit internally)
- Worst case scenario (the time estimate to commit externally)

Consider we had 5 tasks: [1x1], [1x2], [2x2], [1x3], [3x4], [2x5],
- Best case scenario (sum the left-hand numbers): **10 hours**
- Worst case scenario (multiply all the estimates and add): **32 hours**
- Likely case scenario (average the worst and best case) (10+32)/2 = **21 hours**

This may seem like a highly inaccurate way of performing estimations, but it actually worked extremely well. It gave me more time to work on items with less time trapped in discovery; it even allowed our revenue management team to remove some items they didn’t think warranted the estimate or discovery and I don’t think I have ever hit time estimates so frequently. Almost all of the work we did was close to the likely case scenario (21 hours) and well under the worst (32 hours).

This estimate system also took a lot of stress off of my shoulders. It took that awkwardness of “how do I tell my manager this simple looking 1 hour task I have estimated at 3 hours because I think this is going to be challenging” now looks like [1x3]. This conveys all of that information in such a short amount of text. It also allows others to rethink the task and perhaps remove it entirely or re-prioritize something over it.

## **It has a feeling of Planning-Poker “Light”**

There is a system in time management called “Planning Poker” where everyone gets cards of various difficulty ratings and assigns them to tasks, they can’t assign every task easy or every task hard since all the cards have varying difficulties/numbers on them.

While each task has a separate time estimate, the multiplier is often the bigger factor. With the multiplier, sorting someone’s task list gives you an idea of their capabilities, how much they are struggling, and if they are abusing the multiplier, after-all if you have a developer who never puts a x1 or x2 on a task that, almost by definition, means they have no idea what they are doing.

Employee 1: [1x1], [1x1, [1x1], [1x2], [1x3], [1x3], [2x3], [2x4], [4x4]

Employee 2: [1x2], [1x3, [1x3], [1x3], [1x4], [1x4], [2x5], [2x5], [4x5]

Obviously not all tasks are created equal but employees can’t routinely just give everything a x5 difficulty, if they did their manager should call them out on it, this relative scale forces an employee to decide “hmm I already used a lot of x4 and x5 here…maybe this x3 is a better x2 and this x2 could be a x1, I have worked in that area of code before.”

## **Final Thoughts**

This system is not for everyone or for every organization, but I do find it useful even in an environment where single estimates are needed. I have found myself in the past asking “what would this be back at my old company” [2x3], I perform the average of best and worst in my head ((2+6)/2 = 4) and put 4 hours on the task. However, it has likely been most useful in giving an initial-rough estimate on a large number of tasks while working on large products.

>https://nathanhoffman.me/coding/the-time-estimate-system-i-love
