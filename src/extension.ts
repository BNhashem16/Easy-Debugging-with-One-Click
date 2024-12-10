// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.wrapDd', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selections = editor.selections;
            let selectedTextArray: string[] = [];

            // Gather all the selected texts
            selections.forEach(selection => {
                const selectedText = editor.document.getText(selection).trim();
                if (selectedText) {
                    // Check if it's a variable, string, or function/complex expression and format accordingly
                    if (selectedText.startsWith('$')) {
                        selectedTextArray.push(selectedText); // It's a variable, no quotes
                    } else if (selectedText.startsWith("'") && selectedText.endsWith("'")) {
                        selectedTextArray.push(selectedText); // It's already a string (wrapped in quotes)
                    } else if (selectedText.includes('(') && selectedText.includes(')')) {
                        selectedTextArray.push(selectedText); // It's a function or complex expression, keep as-is
                    } else {
                        selectedTextArray.push(`'${selectedText}'`); // It's a plain string, wrap in quotes
                    }
                }
            });

            // If no text is selected, create an empty dd() call
            if (selectedTextArray.length === 0) {
                // Get the line number of the last selection
                const lastSelection = selections[selections.length - 1];
                const lastLine = lastSelection.end.line;

                // Get the indentation of the last line
                const lastLineText = editor.document.lineAt(lastLine).text;
                const indentation = lastLineText.match(/^\s*/)?.[0] || '';

                // Insert the empty dd() at the appropriate position with the same indentation
                const insertPosition = new vscode.Position(lastLine + 1, 0);
                const wrappedText = `${indentation}dd();`;

                editor.edit(editBuilder => {
                    editBuilder.insert(insertPosition, `\n${wrappedText}\n`);
                });
                return; // Exit the function after inserting the empty dd()
            }

            // Join the selected variables and strings into a single string, separated by commas
            const newDdText = selectedTextArray.join(', ');

            const documentText = editor.document.getText();
            const ddPattern = /dd\(([^)]+)\)/;

            // Check if a dd() already exists
            const match = ddPattern.exec(documentText);
            if (match) {
                // dd() already exists, append the new variables/strings only if they are not already in dd()
                const currentDdContent = match[1]; // Get the content inside dd()
                let existingVariables = currentDdContent.split(',').map(variable => variable.trim());

                // Filter out any selected variables/strings that are already in dd()
                const newVariables = selectedTextArray.filter(variable => !existingVariables.includes(variable.trim()));

                if (newVariables.length > 0) {
                    const newDdContent = `${currentDdContent}, ${newVariables.join(', ')}`;

                    // Find where to insert the updated dd()
                    const ddStartPos = documentText.indexOf(match[0]); // Find the start position of the existing dd()

                    const ddRange = new vscode.Range(
                        editor.document.positionAt(ddStartPos),
                        editor.document.positionAt(ddStartPos + match[0].length)
                    );

                    // Replace the old dd() content with the new one
                    editor.edit(editBuilder => {
                        editBuilder.replace(ddRange, `dd(${newDdContent})`);
                    });
                }
            } else {
                // No dd() found, insert a new one
                
                // Get the line number of the last selection
                const lastSelection = selections[selections.length - 1];
                const lastLine = lastSelection.end.line;

                // Get the indentation of the last line
                const lastLineText = editor.document.lineAt(lastLine).text;
                const indentation = lastLineText.match(/^\s*/)?.[0] || '';

                // Insert the new dd() at the appropriate position with the same indentation
                const insertPosition = new vscode.Position(lastLine + 1, 0);
                const wrappedText = `${indentation}dd(${newDdText});`;

                editor.edit(editBuilder => {
                    editBuilder.insert(insertPosition, `\n${wrappedText}\n`);
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
export function deactivate() {}
