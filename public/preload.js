const { readFile, readFileSync, writeFileSync } = require('fs')
const { contextBridge, ipcRenderer, ipcMain } = require('electron')
require('electron')
contextBridge.exposeInMainWorld('config', {
    readConfig: () => {
        const data = readFileSync(__dirname + '/config.json', 'utf-8')
        return data
    },
    writeJson: (data) => {
        writeFileSync(__dirname + '/config.json', data)
    },

    ipc: ipcRenderer,
})
