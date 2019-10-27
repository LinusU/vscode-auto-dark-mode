const os = require('os')
const path = require('path')
const { workspace, ConfigurationTarget } = require('vscode')

let DarkModeModule

const lockfilePath = path.join(os.tmpdir(), 'vscode-auto-dark-mode-lock')

async function switchTheme (target) {
  const lockfile = require('proper-lockfile')

  let release
  try {
    release = await lockfile.lock('', { lockfilePath })
  } catch (err) {
    if (err.code === 'ELOCKED') {
      // Another
      return
    }

    throw err
  }

  try {
    const colorTheme = workspace.getConfiguration('autoDarkMode').get(`${target}Theme`)
    workspace.getConfiguration('workbench').update('colorTheme', colorTheme, ConfigurationTarget.Global)

    const iconTheme = workspace.getConfiguration('autoDarkMode').get(`${target}IconTheme`)
    if (iconTheme) {
      workspace.getConfiguration('workbench').update('iconTheme', iconTheme, ConfigurationTarget.Global)
    }
  } finally {
    // Give VS Code some time to save the new settings
    setTimeout(release, 1000)
  }
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
