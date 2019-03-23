# Elixor

Observable based HTTP client for the React,Browser and Node.JS

-  Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
-   Make [http](http://nodejs.org/api/http.html) requests from React , Node.JS
-   Intercept request and response using interceptors.
-   Transform request and response data
-   Cancel requests
-   Automatic transforms for JSON data
-   Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Set up

Using npm:
```bash
$ npm install elixor
```
Using bower:
```bash
$ bower install elixor
```
## Example

Performing a GET Request
```bash
    
import { elixor } from 'elixor';

 elixor.get('https://jsonplaceholder.typicode.com/todos/1')
            .subscribe(r => console.log(r));
     
```

Performing a POST Request

```bash

import { elixor } from 'elixor';

 const opt = {
     name:'Hello World'
 };

 elixor.post('https://jsonplaceholder.typicode.com/posts',opt)
            .subscribe(r => console.log(r));

```
