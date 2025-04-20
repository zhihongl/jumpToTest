const path = require('path');
const { runTests } = require('@vscode/test-electron');
const assert = require('assert');
const vscode = require('vscode');
const { activate } = require('../../.vscode-test/extensions/your-publisher-name.jump-to-test-0.0.1/out/extension');

describe('Extension Tests', () => {
    let context;

    before(() => {
        context = { subscriptions: [] };
        console.log('>> testing!')
        activate(context);
    });

      it.only('should find test files with various naming patterns', async () => {
    const file = 'component.js';
    const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', file);
    assert.match(result, /component\.test\.js/);
  });

    it('should find test files with various naming patterns', async () => {
        const testCases = [
            { file: 'component.js', expected: 'component.test.js' },
            { file: 'component.ts', expected: 'component.spec.ts' },
            { file: 'component.tsx', expected: 'component.test.tsx' },
            { file: 'component.jsx', expected: 'component.spec.jsx' },
            { file: 'utils.js', expected: 'utils.test.js' }
        ];

        await Promise.all(testCases.map(async ({ file, expected }) => {
            const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', file);
            assert.match(result, new RegExp(expected));
        }));
    });

    it('should handle cases where no test file exists', () => {
        const result = vscode.commands.executeCommand('jumpToTest.openTestFile', 'nonexistent.js');
        assert.strictEqual(result, null);
    });

    it('should check __tests__ directory for test files', async () => {
        const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', 'component.js');
        assert.match(result.fsPath, /__tests__\/component\.test\.js/);
    });

    it('should handle Windows-style paths correctly', async () => {
        const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', 'C:\\path\\to\\component.js');
        assert.match(result.fsPath, /component\.test\.js/);
    });

    it('should handle files with multiple dots in name', async () => {
        const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', 'component.module.js');
        assert.match(result.fsPath, /component\.module\.test\.js/);
    });

    it('should handle empty file path', () => {
        const result = vscode.commands.executeCommand('jumpToTest.openTestFile', '');
        assert.strictEqual(result, null);
    });
});

// const assert = require('assert');
// const vscode = require('vscode');
// const { activate } = require('../../src/extension');

// describe('Extension Tests', () => {
//   let context;

//   beforeEach(() => {
//     context = { subscriptions: [] };
//     activate(context);
//   });

//   it('should find test files with various naming patterns', async () => {
//     const file = 'component.js';
//     const result = await vscode.commands.executeCommand('jumpToTest.openTestFile', file);
//     assert.match(result, /component\.test\.js/);
//   });

//   // ...more tests
// });
