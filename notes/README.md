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
