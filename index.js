const { workspace } = require('vscode')

let DarkModeModule

function switchTheme (target) {
  workspace.getConfiguration('workbench').update('colorTheme', (target === 'dark' ? 'Default Dark+' : 'Default Light+'), true)
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
