import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

function findTestFile(componentFilePath: string): string | null {
    const dir = path.dirname(componentFilePath);
    const ext = path.extname(componentFilePath);
    const base = path.basename(componentFilePath, ext);
    const testNames = [
        `${base}.test${ext}`,
        `${base}.spec${ext}`,
        `${base}.test.js`,
        `${base}.spec.js`,
        `${base}.test.ts`,
        `${base}.spec.ts`,
        `${base}.test.tsx`,
        `${base}.spec.tsx`,
        `${base}.test.jsx`,
        `${base}.spec.jsx`,
    ];
    
    // First check in current directory and __tests__ folder
    for (const testName of testNames) {
        const testPath = path.join(dir, testName);
        if (fs.existsSync(testPath)) {
            return testPath;
        }
    }
    
    const testsDir = path.join(dir, '__tests__');
    for (const testName of testNames) {
        const testPath = path.join(testsDir, testName);
        if (fs.existsSync(testPath)) {
            return testPath;
        }
    }
    
    // Then check sibling test directories
    const rootDir = findProjectRoot(dir);
    if (rootDir) {
        const siblingDirs = ['test', 'tests', '__test__', '__tests__'];
        for (const siblingDir of siblingDirs) {
            const testDir = path.join(rootDir, siblingDir);
            if (fs.existsSync(testDir)) {
                for (const testName of testNames) {
                    const testPath = path.join(testDir, testName);
                    if (fs.existsSync(testPath)) {
                        return testPath;
                    }
                }
            }
        }
    }
    
    return null;
}

function findProjectRoot(currentDir: string): string | null {
    const rootMarkers = ['package.json', '.git'];
    let dir = currentDir;
    
    while (dir !== path.dirname(dir)) {
        for (const marker of rootMarkers) {
            const markerPath = path.join(dir, marker);
            if (fs.existsSync(markerPath)) {
                return dir;
            }
        }
        dir = path.dirname(dir);
    }
    
    return null;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('jumpToTest.openTestFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor.');
            return null;
        }
        const filePath = editor.document.fileName;
        const testFile = findTestFile(filePath);
        if (testFile) {
            await vscode.workspace.openTextDocument(testFile).then(doc => {
                vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
            });
            return testFile;
        } else {
            vscode.window.showWarningMessage('No corresponding test file found.');
            return null;
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}