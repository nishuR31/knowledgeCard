export interface KnowledgeCard {
  name: string;
  info: string;
  why: string;
  code: string;
}

const hooks: KnowledgeCard[] = [
  {
    name: "useState",
    info: "Declares a reactive state variable inside a function component. Returns a tuple [value, setter]. Every setter call schedules a re-render with the new value.",
    why: "Without state, components are pure templates — they cannot remember user actions, API responses, or any runtime data between renders.",
    code: `const [count, setCount] = useState(0);
// increment
setCount(prev => prev + 1);
// reset
setCount(0);`,
  },
  {
    name: "useEffect",
    info: "Runs a side-effect after the browser paints. The dependency array controls when it re-runs: [] = once on mount, [val] = when val changes, omitted = every render.",
    why: "Keeps side-effects (fetching, subscriptions, DOM mutations) separate from render logic and handles cleanup via the returned function.",
    code: `useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json())
    .then(setData);
  return () => controller.abort(); // cleanup
}, []);`,
  },
  {
    name: "useRef",
    info: "Returns a mutable ref object whose .current property persists across renders without triggering re-renders. Also used to directly reference DOM nodes.",
    why: "Needed for values that must survive re-renders without causing them — timers, previous values, imperative DOM access.",
    code: `const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current?.focus();
}

return <input ref={inputRef} />;`,
  },
  {
    name: "useMemo",
    info: "Memoizes the result of an expensive computation. Only re-runs when dependencies change, returning the cached value otherwise.",
    why: "Prevents expensive recalculations on every render — especially useful for filtering/sorting large lists or computing derived state.",
    code: `const sortedList = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);`,
  },
  {
    name: "useCallback",
    info: "Memoizes a function reference. Returns the same function object between renders unless dependencies change.",
    why: "Prevents child components wrapped in React.memo from re-rendering when the parent re-renders but the callback logic hasn't changed.",
    code: `const handleSubmit = useCallback((e: React.FormEvent) => {
  e.preventDefault();
  submitData(formData);
}, [formData, submitData]);`,
  },
  {
    name: "useContext",
    info: "Reads and subscribes to a React context. The component re-renders whenever the context value changes.",
    why: "Avoids prop drilling — passes data deeply through the component tree (theme, auth, locale) without threading props at every level.",
    code: `const ThemeContext = createContext<'dark' | 'light'>('dark');

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);`,
  },
  {
    name: "useReducer",
    info: "Alternative to useState for complex state logic. Takes (state, action) => newState and returns [state, dispatch].",
    why: "Better than multiple useState calls when next state depends on previous state or when state transitions follow clear action patterns.",
    code: `type Action = { type: 'inc' } | { type: 'reset' };
function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'inc': return state + 1;
    case 'reset': return 0;
  }
}
const [count, dispatch] = useReducer(reducer, 0);
dispatch({ type: 'inc' });`,
  },
  {
    name: "useLayoutEffect",
    info: "Same signature as useEffect but fires synchronously after all DOM mutations and before the browser paints.",
    why: "Use when you need to read layout (element size, scroll position) or mutate the DOM before the user sees the painted frame — prevents visual flicker.",
    code: `useLayoutEffect(() => {
  const { height } = ref.current!.getBoundingClientRect();
  setHeight(height); // applied before paint
}, []);`,
  },
  {
    name: "useId",
    info: "Generates a stable, unique ID that is consistent between server and client renders.",
    why: "Needed for accessibility attributes (htmlFor, aria-describedby) when multiple instances of a component must each have a unique ID.",
    code: `const id = useId();
return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} type="email" />
  </>
);`,
  },
  {
    name: "useTransition",
    info: "Marks state updates as non-urgent transitions, letting React keep the UI responsive while deferring expensive re-renders.",
    why: "Prevents input lag when a state update triggers a heavy render — the UI stays interactive while React works on the update in the background.",
    code: `const [isPending, startTransition] = useTransition();

function handleSearch(q: string) {
  startTransition(() => setQuery(q)); // non-urgent
}

return isPending ? <Spinner /> : <Results query={query} />;`,
  },
  {
    name: "Custom Hook",
    info: "A function that starts with 'use' and calls other hooks. Extracts reusable stateful logic into a standalone function.",
    why: "Eliminates duplicated hook logic across components — keeps each component lean and makes logic independently testable.",
    code: `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
  },
];

export default hooks;
