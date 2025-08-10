import { startServer } from '~/lib';

describe('startServer', () => {
  it('should create a new http server', async () => {
    const port = 9000;
    const { app, server } = await startServer(port, {});
    app.get('/', (_req, res) => {
      res.send('Hello World');
    });
    let text = '';
    try {
      const res = await fetch('http://localhost:' + port.toString());
      if (res.status !== 200) throw new Error('ERROR');
      text = await res.text();
    } catch {}
    server.close();
    expect(text).toBe('Hello World');
  });
});
