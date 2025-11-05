import { Hono } from 'hono';
import { testRoute } from './router';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
app.route('test', testRoute);

export default app;
