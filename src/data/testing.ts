import type { KnowledgeCard } from './hooks';

const testing: KnowledgeCard[] = [
  {
    name: "Vitest Basics",
    info: "Vitest is a Vite-native unit testing framework compatible with Jest's API. Uses esbuild for transforms, making it significantly faster than Jest on Vite projects.",
    why: "Shares Vite's config, plugins, and module resolution — no separate babel setup. Watch mode is near-instant.",
    code: `// sum.ts
export const sum = (a: number, b: number) => a + b;

// sum.test.ts
import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  it('handles negatives', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});`,
  },
  {
    name: "React Testing Library",
    info: "Tests components from the user's perspective — queries by role, label, and text rather than implementation details like class names or state.",
    why: "Tests that query by role/label survive refactors. Tests that query by className break on every style change. RTL guides you toward accessible markup.",
    code: `import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count on click', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});`,
  },
  {
    name: "userEvent",
    info: "More realistic than fireEvent — simulates full browser event sequences (pointerdown → mousedown → click → pointerup) and supports async keyboard typing.",
    why: "Catches bugs that fireEvent misses because real browsers fire a sequence of events, not just one. Essential for testing form interactions.",
    code: `import userEvent from '@testing-library/user-event';

test('fills and submits a form', async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'user@example.com');
  await user.type(screen.getByLabelText(/password/i), 'secret');
  await user.click(screen.getByRole('button', { name: /log in/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'secret',
  });
});`,
  },
  {
    name: "Mocking with vi.fn & vi.mock",
    info: "vi.fn() creates a spy function that records calls. vi.mock() replaces an entire module with auto-mocked or custom implementations.",
    why: "Isolates the unit under test from network calls, databases, and third-party APIs — making tests fast, deterministic, and offline-capable.",
    code: `import { vi, expect } from 'vitest';

// Spy on a function
const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
await fetchUser('1');
expect(fetchUser).toHaveBeenCalledWith('1');
expect(fetchUser).toHaveBeenCalledTimes(1);

// Mock an entire module
vi.mock('../api/users', () => ({
  getUser: vi.fn().mockResolvedValue({ id: 1 }),
}));`,
  },
  {
    name: "MSW — Mock Service Worker",
    info: "Intercepts actual network requests at the Service Worker level (browser) or Node.js http level, returning mocked responses. No code changes needed in the component.",
    why: "The most realistic way to mock APIs — components use the same fetch/axios calls they use in production. Tests remain free of mock-specific imports.",
    code: `import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({ id: params.id, name: 'Alice' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders user name', async () => {
  render(<UserProfile id="1" />);
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});`,
  },
  {
    name: "Snapshot Testing",
    info: "Serialises the rendered output to a text file. On subsequent runs, the output is compared to the stored snapshot — any diff fails the test.",
    why: "Catches unintended UI regressions quickly. Best used for stable, leaf components where intentional updates are infrequent.",
    code: `import { render } from '@testing-library/react';
import { expect } from 'vitest';
import Badge from './Badge';

test('matches snapshot', () => {
  const { container } = render(<Badge label="PRO" variant="primary" />);
  expect(container.firstChild).toMatchSnapshot();
});

// Update snapshots when intentionally changed:
// vitest --update-snapshots`,
  },
  {
    name: "Testing Hooks — renderHook",
    info: "renderHook renders a custom hook in isolation without a full component, returning the current result and an act-wrapped rerender function.",
    why: "Test hook logic directly without building a wrapper component — cleaner tests and clearer failure messages.",
    code: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());

  expect(result.current.count).toBe(1);
});`,
  },
  {
    name: "Testing Async Code",
    info: "waitFor retries an assertion until it passes or times out. findBy* queries are async shorthand for waitFor + getBy. Essential for testing data fetching.",
    why: "Components that fetch data update asynchronously — synchronous assertions would fire before the data arrives, causing false positives or negatives.",
    code: `test('shows users after fetch', async () => {
  render(<UserList />);

  // waitFor retries until assertion passes
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  // findBy is shorthand for waitFor + getBy
  const bob = await screen.findByText('Bob');
  expect(bob).toBeVisible();
});`,
  },
];

export default testing;
