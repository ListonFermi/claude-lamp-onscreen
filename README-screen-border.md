# Claude Screen Border (Node + Electron)

## Credits

This project idea is inspired by the Claude hooks + device-status approach from:
- https://github.com/bobek-balinek/claude-lamp

The original repository integrates Claude hooks with Moonside BLE lamps. This variant adapts the same workflow to an on-screen animated border indicator.

## Install

```bash
npm install
```

## Manual test

```bash
node border-control.js start
node border-control.js stop
```

Behavior:
- Border is animated (sharp outer edge + blurred inner glow).
- On multi-monitor setups, it appears only on the display nearest your mouse cursor when `start` runs.

Optional tuning:
```bash
BORDER_COLOR="#00FF66" BORDER_THICKNESS=18 BORDER_OPACITY=0.95 BORDER_INNER_BLUR=14 node border-control.js start
```

Choose animation style:
```bash
BORDER_ANIMATION="animation-1" node border-control.js start
BORDER_ANIMATION="animation-2" node border-control.js start
```

## Hook usage

Merge `claude-settings-snippet.json` into your `~/.claude/settings.json`.

For this repo-local setup, keep commands pointing at `$CLAUDE_PROJECT_DIR/claude_border_hook.sh`.
