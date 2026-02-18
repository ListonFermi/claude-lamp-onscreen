const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { renderAnimation1 } = require('./animations/animation-1');
const { renderAnimation2 } = require('./animations/animation-2');

const color = process.env.BORDER_COLOR || '#00FF66';
const thickness = Number(process.env.BORDER_THICKNESS || '18');
const opacity = Number(process.env.BORDER_OPACITY || '0.95');
const blurPx = Number(process.env.BORDER_INNER_BLUR || '14');
const animationName = (process.env.BORDER_ANIMATION || 'animation-1').toLowerCase();

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const normalized = clean.length === 3
    ? clean.split('').map((ch) => ch + ch).join('')
    : clean;
  const n = Number.parseInt(normalized, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function pickDisplay() {
  const point = screen.getCursorScreenPoint();
  return screen.getDisplayNearestPoint(point) || screen.getPrimaryDisplay();
}

function createBorderForDisplay(display) {
  const { x, y, width, height } = display.bounds;
  const rgb = hexToRgb(color);
  const glow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`;
  const soft = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;

  const win = new BrowserWindow({
    x,
    y,
    width,
    height,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    fullscreenable: false,
    hasShadow: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setIgnoreMouseEvents(true, { forward: true });

  const renderers = {
    'animation-1': renderAnimation1,
    'animation-2': renderAnimation2,
  };
  const render = renderers[animationName] || renderAnimation1;
  const html = render({ color, thickness, opacity, blurPx, glow, soft });

  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  return win;
}

app.whenReady().then(() => {
  const targetDisplay = pickDisplay();
  createBorderForDisplay(targetDisplay);
});

ipcMain.on('quit-border', () => {
  app.quit();
});

app.on('window-all-closed', (event) => {
  event.preventDefault();
});
