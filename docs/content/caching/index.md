## The honest baseline

The honest baseline: caching lives where the ecosystem puts it — HTTP
caching in Nitro, client caching in React Query — until the framework
earns a layer of its own.

## HTTP caching

Nitro handles HTTP caching through standard headers. Set `Cache-Control`
headers in your API routes:

```ts server/api/posts.ts
export default defineEventHandler(() => {
  setResponseHeaders(event, {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  });
  return posts;
});
```

## Client caching

React Query (or SWR) handles client-side caching. It manages stale
state, background refetching, and optimistic updates:

```tsx
import { useQuery } from "@tanstack/react-query";

function Posts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Spinner />;
  return data.map((post) => <Post key={post.id} {...post} />);
}
```

Neither layer pretends to be a cache for the other. HTTP caching handles
server responses. Client caching handles UI state. Both work today.
