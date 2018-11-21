const { workspace, ConfigurationTarget } = require('vscode')

let DarkModeModule

function switchTheme (target) {
  const colorTheme = workspace.getConfiguration('autoDarkMode').get(`${target}Theme`)
  workspace.getConfiguration('workbench').update('colorTheme', colorTheme, ConfigurationTarget.Global)
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
