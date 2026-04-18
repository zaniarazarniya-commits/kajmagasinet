/**
 * Single child process: one `node …/next dev` only.
 * Default: --webpack (fewer runaway workers than Turbopack on some Windows + OneDrive setups).
 * Turbopack: npm run dev:turbo
 */
import { spawn, execFileSync } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PORT = 3000;

const argv = process.argv.slice(2);
const useTurbo = argv.includes("--turbo") || argv.includes("--turbopack");

/** One PowerShell invocation; stops whatever listens on PORT (old Next dev). */
function freePortWindows() {
  if (process.platform !== "win32") return;
  try {
    execFileSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `$p = Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; if ($p) { $p | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue } }`,
      ],
      { stdio: "ignore", windowsHide: true }
    );
  } catch {
    /* ignore — port may be free or cmdlet unavailable */
  }
}

function freePortUnix() {
  if (process.platform === "win32") return;
  try {
    execFileSync("sh", ["-c", `f=$(lsof -ti:${PORT} 2>/dev/null); [ -n "$f" ] && kill -9 $f`], {
      stdio: "ignore",
    });
  } catch {
    /* ignore */
  }
}

function freePort() {
  if (process.platform === "win32") freePortWindows();
  else freePortUnix();
}

function main() {
  const logFile = path.join(root, "..", "debug-df5fc8.log");
  const tStart = Date.now();
  // #region agent log
  function dbgDev(payload) {
    const line =
      JSON.stringify({
        sessionId: "df5fc8",
        timestamp: Date.now(),
        runId: "dev-startup",
        ...payload,
      }) + "\n";
    try {
      fs.appendFileSync(logFile, line);
    } catch {
      /* ignore */
    }
  }
  // #endregion

  freePort();
  // #region agent log
  dbgDev({
    location: "scripts/dev.mjs:after-freePort",
    message: "freePort completed",
    data: { freePortMs: Date.now() - tStart, platform: process.platform },
    hypothesisId: "H1",
  });
  // #endregion

  const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const nextArgs = ["dev", "-p", String(PORT)];
  if (useTurbo) {
    nextArgs.push("--turbo");
  } else {
    nextArgs.push("--webpack");
  }

  const child = spawn(process.execPath, [nextCli, ...nextArgs], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      // Next/watchpack: avoid polling storm on synced folders unless you explicitly need it
      WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? "false",
    },
    windowsHide: true,
  });
  // #region agent log
  dbgDev({
    location: "scripts/dev.mjs:after-spawn",
    message: "next dev process spawned",
    data: { msSinceScriptStart: Date.now() - tStart, useTurbo },
    hypothesisId: "H1",
  });
  // #endregion

  child.on("exit", (code, signal) => {
    if (signal) process.exit(1);
    process.exit(code ?? 0);
  });
}

main();
