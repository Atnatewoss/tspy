Celery is the most widely used Python task queue. It supports Redis and RabbitMQ brokers, scheduled tasks, retries, and task chains — the plugin scaffolds a worker entrypoint under `jobs/`.

## Compose the plugin

```ts
// tspy.config.ts
import { defineConfig } from "tspy";
import { celery } from "@tspy/celery";

export default defineConfig({
  jobs: celery({ broker: "redis://localhost:6379" }),
});
```

The broker value is configuration — use `redis://...` or `amqp://...` for Redis or RabbitMQ. Switching brokers in development versus production changes a URL, not code.

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
  jobs.enqueue("tasks.send_welcome_email", args=[email]);
  return { ok: true };
});
```

## Running the worker

```bash
cd my-app
celery -A jobs worker --loglevel=info
```

## Good to know

- Celery handles retries, scheduled tasks, and task chains out of the box.
- Supported brokers: Redis and RabbitMQ (see the broker pages).