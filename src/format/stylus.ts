import * as vscode from 'vscode';

export function format () {
  let curEditor = vscode.window.activeTextEditor;
  if (curEditor) {
    let from = curEditor.document.getText();
    let to = replace(from);
    if (to) {
      edit(curEditor, to);
    }
  }
}

function replace (text: string): string | undefined {
  let content = text;
  let regex = /<style.*lang="stylus".*>[\w\W]+<\/style>/g;
  let matched = text.match(regex);
  if (matched && matched.length > 0) {
    matched.forEach((from) => {
      let to = from.replace(/((\s*\{)|(\s*\})|:|;)/g, '');
      to = to.replace(/\n{2,}/g, '\n');
      content = content.replace(from, to);
    });
  }
  return content;
}

function edit (editor: vscode.TextEditor, content: string) {
  editor.edit((builder) => {
    let start = new vscode.Position(0, 0);
    let end = new vscode.Position(editor.document.lineCount, 0);
    let range = new vscode.Range(start, end);
    builder.replace(range, content);
  });
}