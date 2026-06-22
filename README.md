# llm-games2 🎮🤖

A playful sandbox for LLM-powered games, experiments, and interactive AI adventures.

## Overview

`llm-games2` explores how large language models (LLMs) can level up games, puzzles, and all kinds of interactive fun.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/derek-copilot-demo/llm-games2.git
   cd llm-games2
   ```

2. Start a simple static file server from the repository root:
   ```bash
   python -m http.server 8000
   ```

3. Open http://localhost:8000 in your browser, pick a game, and start playing.

## Project Structure

- `index.html` — a simple launchpad to all available games
- `games/snake/` — everything needed for the classic snake game
  - `index.html` — snake game page
  - `styles.css` — board and UI styling
  - `app.js` — snake gameplay logic and controls

## Contributing

Contributions are welcome! Have an idea for a new game or a fun twist? Open an issue or send a pull request.

## License

See [LICENSE](LICENSE) for details.
