# InSite Applications Take-Home Challenge - Backend

- Using Javascript or Typescript and framework(s) of your choice (e.g., Express, HAPI, Koa), create an API that accepts a freeform search query and returns a list of matching [Flickr](https://www.flickr.com/services/api/) titles and image URLs for various sizes.
- Limit the response to ten titles (don't bother with pagination).
- This exercise isn't meant to take a long time, so don't spend more than an hour or so on it (unless you really want to).
- Before you start please fork this repo. As your are working on your solution try to commit the changes in small blocks.
- When you are finished, please write a short paragraph (or some bullet points) describing what you perceive to be the pros and cons of your approach (i.e. your code, not your framework choice) plus any alternatives you considered, and add this to your PR. We will not be judging your writing style or grammar.
- Feel free to use generators, async/await, promises, whatever you think is most useful and expressive for the given problem.

For example:

```
curl http://localhost:8080/images?query=apple
```

Should return a response of the form:

```
[
   {
      "title":"Apple",
      "urls":[
         {
            "width":640,
            "height":480,
            "url":"https://farm5.staticflickr.com/4389/37190610481_f133ae5188_s.jpg"
         },
         {
            "width":320,
            "height":240,
            "url":"https://farm5.staticflickr.com/4389/37190610481_f133ae5188_q.jpg"
         }
      ]
   },
   {
      "title":"apples",
      "urls":[
         {
            "width":640,
            "height":480,
            "url":"https://farm5.staticflickr.com/4389/37160913742_39f4db7a40_s.jpg"
         },
         {
            "width":320,
            "height":240,
            "url":"https://farm5.staticflickr.com/4389/37160913742_39f4db7a40_q.jpg"
         }
      ]
   }
]
```


You may find the following Flickr documentation to be useful:

- [Search](https://www.flickr.com/services/api/flickr.photos.search.html)
- [Sizes](https://www.flickr.com/services/api/flickr.photos.getSizes.html)

You may use the following credentials:

- Flickr API Key: `80aafb8d5879b4ab3d58a6543021cd59`


# Pros and Cons of solution

### Pros:
- Constants are defined in external config.js file and can be required by modules if needed. This gives an easy way to configure the app.
- Folder structure with separation of routes and models is best practice.
- Default route is set up so there is never an empty response.
- Different error messages for wrong user input gives useful feedback to user.


### Cons:
- Test cases don't cover all edge cases. E.g. user input with special characters etc.
- Response doesn't always return list of 10 images because sometimes url_o is missing form the request. This case could be caught and url could be created via
 https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg instead
