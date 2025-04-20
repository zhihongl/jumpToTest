// Mock vscode API for testing
const vscodeMock = {
  window: {
    showInformationMessage: () => {},
    showWarningMessage: () => {},
    activeTextEditor: null,
    showTextDocument: () => {}
  },
  commands: {
    executeCommand: () => {}
  },
  workspace: {
    openTextDocument: () => {}
  },
  extensions: {
    getExtension: () => ({
      isActive: false,
      activate: () => {},
      exports: {}
    }),
    all: []
  },
  Uri: {
    parse: () => {},
    file: () => {}
  },
  Range: class {},
  Position: class {},
  Location: class {},
  Diagnostic: class {},
  DiagnosticSeverity: {
    Error: 0,
    Warning: 1,
    Information: 2,
    Hint: 3
  }
};

global.vscode = vscodeMock;