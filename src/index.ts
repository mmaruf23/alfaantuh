import { Hono } from "hono";
import { env, psm } from "./app/router";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("psm", psm);

app.route("env", env);

export default app;
