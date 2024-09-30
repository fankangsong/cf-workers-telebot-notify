import { Hono } from "hono";

const TELEGRAM_API = "https://api.telegram.org/bot";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
  const { token, text } = c.req.query();

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
