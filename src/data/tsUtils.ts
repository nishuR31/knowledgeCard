import type { KnowledgeCard } from './hooks';

const tsUtils: KnowledgeCard[] = [
  {
    name: "Type vs Interface",
    info: "Both describe object shapes. Interfaces can be merged (declaration merging) and are better for public API shapes. Types can represent unions, intersections, mapped types, and primitives.",
    why: "Choosing correctly prevents surprising behaviour — accidentally merging an interface, or being unable to extend a union type.",
    code: `// Interface — mergeable, extendable
interface User { id: number; name: string; }
interface User { email: string; } // merged ✅

// Type — unions & computed types
type Status = 'active' | 'inactive' | 'banned';
type AdminUser = User & { role: 'admin' };
type NullableUser = User | null;`,
  },
  {
    name: "Generics",
    info: "Type parameters that make components and functions reusable across types while preserving type safety. Written as <T> (or <T extends SomeType>).",
    why: "Avoid duplicating logic for every type. A single generic function replaces dozens of overloaded versions.",
    code: `// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]);    // n: number
const s = first(['a', 'b']);   // s: string

// Generic React component
function List<T extends { id: string }>({ items }: { items: T[] }) {
  return <ul>{items.map(i => <li key={i.id}>{JSON.stringify(i)}</li>)}</ul>;
}`,
  },
  {
    name: "Utility Types",
    info: "Built-in generic types that transform existing types: Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters.",
    why: "Avoid duplicating type definitions — derive new types from existing ones to keep everything in sync automatically.",
    code: `interface User { id: number; name: string; email: string; age?: number; }

type PartialUser = Partial<User>;           // all optional
type RequiredUser = Required<User>;         // all required
type UserPreview = Pick<User, 'id' | 'name'>; // subset
type NoEmail = Omit<User, 'email'>;         // minus email
type Lookup = Record<string, User>;         // dictionary
type ReadonlyUser = Readonly<User>;         // immutable`,
  },
  {
    name: "Union & Intersection Types",
    info: "Union (A | B) = value can be either type. Intersection (A & B) = value must satisfy both types. Use discriminated unions (shared literal field) for exhaustive type narrowing.",
    why: "Model real-world data accurately — a response is either success or error; a user is both a Person and an Employee.",
    code: `// Discriminated union — exhaustive switch
type Result<T> =
  | { status: 'ok'; data: T }
  | { status: 'error'; message: string };

function handle<T>(result: Result<T>) {
  switch (result.status) {
    case 'ok':    return result.data;     // narrowed
    case 'error': return result.message;  // narrowed
  }
}

// Intersection
type Employee = Person & { company: string; salary: number };`,
  },
  {
    name: "Type Guards & Narrowing",
    info: "typeof, instanceof, in, and user-defined type guard functions (is SomeType) narrow a broad type to a specific one inside a conditional block.",
    why: "TypeScript tracks control flow — proper narrowing eliminates runtime errors from accessing properties that don't exist on all union members.",
    code: `// typeof guard
function padLeft(value: string | number) {
  if (typeof value === 'number') return ' '.repeat(value); // narrowed
  return value; // string
}

// User-defined type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

// in guard
type Cat = { meow(): void };
type Dog = { bark(): void };
function speak(animal: Cat | Dog) {
  if ('meow' in animal) animal.meow(); else animal.bark();
}`,
  },
  {
    name: "Mapped Types",
    info: "Create new types by iterating over the keys of an existing type and applying a transformation. Basis for utility types like Partial, Readonly, Required.",
    why: "Generate entire families of related types programmatically — avoids copy-pasting and keeps derived types automatically in sync.",
    code: `// Make all properties optional
type Optional<T> = { [K in keyof T]?: T[K] };

// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Map values to a different type
type Getters<T> = { [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K] };

// Example
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; ... }`,
  },
  {
    name: "Template Literal Types",
    info: "Construct string literal types using template syntax. Combine with union types to produce all combinations of string patterns.",
    why: "Type CSS property names, event names, API routes, or i18n keys at the type level — catches typos at compile time instead of runtime.",
    code: `type Direction = 'top' | 'right' | 'bottom' | 'left';
type Padding = \`padding-\${Direction}\`;
// 'padding-top' | 'padding-right' | 'padding-bottom' | 'padding-left'

type EventName = 'click' | 'change' | 'focus';
type Handler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onChange' | 'onFocus'

function setStyle(prop: Padding, value: string) { /* ... */ }
setStyle('padding-top', '16px');   // ✅
setStyle('padding-none', '16px');  // ❌ type error`,
  },
  {
    name: "as const & satisfies",
    info: "'as const' makes all values readonly literals (no widening). 'satisfies' checks a value against a type without losing the inferred literal type.",
    why: "'as const' enables exhaustive pattern matching. 'satisfies' combines type-checking with type inference — best of both worlds.",
    code: `// as const — infer literal types
const ROUTES = {
  home: '/',
  about: '/about',
} as const;
type Route = typeof ROUTES[keyof typeof ROUTES]; // '/' | '/about'

// satisfies — check type but keep inference
const palette = {
  red: [255, 0, 0],
  blue: '#0000ff',
} satisfies Record<string, string | number[]>;

// palette.red is number[] (not string | number[])
palette.red.map(v => v * 2); // ✅`,
  },
];

export default tsUtils;
