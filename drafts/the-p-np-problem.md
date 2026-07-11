# The P/NP Problem

One of the things I have been doing in my spare time is revisiting mathematics, a previous childhood love of mine that was originally my declared degree when I had been pursuing college.

I had always shared a strong love of programming as well, likely because I could do logical mathematical things with programming, and starting in my teenage years programming grew to occupy more of my mind until it became my actual job in my mid-20s.

Something that crosses both boundaries is the P vs NP problem.

I considered that the problem should be rephrased as:

NP() = P1()+P2()+P3()… and that P() roughly P-1() or the time to guess a solution has a proportional (polynomial) comparison to the time to check a solution, its just that the guess is usually wrong, the check is always right.

My next idea was to factor P as you would factor a number, but rather than factors of a number, its factors of the procedure used to compute P. Think about shared programming or mathematical equations between Px terms. If we could abstract this out somehow it would make the P terms easier to solve and look something like Sp()*(p1()+p2()+p3()) where Ps is the shared P work of the P1,P2,P3 terms and the P1, P2, and P3 terms are now all easier to compute.

This then redefines the question:
- If Sp() is not possible to define until all the work of the terms are known, then P!=NP
- If Sp() is possible to define but not enough until all work is known than it is still P!=NP
- If Sp() is always impossible to define than it is definitely P!=NP
- If Sp on the otherhand can be defined before all terms are known and in a way where the growth of the work is in polynomial time, then it is possible P = NP which would be extraordinary.

One possible thing I considered is extracting the logic of P using a complete Turing machine and church logic combined, that way it could express anything thrown at it and show how that logic could be factored. If the logic could be expressed Godelian (which means as a unique number) but further the properties of that number expressed the church relations of the lambdas (such as divisibility allowing two “lines” of work to be split) you might be able to figure out a sort of universal factor pattern of turing machines, but it seems so utterly complex and beyond my ability to determine I figured I would type it here conceptually and let others ponder it.

In truth I am actually somewhat glad I didn’t end up majoring in math, a math teacher might be fun especially say at an algebraic level where you can avoid differential calculus involving strange scenarios that will never happen and you can start talking more in concepts I remember how blown away I was when we learned 0.9999 repeating was 1 and the reasons why 0.88888 is not 0.89. It is the higher level math concepts that are rooted in age old mathematics that are the most compelling. For me, the highest level math concept I am remotely interested is in the Riemann Hypothesis and that has so many threads that extend out from it that it has taken some of the elegance out of it for me — and its on the edge of my tolerance for “new age math” where most of math these days seems to be inventing complexity for the sake of complexity.
