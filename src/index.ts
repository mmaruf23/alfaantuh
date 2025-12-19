import { cors } from "hono/cors";
import { app } from "@/app/factory";
import { psm, store } from "@/app/router";
import { env } from "cloudflare:workers";
import type { ApiResponse } from "@/types";

app.use("/psm/*", cors({ origin: [env.ORIGIN], allowMethods: ["GET"] }));
app.use("/info/*", cors({ origin: [env.ORIGIN], allowMethods: ["GET"] }));

app.route("psm", psm);
app.route("info", store);
app.notFound(async (c) => {
  const response: ApiResponse = { success: false, code: 404, message: "not found" };
  return c.json(response, response.code);
});

export default app;
