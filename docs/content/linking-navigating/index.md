## Link

Use `<Link to="/docs/...">Link</Link>` for client-side navigation — no
page reloads, prefetched on hover, lazy segments.

```tsx
import { Link } from "react-router";

<Link to="/about">About</Link>
<Link to="/blog/first-post">First post</Link>
```

## Navigate

For imperative navigation after an action, use `useNavigate()`. It is
react-router's API, so anything you know carries over.

```tsx
import { useNavigate } from "react-router";

function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit() {
    await login(credentials);
    navigate("/dashboard");
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```
