import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API endpoints can go here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const distPath = path.join(process.cwd(), 'dist');

  // We are in production if NODE_ENV is production OR if dist index.html exists and we can't or don't want to load Vite.
  let useVite = false;
  if (process.env.NODE_ENV !== "production") {
    try {
      // Only use Vite if we are running the source typescript file directly (not the compiled cjs)
      // and we are not in a production build.
      const hasIndexHtml = fs.existsSync(path.join(process.cwd(), 'index.html'));
      if (hasIndexHtml) {
        useVite = true;
      }
    } catch (e) {
      useVite = false;
    }
  }

  // Serve static files and integrate Vite middleware
  if (useVite) {
    try {
      const { createServer: createViteServer } = await (eval('import("vite")') as any);
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite development middleware integrated.");
    } catch (err) {
      console.warn("Failed to load Vite, falling back to static serving:", err);
      useVite = false;
    }
  }

  if (!useVite) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static files from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
