import type { KnowledgeCard } from './hooks';

const redux: KnowledgeCard[] = [
  {
    name: "Redux Core Concepts",
    info: "Redux is a predictable state container. Three principles: single source of truth (one store), state is read-only (only actions change it), changes are pure functions (reducers).",
    why: "Makes state changes traceable and testable — every change is an action object, every result is a new state. Excellent for large apps with complex shared state.",
    code: `// Action
const increment = { type: 'counter/increment' };

// Reducer
function reducer(state = 0, action) {
  switch (action.type) {
    case 'counter/increment': return state + 1;
    default: return state;
  }
}

// Store
const store = createStore(reducer);
store.dispatch(increment);
console.log(store.getState()); // 1`,
  },
  {
    name: "Redux Toolkit — createSlice",
    info: "createSlice generates action creators and action types from a reducer map. Uses Immer internally, so you can write mutating-style code that is converted to immutable updates.",
    why: "Eliminates the boilerplate of hand-writing action types, creators, and switch statements. Immer prevents accidental mutation bugs.",
    code: `import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }, // Immer: safe mutation
    decrement: state => { state.value -= 1; },
    addBy: (state, action) => { state.value += action.payload; },
  },
});

export const { increment, decrement, addBy } = counterSlice.actions;
export default counterSlice.reducer;`,
  },
  {
    name: "configureStore",
    info: "RTK's configureStore sets up Redux DevTools, thunk middleware, and combines reducers automatically.",
    why: "Replaces the verbose createStore + applyMiddleware + composeWithDevTools setup with a single, opinionated call.",
    code: `import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
  },
  {
    name: "useSelector & useDispatch",
    info: "useSelector reads data from the Redux store and subscribes the component to updates. useDispatch returns the store's dispatch function to send actions.",
    why: "The React-Redux hooks API replaces the older connect() HOC — less boilerplate, fully typed, and easier to test.",
    code: `import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { increment } from './counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}`,
  },
  {
    name: "createAsyncThunk",
    info: "Generates a thunk action creator that dispatches pending/fulfilled/rejected lifecycle actions around an async operation.",
    why: "Standardises async state management — no need to manually dispatch loading/success/error actions or write try-catch boilerplate.",
    code: `export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (id: string) => {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json(); // becomes action.payload on fulfilled
  }
);

// Handle in slice
extraReducers: builder => {
  builder
    .addCase(fetchUser.pending, state => { state.loading = true; })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed';
    });
}`,
  },
  {
    name: "RTK Query",
    info: "RTK Query is a data fetching and caching layer built into Redux Toolkit. Defines endpoints (query/mutation) and auto-generates hooks.",
    why: "Eliminates manual loading/error state, caching logic, and refetch management. Handles cache invalidation via tags.",
    code: `const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getUser: builder.query<User, string>({
      query: id => \`/users/\${id}\`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: body => ({ url: '/users', method: 'PATCH', body }),
      invalidatesTags: ['User'], // auto refetch getUser
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = api;`,
  },
  {
    name: "Middleware",
    info: "Redux middleware intercepts every dispatched action before it reaches the reducer. Thunk is the default; custom middleware can log, validate, or transform actions.",
    why: "Keeps side-effects (API calls, logging, analytics) outside reducers and components — centralised and reusable.",
    code: `const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault => getDefault().concat(logger),
});`,
  },
  {
    name: "Normalised State",
    info: "Store entities in a flat lookup table (id → entity) with an array of IDs, rather than nested arrays. RTK provides createEntityAdapter for this.",
    why: "Avoids O(n) array searches, prevents data duplication, and makes updates O(1). Standard practice for lists of server entities.",
    code: `const adapter = createEntityAdapter<User>();

const usersSlice = createSlice({
  name: 'users',
  initialState: adapter.getInitialState(),
  reducers: {
    addUser: adapter.addOne,
    updateUser: adapter.updateOne,
    removeUser: adapter.removeOne,
  },
});

// Selectors
const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.users
);`,
  },
];

export default redux;
