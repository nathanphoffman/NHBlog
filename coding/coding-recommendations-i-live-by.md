<!-- Blog of Nathan Hoffman -->
<!-- [Blog of Nathan Hoffman](main.md) -->
<!-- themes: glacier -->

<!-- date posted: 2017-02-26 -->
# Coding Recommendations I Live By

Posted on Medium: 2017-02-26

- Use camelCase for variables/arguments and parameters.
- Use Pascal casing for Class Names, Functions, Properties/Fields/Members (generally following: [https://msdn.microsoft.com/en-us/library/x2dbyw72(v=vs.71).aspx)](https://msdn.microsoft.com/en-us/library/x2dbyw72%28v=vs.71%29.aspx%29)
- Anonymous Functions/Lambdas should not exceed ~20 lines of code unless there is a specific use case for this. You may what to use a named inline function or traditional definition instead.
- One line of code should not be greater than approximately 1000 width at 10pt font. (this is about 100–150 chars depending on your monitor)
- Ternary operators should never extend more than two lines. One level of ternary nesting is ok if it can be read easily and there is good reason, otherwise do not use nesting at all.
- Utility functionality like logging and emailing should be wrapped in another function in the event they change so the change only needs to be made in one place.
- For troubleshooting purposes only one function can be nested once within another function when executing a function return to pass in as an argument to another function. As an example: fn(fn()) is ok, fn(fn(),fn()) is ok but fn(fn(fn())) is not ok.
- Regular expressions should be used for simple tasks only or broken out into multiple simpler regular expression statements. One giant RegEx string should be avoided.
- _ should be used to indicate private in languages that do not otherwise have a private functionality, otherwise this character should be avoided entirely.
- As a general rule, a single file should never exceed 500 lines of code with a goal of 20–200 lines. If the file is less than 20 lines, and it can go someplace else, you might want to consider moving it. Otherwise, do not feel you can’t have a file that small if it seems to be totally unrelated to everything else.
- Tabs/spacing within a single file should never exceed 5 indent levels unless dealing with inline data structures, and even then, you might consider putting the structure in another file.
- Regions, if available in a language, should be avoided. If they are needed for code organization, than the code should be broken out into multiple files and organized as such.
- Comments should either: A) Give reasoning as to why you did something strange or B) Explain a very complicated code block. It should never explain a straightforward block of code which is simple to understand. You should also never write obvious things. As an example: “//Function which has a foreach loop that builds employees” and only if you need the comments per A and B rename it to “//Builds employee objects”
- Always put the comment on the line before what it is describing, putting it next to a line of code can cause formatting woes later on.
- Always name methods and properties descriptively. Good code with the exceptions listed in the point above should not need many comments.
- Avoid the use of leading type prefixes like intMyNumber. The only time this might make sense is where variable name collisions might occur between something like an enumerated type and a variable of that type. In cases like these, always prefix the least common variable or type. In other words, for an enum I might do enEmployeeType and EmployeeType as my variable name.
- If at all possible, never duplicate code. Two use-cases is enough to justify generalization (like a general method), but you really should generalize your code if you have 3+ use cases of the same functionality.
- Brevity is great, Readability is good. In other words, it is better to shorten your code and make it slightly less readable than it is to have long sprawling code which is readable. However, replacing a huge amount of code with a one line nested mess is also not ideal. In other words, lean towards brevity over readability, but be careful not to lean too far or else you might create an unreadable, unbuggable, disaster.
- In languages like C# that support compiler based interpretation of variable types, like var, always type out the data type unless it is very long. Use cases for var would be generics or unwieldy namespaces.
- Avoid dynamics/usage of weak types in languages that support strong types unless a very particular use-case requires it. There is really only one case I have encountered: When you are pulling in data you do not know the structure of, perhaps it is a web service that returns three different types of structures and in that structure is information you can use to deduce it. In this case you have to keep it dynamic, find the structure, then compose a strongly typed structure afterwards.
- In languages like JavaScript where there are multiple ways of doing one thing, try and stick with one variation. As an example, if you use class in JavaScript, stay with class and try to avoid using functions as classes.

>https://nathanhoffman.me/coding/coding-recommendations-i-live-by
