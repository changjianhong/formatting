import * as vscode from 'vscode';
import { format } from './format';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('import-formatting.formatImport', () => {
		format();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
