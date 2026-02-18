function renderAnimation1({ color, thickness, opacity, blurPx, glow, soft }) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      overflow: hidden;
    }
    #outer {
      position: fixed;
      inset: 0;
      box-sizing: border-box;
      padding: ${thickness}px;
      background: conic-gradient(
        from 0deg,
        ${soft},
        ${glow},
        ${color},
        ${glow},
        ${soft}
      );
      opacity: ${opacity};
      pointer-events: none;
      animation: border-spin 2.8s linear infinite;
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    #inner {
      position: fixed;
      inset: ${thickness}px;
      box-sizing: border-box;
      padding: ${Math.max(4, Math.floor(thickness * 0.8))}px;
      background: conic-gradient(
        from 240deg,
        transparent,
        ${glow},
        ${soft},
        transparent
      );
      opacity: 0.95;
      pointer-events: none;
      filter: blur(${blurPx}px);
      animation: border-spin 3.8s linear infinite reverse;
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    @keyframes border-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div id="outer"></div>
  <div id="inner"></div>
</body>
</html>`;
}

module.exports = { renderAnimation1 };
