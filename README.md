
### The News Is Emotional, Lets Be Rational
- Gain a deeper perspective on the content of news
- Approach topics with biases in check
- Tools and features focused on giving you the power to get to the facts, not the feelings.

MERN Stack
  - ExpressJS API on NodeJS runtime
  - React Front End
  - MongoDB Database
Additional Tech:
  - Redis Service for queue and worker managament, offloading database transformations from the backend
  - Docker for containerization in both development and production

Challenges:
  - HTTP Cookie management. Because of the public suffix list I am unable to set HTTP only cookies when deployed on a hosting provider without a custom domain. I had to set up a custom domain with different subdomains to isolate the frontend and backend and learned alot about how react behaves in relation to the web server.
  - Refreshing a page when using react router - React router allows our applications to feel like multi-page applications with link routing without making additional calls to the server. It does this by handling the rendering in the browser and updating the url, though this url is never actually called by the browser in a way that would send a request to the server. When the browser is refreshed, the react app is removed and the browser makes a new request to its current url location. However, this could be a route that does not exist on the backend and was only rendered on the front end, causing a server 500 error. The solution to this was using the rewrite logic for routing the frontend offered by render. Since react router handles all requests at the index.html path, the rewrite allows the browser to make requests to the base url regardless of the route shown in the navigation bar. This allows the apis to function the same way (still called by specific functions) but all browser level routing points to the index.html file, allowing everything else to be handled by react router.
