import type { KnowledgeCard } from './hooks';

const tanStack: KnowledgeCard[] = [
  {
    name: "useQuery",
    info: "Fetches and caches server data. Tracks loading/error/success states automatically. Deduplicates simultaneous requests for the same query key.",
    why: "Eliminates manual useState/useEffect data-fetching boilerplate and gives you caching, background refetching, and stale-while-revalidate for free.",
    code: `const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  staleTime: 1000 * 60 * 5, // fresh for 5 minutes
});

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage />;
return <UserCard data={data} />;`,
  },
  {
    name: "useMutation",
    info: "Handles POST/PUT/DELETE operations. Provides onSuccess, onError, and onSettled callbacks and can invalidate queries to trigger refetches.",
    why: "Makes write operations first-class — optimistic updates, error rollback, and cache invalidation all handled declaratively.",
    code: `const { mutate, isPending } = useMutation({
  mutationFn: (newPost: Post) =>
    fetch('/api/posts', { method: 'POST', body: JSON.stringify(newPost) }),
  onSuccess: () => {
    // Invalidate and refetch the posts list
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onError: (err) => toast.error(err.message),
});

<button onClick={() => mutate({ title, body })} disabled={isPending}>
  {isPending ? 'Saving…' : 'Save Post'}
</button>`,
  },
  {
    name: "QueryClient & QueryClientProvider",
    info: "QueryClient holds the cache and configuration. QueryClientProvider makes it available to the entire component tree via context.",
    why: "Centralises all server state — any component can access cached data or trigger refetches without prop drilling.",
    code: `const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,       // data fresh for 1 min
      gcTime: 5 * 60_000,     // kept in cache for 5 min
      retry: 2,
    },
  },
});

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);`,
  },
  {
    name: "Query Keys",
    info: "Arrays used as unique identifiers for each query. TanStack Query uses deep equality on the key to deduplicate, cache, and invalidate queries.",
    why: "Structured keys make granular invalidation easy — e.g. invalidate all user queries or only the query for user 42.",
    code: `// Simple key
useQuery({ queryKey: ['todos'], queryFn: fetchTodos });

// With params — separate cache entry per userId
useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId) });

// Invalidate all 'user' queries
queryClient.invalidateQueries({ queryKey: ['user'] });

// Invalidate specific user
queryClient.invalidateQueries({ queryKey: ['user', 42] });`,
  },
  {
    name: "Optimistic Updates",
    info: "Immediately update the UI before the server confirms the change. Roll back to the previous state on error.",
    why: "Makes write operations feel instant — critical for interactive UIs like todo lists or social features.",
    code: `const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async newTodo => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old: Todo[]) =>
      old.map(t => t.id === newTodo.id ? { ...t, ...newTodo } : t)
    );
    return { previous }; // snapshot for rollback
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(['todos'], context?.previous); // rollback
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
});`,
  },
  {
    name: "Infinite Queries",
    info: "useInfiniteQuery fetches paginated data and accumulates pages in the cache. Provides fetchNextPage and hasNextPage for scroll-based loading.",
    why: "Standard pagination resets the list on page change. Infinite queries accumulate items, enabling 'load more' and infinite scroll patterns.",
    code: `const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) =>
      fetch(\`/api/posts?page=\${pageParam}\`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });

const allPosts = data?.pages.flatMap(p => p.items) ?? [];`,
  },
  {
    name: "Prefetching",
    info: "Load query data before the component that needs it mounts — on hover, route change, or app start.",
    why: "Eliminates loading spinners for predictable navigations by warming the cache in advance.",
    code: `// On hover — prefetch before the user clicks
async function handleHover(userId: string) {
  await queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 10_000,
  });
}

<li onMouseEnter={() => handleHover(user.id)}>
  <Link to={\`/users/\${user.id}\`}>{user.name}</Link>
</li>`,
  },
  {
    name: "TanStack Table",
    info: "A headless, type-safe table and data-grid library. Manages sorting, filtering, pagination, grouping, and virtualisation as pure state — you bring your own markup.",
    why: "Decouples table logic from presentation so you can style freely. Handles tens of thousands of rows efficiently with column virtualisation.",
    code: `const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

return (
  <table>
    <thead>
      {table.getHeaderGroups().map(hg => (
        <tr key={hg.id}>
          {hg.headers.map(h => (
            <th key={h.id} onClick={h.column.getToggleSortingHandler()}>
              {flexRender(h.column.columnDef.header, h.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);`,
  },
];

export default tanStack;
