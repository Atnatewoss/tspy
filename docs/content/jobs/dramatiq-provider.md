Dramatiq is a fast, reliable task-processing library with a simpler API than Celery. It supports Redis and RabbitMQ brokers, with built-in retries, rate limiting, and priority queues.

## Compose the plugin

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { dramatiq } from "@tspy/dramatiq";

export default defineConfig({
  jobs: dramatiq({ broker: "redis://localhost:6379" }),
});
```

The broker value is configuration — use `redis://...` or `amqp://...` for Redis or RabbitMQ.

## Defining a task

Tasks live under `jobs/` in Python:

```python
# jobs/tasks.py
from tspy.jobs import task

@task
def send_welcome_email(user_email: str) -> None:
    print(f"Welcome email sent to {user_email}")
```

## Enqueue from the server

The enqueue client is exposed as the `jobs` export on `tspy/server`:

```ts
// server/api/signup.ts
import { jobs } from "tspy/server";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);
  jobs.enqueue("send_welcome_email", email);
  return { ok: true };
});
```

## Running the worker

```bash
cd my-app
dramatiq jobs.tasks
```

## Good to know

- Actor-style API: decorators, autodiscovery, and built-in retries with backoff.
- Supported brokers: Redis and RabbitMQ (see the broker pages).