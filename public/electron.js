const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const fs = require('fs')
const { writeFileSync, writeFile } = require('fs')
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: isDev,
            preload: __dirname + '/preload.js',
        },
    })

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }
    mainWindow.setResizable(true)
    mainWindow.on('closed', () => (mainWindow = null))
    mainWindow.focus()
}

app.on('ready', () => {
    const ipc = ipcMain
    ipc.on('message', (event, res) => {
        console.log(res)
        writeFile(__dirname + '/config.json', res, (err, data) => {
            if (err) {
                console.log('err')
            }
        })
    })
    createWindow()
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
