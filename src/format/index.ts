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
  let regex = /^import\b.*\n{1,}/gm;
  let matched = text.match(regex);
  if (!matched) {return;}
  let from = matched.join('');
  
  let to = matched.reduce((groups: string[][], next: string): any => {
    let index = groups.length - 1;
    if (/\n{2,}/.test(next)) {
      next = next.replace(/\n{2,}/, '\n');
      groups.push([]);
    }
    groups[index].push(next); 
    return groups;
  }, [[]] as string[][]).map(group => {
    return group.sort((a, b)  => {
      return a.length < b.length ? -1 : 0;
    }).join('');
  }).join('\n');
  return text.replace(from, to);
}

export function edit (str: string) {
  curEditor?.edit((builder) => {
    let start = new vscode.Position(0, 0);
    let end = new vscode.Position(curEditor.document.lineCount, 0);
    let range = new vscode.Range(start, end);
    builder.replace(range, str);
  });
}