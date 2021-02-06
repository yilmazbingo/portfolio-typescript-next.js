useRef does not cause your component to changed when the state changes

```
const [renderCount,setRenderCount]=useState(0)
useEffect(() => {
    setRenderCount(prev=>prev+1)
  }, []);

  <div>{renderCount}</div>
```

this would cause rerender, and it would create infinte loop. Because Every time you render the component, your state would be updated, so you would rerender and so on. INstead

```
const renderCount=useRef(0)
useEffect(() => {
 renderCount.current=renderCount.current + 1
}, []);

  <div>{renderCount.current}</div>

```

useRef is completelt separate from out component render cycle.

- reset the interval when i naviagte from the page.otherwise this will be called all the time because
- setInterval will register the function independently of useEffect. its call back will be executed until clearInterval is called. I am just initialing in the useEffect. setInterval is not connected to react
- clearINterval is native method

## Cannot Assign to ... Read Only Property

If you encounter the TypeScript error, "Cannot assign to 'current' because it is a read-only property" when using the React useRef hook, it is likely because the result of useRef has the type React.RefObject (which makes the reference object's "current" property readonly). It is defined like so:

<interface RefObject<T> {
readonly current: T | null
}>

- To understand why this is the case, you need to know that RefObject is returned by one of TypeScript's three overloads for the React useRef() hook, which are defined as follows:

```
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T|null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>
```

Where the MutableRefObject return type is defined as follows:

    interface MutableRefObject<T> {
        current: T;
    }

amonst those overload funstions i need to return MutableRefObject.
const containerRef = useRef<HTMLDivElement | null>(null);

If it's not already clear why and when we get the return type as RefObject, it is when:

- The initial value of useRef is set to null (e.g. useRef(null)), and;
- The current property is initialized to a specific type (e.g. useRef<HTMLDivElement>).

As you might have already guessed, you can fix this by simply making the result of useRef directly mutable. This can be done by including | null in the type of the generic argument. For example:

const elem = useRef<HTMLDivElement|null>(null);

type Test = typeof elem; // Test = React.MutableRefObject<HTMLDivElement|null>
