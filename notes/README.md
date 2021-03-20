## useSWR

created by next.js. Stale-While-Revalidate. it first returns the data from cache(stale), then sends the fetch request, and finally comes with the update data again.

## Roles

Roles are functions that gets executed after user logged in.

## Redirect

The <Redirect> component will, by default, replace the current location with a new location in the history stack, basically working as a server-side redirect.
But it can also be used with the property push and in this case it will push a new entry into the history stack, working the same way as history.push.In fact the <Redirect> component uses the history push and replace methods behinds the scene. It is just a more React way of navigating.

So basically you have two ways of navigating:

Use the history.push and history.replace in a component (usually wrapped with the withRouter HOC, so that you can have access to the location object without having to pass it from parent to child.

Use the <Redirect> component with or without the push property, depending

Most networking operations return a \*OpError which holds detailed information about the error and implements the net.Error interface.

- The AggregateError object represents an error when several errors need to be wrapped in a single error. It is thrown when multiple errors need to be reported by an operation, for example by Promise.any(), when all promises passed to it reject.

## Next export

it also produces an optimized production version, but it producess full static build whihc means only html, css and javascript. no server-side code and therefore for hosting such a website, you do not need a node.js server. this makes hosting easier because you dont need to worry about scaling, maintaing a server. there are plenty of static hosts out there, which scale dynamically and are very cost-effective. this makes deployment bit easier.

since it build 100% static app there are certain things you cannot use. For example, if your website relies on api routes, server-side rendering, on page revalidations, or if you static paths with fallback set to true.all these things require a code t execute on demand for incoming server on the server.

you cannot use page revalidation, so whenever content changes you need redeploy.
