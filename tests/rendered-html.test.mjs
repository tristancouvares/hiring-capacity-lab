import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the public portfolio experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hiring Capacity Lab/);
  assert.match(html, /When hiring demand grows faster than/);
  assert.match(html, /100% synthetic data/);
  assert.match(html, /Scenario Lab/);
  assert.match(html, /No employer information or production records are used/);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});

test("keeps public data and portfolio metadata explicit", async () => {
  const [data, layout, page, readme] = await Promise.all([
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(data, /peakDemand = 31/);
  assert.match(layout, /Tristan Couvares/);
  assert.match(layout, /\/og\.png/);
  assert.match(page, /<CapacityLab/);
  assert.match(readme, /synthetic/i);
});
