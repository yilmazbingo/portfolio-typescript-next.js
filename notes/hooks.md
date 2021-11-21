## useMemo

There are two problems that useMemo seeks to address:

- referential equality: Referential equality means that the pointers for two objects are the same. That is to say the objects are contained in the same memory location which leads us to the fact that pointers reference to the same object. In the lifecycle of a component, React re-renders the component when an update is made. When React checks for any changes in a component, it may detect an unintended or unexpected change due to how JavaScript handles equality and shallow comparisons. This change in the React application will cause it to re-render unnecessarily.
- computationally expensive operations: Additionally, if that re-rendering is an expensive operation, like a long for loop, it can hurt performance. Expensive operations can be costly in either time, memory, or processing. In addition to potential technical issues, this may lead to poor user experience.

useMemo takes in a function and an array of dependencies.

The dependencies act similar to arguments in a function. The dependency’s list are the elements useMemo watches: if there are no changes, the function result will stay the same. Otherwise, it will re-run the function. If they don’t change, it doesn’t matter if our entire component re-renders, the function won’t re-run but instead return the stored result. This can be optimal if the wrapped function is large and expensive. That is the primary use for useMemo.

The useCallback hook is similar to useMemo, but it returns a memoized function, while useMemo has a function that returns a value.
