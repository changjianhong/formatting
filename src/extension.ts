import * as vscode from 'vscode';
import { format as formatImport } from './format/import';
import { format as formatStylus } from './format/stylus';

export function activate(context: vscode.ExtensionContext) {
	let importFormatting = vscode.commands.registerCommand('formatting.formatImport', () => {
		formatImport();
	});
	let stylusFormatting = vscode.commands.registerCommand('formatting.formatStylus', () => {
		formatStylus();
	});


	context.subscriptions.push(importFormatting);
	context.subscriptions.push(stylusFormatting);
}

export function deactivate() {}
