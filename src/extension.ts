import * as vscode from 'vscode';
import { format } from './format/import';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('formatting.formatImport', () => {
		format();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
