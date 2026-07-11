<!-- date posted: 2026-07-07 -->
# The Seven Points — Simplifying The Development Process

Posted on Medium: 2026-07-07

I have always considered whether we over-architect pipelines or under-architect them. I have seen small companies do far far more than they should and larger companies far far less. From where I stand, I feel like it is worthwhile and take a step back and consider “how much testing, QA, PR, ticketing is really needed for *our* project” Not *a project.* You wouldn’t hire 1000 skyscraper engineers to design a shed, so don’t do it for your apps — but you also wouldn’t have one person, who never built a skyscraper before, building the next Burj Khalifa. So here is the idea, first (in any order) consider how many items are satisfied. (Disclaimer: this is very subjective so I know it will be contentious!):
1. Does this pass the common-sense “Most people I worked with would find this reasonable” (not applicable to new devs) AND are you personally very satisfied with it.
2. Does it align to proper documentation, were the right tickets, tasks, etc. filled out? (Paperwork)
3. Does it have thorough tests that passed through a testing suite? (Unit Tests)
4. Did QA give it a go?
5. Did a dev familiar with this product give the green light (PR)
6. Did yet another dev familiar with this product give it the green light? (PR 2nd approval)
7. Did AI give it a pass?

Then if the number X. of these are satisfied (of any in the list) then:
1. Good enough for a private hobby project
2. Good enough for a small production hobby project
3. Good enough for an internal company product
4. Good enough for an external product at a small company
5. Good enough for an external product at a medium company
6. Good enough for an external product at a large company
7. Good enough for going to Mars

