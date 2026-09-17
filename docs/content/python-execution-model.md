## Runtime

TSPY uses Python for AI and background jobs. The Python runtime is
managed automatically — you don't need to install or configure it.

## Dev versus production

In development, TSPY starts a Python process alongside the Node.js server.
Changes to Python files restart the process automatically.

In production, Python runs as a separate service or container. The
TypeScript server communicates with it over the RPC boundary.

## Deployment

Python services deploy independently. You can run them on the same server
as Node.js, or split them across containers. The RPC boundary stays the
same — only the connection URL changes.
