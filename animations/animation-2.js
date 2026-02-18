function renderAnimation2({ color, thickness, opacity, blurPx, glow, soft }) {
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
      border-radius: 20px;
      background: linear-gradient(
        120deg,
        ${soft},
        ${glow},
        ${color},
        ${glow},
        ${soft}
      );
      background-size: 300% 300%;
      opacity: ${opacity};
      pointer-events: none;
      animation: border-flow 2.2s ease-in-out infinite;
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    #inner {
      position: fixed;
      inset: ${thickness + 2}px;
      box-sizing: border-box;
      padding: ${Math.max(5, Math.floor(thickness * 0.85))}px;
      border-radius: 20px;
      background: linear-gradient(
        300deg,
        transparent,
        ${glow},
        ${soft},
        transparent
      );
      background-size: 260% 260%;
      pointer-events: none;
      filter: blur(${blurPx + 4}px);
      opacity: 0.95;
      animation: border-flow 2.8s ease-in-out infinite reverse;
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    @keyframes border-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  </style>
</head>
<body>
  <div id="outer"></div>
  <div id="inner"></div>
</body>
</html>`;
}

module.exports = { renderAnimation2 };
