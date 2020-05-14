import * as vscode from 'vscode';
const curEditor = vscode.window.activeTextEditor;

export function format () {
  if (curEditor) {
    let from = curEditor.document.getText();
    let to = replace(from);
    if (to) {
      edit(to);
    }
  }
}

export function replace (text: string) : string | undefined {
  let regex = /import.*/g;
  let matched = text.match(regex);
  if (!matched) {return;}
  let from = matched?.join('\n');
  let to = matched?.sort((a, b) => {
    return a.length < b.length ? -1 : 0;
  })?.join('\n');
  let formatStr = text.replace(from, to);
  return formatStr;
}



export function edit (str: string) {
  curEditor?.edit((builder) => {
    let start = new vscode.Position(0, 0);
    let end = new vscode.Position(curEditor.document.lineCount, 0);
    let range = new vscode.Range(start, end);
    builder.replace(range, str);
  });
}