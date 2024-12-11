# Wrap DD – Easy Debugging with One Click
![Extension Icon](https://raw.githubusercontent.com/BNhashem16/Easy-Debugging-with-One-Click/master/media/icon.jpg)

![GIF description](https://raw.githubusercontent.com/BNhashem16/Easy-Debugging-with-One-Click/master/media/example.gif)

**Wrap DD** is a productivity-enhancing extension for Visual Studio Code that allows you to quickly wrap selected variables, expressions, or function calls inside the `dd()` function for debugging. This makes it much easier to log multiple variables or complex expressions in Laravel, PHP, or any language where `dd()` (dump and die) is commonly used.

## Features

- **Wrap Selected Variables and Expressions**: Automatically wraps selected variables, strings, or function calls inside the `dd()` function.
- **Handle Multiple Selections**: Supports multiple selections, and intelligently appends new items to existing `dd()` calls without duplicating values.
- **Flexible Handling**: Handles plain text, variables, strings, and even function calls with nested parameters.

## How It Works

1. **Select Text**: Highlight one or more variables, strings, or expressions in the editor.
2. **Use the Command**: Trigger the command with the default keybinding `Ctrl+0` (or customize it in your keybindings).
   - This will wrap the selected text inside the `dd()` function.
   - If `dd()` already exists, the selected variables will be appended to it, ensuring no duplicates.

3. **No Selection?**: If no text is selected, the extension will automatically insert an empty `dd()` call on the next line, preserving the current indentation.

## Installation

1. Open **Visual Studio Code**.
2. Go to the **Extensions** view by clicking on the square icon in the sidebar or pressing `Ctrl+Shift+X`.
3. Search for **Wrap DD**.
4. Click **Install**.

Alternatively, you can install the extension directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=AhmedHashem.dump-and-die).

## Customization

- **Keybinding**: The default keybinding is `Ctrl+0`. You can change this by going to `File > Preferences > Keyboard Shortcuts` and searching for `Wrap DD`. Then, assign a custom keybinding if necessary.
  
- **Command**: The command registered by this extension is `extension.wrapDd`. You can also run it from the command palette by pressing `Ctrl+Shift+P`, typing "Wrap DD", and hitting `Enter`.

## Example Usage

### Scenario 1: Wrapping a Single Variable

1. **Select** a variable like `$myVar`.
2. **Press** `Ctrl+0`.
3. **Result**: `dd($myVar);`

### Scenario 2: Wrapping Multiple Variables

1. **Select** multiple variables, like `$var1`, `$var2`.
2. **Press** `Ctrl+0`.
3. **Result**: `dd($var1, $var2);`

### Scenario 3: Wrapping a Function Call

1. **Select** a function call like `myFunction($arg1, $arg2)`.
2. **Press** `Ctrl+0`.
3. **Result**: `dd(myFunction($arg1, $arg2));`

### Scenario 4: No Text Selected

1. **Press** `Ctrl+0` with no text selected.
2. **Result**: `dd();` (at the appropriate indentation level).

## Contributing

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your feature or bug fix.
4. Commit your changes and push them to your fork.
5. Open a pull request to merge your changes into the main repository.

## License

This extension is licensed under the [MIT License](LICENSE).
