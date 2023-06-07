const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const EXT_PORT = 8000;
const FLUTTER_PORT = 3000;
const BACKEND_PORT = 5000;

const app = express();

app.use(
  createProxyMiddleware({
    changeOrigin: true,
    target: "http://localhost:8000", // shouldn't matter
    router: {
      [`localhost:${EXT_PORT}/api`]: `http://localhost:${BACKEND_PORT}`, // API on 8081 should support /api/* paths
      [`localhost:${EXT_PORT}`]: `http://127.0.0.1:${FLUTTER_PORT}` // everything else will be proxied to flutter on 8082
    }
  })
);

app.listen(EXT_PORT, () => {
  console.log(
    "Server listening on: " +
      EXT_PORT +
      `\nRun flutter with: flutter run -d chrome --web-port ${FLUTTER_PORT} --web-hostname 127.0.0.1`
  );
});