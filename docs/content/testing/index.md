## Unit tests

Unit tests target pure logic: route parsers, merge behavior, plugin
config resolution, and Python functions. Run them with your existing
test runner alongside the framework's own suite.

```bash
npm test       # TypeScript / client tests
pytest         # Python tests
```

## Integration tests

Integration tests exercise whole slices of the app — a route with auth
middleware, a database-backed API handler, a job that posts through the
broker. They run against the dev server shape, using the same proxy and
runtime wiring your code uses in development.

## End-to-end tests

E2E tests drive the built output the way a real user would, against the
deployment artifact. Because the build contract is stable, the same E2E
suite runs locally and in CI.

## Testing tips

- Test generated callers like any typed function — the proxy is a
  detail, not a contract.
- Keep Python tests in `tests/` next to `ai/` and `jobs/`.
- Mock the broker and model providers, never your own code.