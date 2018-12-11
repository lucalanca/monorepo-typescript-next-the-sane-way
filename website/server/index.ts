import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';

// A couple of warnings/info
if (!process.env.PORT) {
  console.info('[INFO] No PORT environment variable specified, default to 3000');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const nextHandler = app.getRequestHandler();

console.log('Checking auto .env injection:');
console.log('\tprocess.env.NEXT_SERVER_TEST_1: ', process.env.NEXT_SERVER_TEST_1);
console.log('\tprocess.env.NEXT_STATIC_TEST_1: ', process.env.NEXT_STATIC_TEST_1);
console.log('\tprocess.env.NEXT_PUBLIC_TEST_1: ', process.env.NEXT_PUBLIC_TEST_1);

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      if (!req.url) {
        console.warn(`[WARN] No url found in request:\n${req.headers}`);
        return;
      }

      const parsedUrl = parse(req.url, true);

      return nextHandler(req, res, parsedUrl);
    })
      .listen(port, (err: Error) => {
        if (err) throw new Error(`[ERROR] Error when creating the HTTP server:\n${err}`);
        console.log(`> Ready on http://localhost:${port}`);
      });
  })
  .catch((err: Error) => {
    console.log(`[ERROR] Error when preparing Next:\n${err}`);
  });
