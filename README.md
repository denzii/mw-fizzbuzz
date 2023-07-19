- Considerations made for this project:
1. Since the task description mentions Dependency Injection, an express server was introduced to create an opportunity to use it.
2. Since the task mentions SOLID principles, two games were added instead of one to create an opportunity to use some interfaces and make certain abstractions.
3. Since testing is mentioned only briefly, basic unit tests were added but integration tests have been omitted


- Things I would have done differently in real projects:
1. I would be more conservative with the abstractions and try to avoid them where I can
2. I would add integration tests to at least test if the endpoints return correct status codes
3. I would try to optimize the code a little bit after meeting the requirements
4. I would use node-ts instead of experimental nodejs features for TypeScript transpilation or even setup webpack/vite depending on the project context.
