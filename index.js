// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const fs = require('fs')

let DarkModeModule

function switchTheme (target) {
  let data = fs.readFileSync(`${process.env.HOME}/Library/Application\ Support/Code/User/settings.json`).toString()

  if (target === 'dark') {
    data = data.replace('"workbench.colorTheme": "Default Light+"', '"workbench.colorTheme": "Default Dark+"')
  } else {
    data = data.replace('"workbench.colorTheme": "Default Dark+"', '"workbench.colorTheme": "Default Light+"')
  }

  fs.writeFileSync(`${process.env.HOME}/Library/Application\ Support/Code/User/settings.json`, data)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
exports.activate = function activate (context) {
  DarkModeModule = require('dark-mode-listener')
  DarkModeModule.on('change', (value) => switchTheme(value))
}

// this method is called when your extension is deactivated
exports.deactivate = function deactivate () {
  DarkModeModule.stop()
}
