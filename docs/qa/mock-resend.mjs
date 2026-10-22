// Test-only preload: intercepts the server's call to api.resend.com, records it, and answers like Resend. Nothing is sent.
import { writeFileSync } from "node:fs";
const real = globalThis.fetch;
globalThis.fetch = async (input, init = {}) => {
  const url = typeof input === "string" ? input : input.url;
  if (url.startsWith("https://api.resend.com/")) {
    writeFileSync(process.env.MOCK_OUT, JSON.stringify({ url, auth: (init.headers?.Authorization ?? "").slice(0, 12), body: JSON.parse(init.body) }, null, 2));
    return new Response(JSON.stringify({ id: "mock-email-id" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return real(input, init);
};
