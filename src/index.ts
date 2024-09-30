import { Hono } from "hono";

const TELEGRAM_API = "https://api.telegram.org/bot";
interface Env {
  AUTH_TOKEN: string;
  CHAT_ID: string;
  TELEGRAM_BOT_KEY: string;
}

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

async function getBodyParams(c) {
  if (!["POST", "PUT", "PATCH"].includes(c.req.method)) {
    return {};
  }

  try {
    return await c.req.parseBody();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return {};
  }
}

async function getParams(c) {
  const query = c.req.query();
  const body = await getBodyParams(c);
  return { ...query, ...body };
}

app.all("/", async (c) => {
  const { token, text } = await getParams(c);

  if (!token) return c.text("token is required");
  if (!text) return c.text("text is required");

  const { AUTH_TOKEN, CHAT_ID, TELEGRAM_BOT_KEY } = c.env;

  if (token !== AUTH_TOKEN) {
    return c.text("token is invalid", 400);
  }

  try {
    const res = await fetch(
      `${TELEGRAM_API}${TELEGRAM_BOT_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${text}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log(data);

    return c.text("ok");
  } catch (error) {
    console.log(error);
    return c.text("error", 500);
  }
});

// Export the Hono app
export default app;
