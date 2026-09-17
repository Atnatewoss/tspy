## The problem

React Router uses `<Outlet />` for nested layouts. But TSPY lets you
write layouts with standard React `{ children }` — no `<Outlet />`
needed.

## The adapter

TSPY wraps your layout component in a `TSPYLayoutAdapter` that converts
`{ children }` to `<Outlet />`:

```tsx
// You write:
export default function Layout({ children }) {
  return (
    <div>
      <nav>...</nav>
      {children}
    </div>
  );
}

// TSPY adapts it to:
<Layout>
  <Outlet />
</Layout>
```

## Why this matters

- **Familiar API** — `{ children }` is standard React
- **No React Router leak** — you don't import `Outlet` in your layouts
- **Movable boundary** — SSR can be added later without rewriting layouts
- **Consistent** — every layout works the same way
