const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const action = process.argv[2] || 'start';
const pidFile = path.join(os.tmpdir(), 'claude_screen_border.pid');

function readPid() {
  try {
    return Number(fs.readFileSync(pidFile, 'utf8').trim());
  } catch {
    return null;
  }
}

function isRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function stop() {
  const pid = readPid();
  if (isRunning(pid)) {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {}
  }
  try {
    fs.unlinkSync(pidFile);
  } catch {}
}

function start() {
  const existing = readPid();
  if (isRunning(existing)) return;

  let electronPath;
  try {
    electronPath = require('electron');
  } catch {
    console.error('Electron is not installed. Run: npm install');
    process.exit(1);
  }

  const child = spawn(electronPath, ['border-main.js'], {
    detached: true,
    stdio: 'ignore',
    cwd: process.cwd(),
    env: {
      ...process.env,
      ELECTRON_DISABLE_SECURITY_WARNINGS: 'true',
    },
    windowsHide: true,
  });

  child.unref();
  fs.writeFileSync(pidFile, String(child.pid), 'utf8');
}

if (action === 'stop' || action === 'idle' || action === 'off') {
  stop();
  process.exit(0);
}

if (action === 'start' || action === 'working' || action === 'input') {
  stop();
  start();
  process.exit(0);
}

console.error(`Unknown action: ${action}`);
process.exit(1);
