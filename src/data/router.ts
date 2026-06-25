import type { KnowledgeCard } from './hooks';

const router: KnowledgeCard[] = [
  {
    name: "BrowserRouter & Routes",
    info: "BrowserRouter provides the routing context using the HTML5 History API. Routes matches the current URL to its child Route components and renders the first match.",
    why: "Enables a multi-page experience inside a single-page app — no full-page reloads. The History API keeps the URL in sync without server round-trips.",
    code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/users/:id" element={<UserProfile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>`,
  },
  {
    name: "useNavigate",
    info: "Returns a navigate function for programmatic navigation. Replaces the old useHistory hook. Supports push (default) and replace modes, and relative paths.",
    why: "Lets components redirect users after events (form submit, login, logout) without rendering a <Link> or <Navigate> component.",
    code: `const navigate = useNavigate();

// push a new entry
navigate('/dashboard');

// replace current entry (no back button)
navigate('/login', { replace: true });

// go back
navigate(-1);

// pass state
navigate('/order/success', { state: { orderId: 42 } });`,
  },
  {
    name: "useParams",
    info: "Reads dynamic URL parameters defined with :paramName in the route path. Returns a Record<string, string>.",
    why: "Avoids manually parsing window.location — React Router extracts and types parameters for you.",
    code: `// Route: /users/:id/posts/:postId
<Route path="/users/:id/posts/:postId" element={<Post />} />

// Component
function Post() {
  const { id, postId } = useParams();
  return <p>User {id}, Post {postId}</p>;
}`,
  },
  {
    name: "useLocation",
    info: "Returns the current location object containing pathname, search (query string), hash, and state. Re-renders the component whenever the URL changes.",
    why: "Useful for analytics (track page views), reading query params, or accessing state passed via navigate().",
    code: `const location = useLocation();

// pathname: '/products'
// search:   '?sort=price&order=asc'
// state:    { fromCart: true }

const params = new URLSearchParams(location.search);
const sort = params.get('sort'); // 'price'`,
  },
  {
    name: "Nested Routes & Outlet",
    info: "<Outlet /> renders the matched child route inside a parent layout. Nested routes share the parent's URL prefix and can share layout (nav, sidebar).",
    why: "Avoids duplicating layout code across pages — the shell (navbar, sidebar) renders once; only the content area swaps.",
    code: `// Route config
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
  <Route path="profile" element={<Profile />} />
</Route>

// DashboardLayout.tsx
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main><Outlet /></main> {/* child renders here */}
    </div>
  );
}`,
  },
  {
    name: "Protected Routes",
    info: "A wrapper route component that checks authentication state and either renders the child or redirects to login using <Navigate>.",
    why: "Prevents unauthenticated users from accessing restricted pages at the router level — a single place to enforce auth, no duplication.",
    code: `function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Usage
<Route path="/admin" element={
  <PrivateRoute><AdminDashboard /></PrivateRoute>
} />`,
  },
  {
    name: "Link & NavLink",
    info: "<Link> renders an accessible <a> tag without a full page reload. <NavLink> adds an active class/style when the current URL matches its href.",
    why: "Replaces plain <a href> so navigation stays client-side. NavLink makes highlighting active menu items trivial.",
    code: `import { Link, NavLink } from 'react-router-dom';

// Basic link
<Link to="/about">About</Link>

// NavLink with active styling
<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? 'font-bold text-primary' : 'text-muted'
  }
>
  Dashboard
</NavLink>`,
  },
  {
    name: "Lazy Route Loading",
    info: "Combine React.lazy and Suspense with route definitions to code-split at the route boundary — each page is a separate JS chunk.",
    why: "The main bundle only contains the landing page. Other routes load their JS on first visit, drastically reducing initial load time.",
    code: `const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

<Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/dashboard"
    element={
      <Suspense fallback={<PageSpinner />}>
        <Dashboard />
      </Suspense>
    }
  />
</Routes>`,
  },
];

export default router;
