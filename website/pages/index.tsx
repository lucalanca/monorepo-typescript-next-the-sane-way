import * as React from 'react';
import * as Calc from 'shared/utils/calc';

export default () => {
  return (
    <>
      <h1>Hello World</h1>
      <h2>Import from shared</h2>
      <div>5 + 3 = {Calc.add(5, 3)}</div>

      <h2>Automatic .env injection</h2>
      <ul>
        <li>{process.env.NEXT_SERVER_TEST_1} (only the server knows this, watch me blink when the frontend bundle loads)</li>
        <li>{process.env.NEXT_STATIC_TEST_1} (public to the frontend at runtime)</li>
        <li>{process.env.NEXT_PUBLIC_TEST_1} (public to the frontend at build time)</li>
      </ul>
    </>
  );
};
