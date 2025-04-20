# Jump To Test

Quickly jump from a source file to its corresponding test file in your project!

Supports `.js`, `.ts`, `.jsx`, `.tsx`, and even nested paths like `__tests__`.

## ✨ Features

- Right-click on a source file → **Go Test file** (or use keyboard shortcut `Cmd+Alt+T`)
- Matches test files based on naming conventions:
  - `component.js` → `component.test.js` / `component.spec.js`
  - `utils.ts` → `utils.test.ts`
  - Supports nested `__tests__` folders
- Works with both JavaScript and TypeScript

## 🖱️ How to Use

1. Open a source file (e.g. `myService.ts`)
2. Right-click → **Go Test File** or use the keyboard shortcut (`Ctrl + Alt + T` on Windows/Linux, `Cmd + Alt + T` on macOS)
3. If a test file exists, it opens it; otherwise shows a warning

## 🔧 Configuration

Currently no custom settings. Test file lookup patterns are built-in.

## 📢 Feedback / Issues

Please open an issue on the GitHub repository if something doesn’t work as expected.
