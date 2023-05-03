# TECH3108 – Dynamic Web Development

## Assessment Task – Front-end Development

### Personal Reflection

Using only JS to do this assignment was extremely exhausting especially implementing automatic data loading with out rerendering the full page. I have tried my best to keep the code clean and concise but I have found myself lost most of the time. The class folder contains class object used for the data types I had to handle, render has most of the rendering functions that change the DOM element, handler has the logic handling for events like `click`, etc.

I have also added some error handling during the login step but I was not able to create some of the `status: 400` errors in my testing. They only seem the occur when the DOM renders wrong elements, which tends to be rare.

I tried my best to keep my code readable but during implementation of automatic data loading but I was not able to keep it consistent causing a mess in the `index.js`. I was having trouble with figuring out which state the page was on and which element needed to be added or removed. I have tried my best with the resources I was provide and was able to find, but I am aware that there is a better way we can do this.

I have also added a draft functionality so that a user can have their threads and posts saved as draft and come back later and finish it. My method utilizes `localStorage` to save, but I could have used cache storage or like gmail have it saved as draft object on the server, so you can access it on any devices. At the moment when a user logs out all the `localStorage` is cleared. Hence, you can only use this functionality as log as you are logged in. I chose this as it was way safer and other users cant access other people drafts.

It was fun to try out vanilla JS to create a website but the amount of content we have to write is unsustainable, which makes me realize why people use libraries and framework for dynamic websites like `React`, `Vue` and `Svelte`.

### Statement of Completion

| Implementation                                                | Progress |
| ------------------------------------------------------------- | -------- |
| • Login screen allows user to type username                   | ✅       |
| • Login screen validates username                             | ✅       |
| • Threads list displays list of threads                       | ✅       |
| • New threads can be created successfully                     | ✅       |
| • Thread items can be selected to show posts                  | ✅       |
| • Post listing includes both text and display name            | ✅       |
| • New posts can be added to a thread                          | ✅       |
| • Users can delete their own threads                          | ✅       |
| • The page automatically loads new data                       | ✅       |
| • Challenge task (optional). Navigation using the History API | ❌       |

I was not able to complete the challenge tasks due to time constraints and being overwhelmed by the History API document.

### References

- Mozilla Foundation. (2023, April 4). JavaScript | MDN. MDN Web Docs. Retrieved April 20, 2023, from https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Mozila Foundation. (2023, March 13). HTML: HyperText Markup Language | MDN. MDN Web Docs. Retrieved April 30, 2023, from https://developer.mozilla.org/en-US/docs/Web/HTML
- Mozila Foundation. (2023, April 15). CSS: Cascading Style Sheets | MDN. MDN Web Docs. Retrieved April 15, 2023, from https://developer.mozilla.org/en-US/docs/Web/CSS
