const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const fs = require('fs')
let mainWindow
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('Database.db')

function addMemo(contents, date) {
    const query = `INSERT INTO memo(contents, date) VALUES ('${contents}', '${date}')`
    db.serialize()
    db.each(query)
}

function listMemo() {
    db.serialize(function () {
        db.each(
            'SELECT rowid AS id, contents, date FROM memo',
            function (err, row) {
                console.log(
                    row.id + ' - ' + row.contents + '[' + row.date + ']'
                )
            }
        )
    })
}
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
    ipcMain.on('message', () => {
        addMemo('토요일에 어디서 놀지 생각하기', '2020-02-11')
        listMemo()
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
