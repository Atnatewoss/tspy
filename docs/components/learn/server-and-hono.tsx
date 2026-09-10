import { H3, P, CodeBlock, Callout, Table, Code, Checklist, Strong, Ol, A } from "../section-content";

export function ServerAndHono() {
  return (
    <>
      <H3 id="nitro-and-hono">Nitro and Hono</H3>
      <P>
        Nitro is TSPY's server runtime. It handles the HTTP layer, manages
        server-side builds, and provides the cross-platform deployment target
        system. Nitro itself uses <Code>h3</Code> as its low-level HTTP
        toolkit.
      </P>
      <P>
        TSPY wires Hono inside Nitro as the primary request handler. The
        architecture is:
      </P>
      <CodeBlock title="Server stack">
{`HTTP request
      --
   Nitro
      --
   Hono
      --
 server/ routes (TSPY filesystem convention)`}
      </CodeBlock>
      <P>
        Neither Nitro nor Hono is exposed in the developer API. A TSPY developer
        writes route handlers in <Code>server/</Code> using TSPY's own syntax.
        The underlying request handling is an implementation detail.
      </P>

      <H3 id="why-hono">Why Hono, not Fastify</H3>
      <P>
        The decision between Hono and Fastify comes down to one question: where
        does the code need to run?
      </P>
      <Table
        head={["Concern", "Hono", "Fastify"]}
        rows={[
          ["Runtime", "Web Standard APIs (Request/Response)", "Node.js core (http, stream)"],
          ["Edge compatibility", "Native - runs on Workers, Deno, Bun, Node", "Node.js only"],
          ["Integration with Nitro", "Natural - Nitro is also Web Standard based", "Requires Node.js adapter"],
          ["Bundle size", "Tiny (under 15kb)", "Larger, more dependencies"],
          ["API surface", "Simple, composable, close to standards", "Plugin-heavy, more abstractions"],
        ]}
      />
      <P>
        Nitro's value is cross-platform server output. Wiring Fastify inside it
        would limit every TSPY application to Node.js - defeating the point of
        using Nitro at all. Hono is built on the same Web Standard APIs that
        Nitro uses natively, making the integration clean and the resulting
        server deployable everywhere Nitro supports.
      </P>
      <Callout>
        Hono is an internal detail. TSPY does not expose Hono types through its
        public API. Future framework server route syntax will be defined by TSPY,
        compiled down to Hono handlers internally.
      </Callout>
    </>
  );
}
