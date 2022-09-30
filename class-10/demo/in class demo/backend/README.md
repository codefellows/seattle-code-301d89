# demo-10-backend

## What is our mental checklist for debugging servers and FE?:

### Isolate the problem
1. Terminal
- Is my BE server on?
    - $ nodemon
- Is my FE server on?
    - $ npm start
2. Start debugging from the BE, to the FE
    - test API with browser/thunder client
    - thunder client, GET request to BE
    - check .env files carefully
3. FE
    - Dev Tools:
        - check console
        - check network tab, (you have to make another request)
            - click the red request
            - check the "Request URL"
                - extra slashes?
                - bad route?
                - check the query params against server.js

### What tools do we have to debug?
- linter
- breakpoints
- console.log WITH helpful indicator messages
- dev tools in general
- pair programming
- checking with our mental models/whiteboards


