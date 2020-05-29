import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { replace }  from '../../format/import';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('import format', () => {
		let from = `
		123123
		import '../../../src/format'
		import { format }  from '../../../src/format'
		import * as vscode from 'vscode'
		313131
		`;
		let to = `
		123123
		import '../../../src/format'
		import * as vscode from 'vscode'
		import { format }  from '../../../src/format'
		313131
		`;
		let formated = replace(from);
		assert.equal(to, formated);
	});
});
