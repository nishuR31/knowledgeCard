import type { KnowledgeCard } from './hooks';

const theory: KnowledgeCard[] = [
  {
    name: "Reconciliation",
    info: "React's algorithm for diffing two virtual DOM trees to compute the minimal set of real DOM mutations needed. It compares elements by type and key, re-using existing nodes wherever possible.",
    why: "Direct DOM manipulation is slow. Reconciliation lets React batch and minimise changes, making updates efficient even in complex UIs.",
    code: `// React re-uses the DOM node because type matches
<div className="a" />  →  <div className="b" />  // attribute update only

// React unmounts + remounts because type changed
<div />  →  <span />   // full replace

// key helps React track list items across re-orders
items.map(item => <Card key={item.id} {...item} />)`,
  },
  {
    name: "Virtualization",
    info: "Only rendering the DOM nodes that are currently visible in the viewport. As the user scrolls, offscreen nodes are unmounted and new ones are mounted in their place.",
    why: "Rendering 100,000 rows in a table would freeze the browser. Virtualization keeps the DOM node count small and constant regardless of data size.",
    code: `import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={100_000}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>Row {index}</div>
  )}
</FixedSizeList>`,
  },
  {
    name: "Virtual DOM",
    info: "A lightweight in-memory representation of the real DOM tree. React keeps two trees (current and work-in-progress), diffs them, and applies only the resulting patches to the real DOM.",
    why: "Touching the real DOM is expensive. The virtual DOM allows React to compute changes in JavaScript (fast) and batch them before committing (slow DOM work done once).",
    code: `// React.createElement produces a virtual DOM node (plain object)
const vnode = React.createElement('div', { className: 'box' }, 'Hello');
// { type: 'div', props: { className: 'box', children: 'Hello' }, ... }

// JSX is syntactic sugar for the same call
const vnode2 = <div className="box">Hello</div>;`,
  },
  {
    name: "Fiber Architecture",
    info: "React 16+'s internal reconciler. Each component maps to a Fiber node (a plain JS object). Work is split into units that can be paused, resumed, or abandoned, enabling concurrent features.",
    why: "The old stack-based reconciler was synchronous and couldn't be interrupted — long renders would drop frames. Fiber makes React's work interruptible and prioritisable.",
    code: `// You don't interact with Fiber directly, but its effects surface through:
// 1. Concurrent Mode (React 18)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);

// 2. Transitions — low-priority updates
const [isPending, startTransition] = useTransition();
startTransition(() => setQuery(value));`,
  },
  {
    name: "React Rendering Phases",
    info: "React splits work into Render phase (pure — builds the new Fiber tree, no side effects) and Commit phase (impure — applies DOM changes, runs effects). Strict Mode double-invokes render to expose impurities.",
    why: "Understanding the phases explains why effects run after paint, why rendering must be pure, and why Concurrent Mode can safely abort renders mid-flight.",
    code: `// Render phase — pure, may be called multiple times
function Component() {
  // ✅ pure: no side effects here
  return <div>{computedValue}</div>;
}

// Commit phase — effects fire here
useEffect(() => {
  // ✅ side-effects safe here
  analytics.track('mounted');
}, []);`,
  },
  {
    name: "Controlled vs Uncontrolled Components",
    info: "Controlled: form state lives in React (useState), the input value is driven by props. Uncontrolled: state lives in the DOM, accessed imperatively via refs.",
    why: "Controlled gives React full visibility into form state for validation, conditional logic, and submission. Uncontrolled is simpler for file inputs or integrating third-party libraries.",
    code: `// Controlled
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />

// Uncontrolled
const ref = useRef<HTMLInputElement>(null);
<input ref={ref} defaultValue="hello" />
// read: ref.current.value`,
  },
  {
    name: "Lifting State Up",
    info: "When two sibling components need to share state, move that state to their closest common ancestor. The ancestor owns the state and passes it down as props.",
    why: "React has one-way data flow — siblings cannot share state directly. Lifting up is the canonical React pattern for sibling communication.",
    code: `function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <InputA value={value} onChange={setValue} />
      <DisplayB value={value} />
    </>
  );
}`,
  },
  {
    name: "Memoization & React.memo",
    info: "React.memo wraps a component and skips re-rendering if its props are shallowly equal to the previous render's props.",
    why: "By default React re-renders every child when a parent re-renders. Memoization is the escape hatch to prevent unnecessary child renders when their data hasn't changed.",
    code: `const ExpensiveList = React.memo(({ items }: { items: string[] }) => {
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
});

// Also: useMemo for values, useCallback for functions
const handler = useCallback(() => doThing(id), [id]);`,
  },
  {
    name: "Error Boundaries",
    info: "Class components that implement componentDidCatch and getDerivedStateFromError to catch JavaScript errors in their child component tree and render a fallback UI.",
    why: "Without error boundaries, a runtime error in any component crashes the entire app. Error boundaries isolate failures to subtrees.",
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error(err, info);
  }
  render() {
    if (this.state.hasError) return <h2>Something went wrong.</h2>;
    return this.props.children;
  }
}

<ErrorBoundary><ChildThatMightCrash /></ErrorBoundary>`,
  },
  {
    name: "Code Splitting & Lazy Loading",
    info: "React.lazy() and Suspense let you split your bundle and load components on demand, reducing the initial JS payload.",
    why: "Shipping one monolithic bundle slows first-load. Code splitting defers loading heavy components until they are actually needed.",
    code: `const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}`,
  },
];

export default theory;
