const {
    app,
    BrowserWindow,
    ipcRenderer,
    ipcMain,
    webContents,
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const fs = require('fs')
let mainWindow
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('Database.db')

function addMemo(id, content) {
    const query = `INSERT INTO memo(id, content) VALUES ('${id}', '${content}')`
    db.serialize()
    db.each(query)
}

function listMemo() {
    db.serialize(function () {
        db.each('SELECT id, content FROM memo', function (err, row) {
            console.log(row.id + ' - ' + row.content)
        })
    })
}
function deleteMemo(id) {
    const query = `DELETE FROM memo WHERE id =${id}`
    db.serialize()
    db.each(query)
}
function updateMemo(id, content) {
    const query = `UPDATE memo SET content = '${content}' where id = ${id}`
    db.serialize()
    db.each(query)
}
function pusher() {
    return new Promise(function (resolve, reject) {
        const result = []
        db.serialize(function () {
            db.each(
                'SELECT id, content FROM memo',
                function (err, row) {
                    if (err) reject(err)
                    result.push({ id: row.id, description: row.content })
                },
                () => {
                    resolve(result)
                }
            )
        })
    })
}
function getData() {
    pusher().then((data) => {
        return data
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
    const webCont = mainWindow.webContents
    webCont.on('did-finish-load', async () => {
        const data = await pusher()
        webCont.send('init', data)
    })
    mainWindow.setResizable(true)
    mainWindow.on('closed', () => (mainWindow = null))
    mainWindow.focus()
}

app.on('ready', () => {
    ipcMain.on('add', (e, arg) => {
        const { id, content } = arg
        addMemo(id, content)
        listMemo()
    })
    ipcMain.on('delete', (e, id) => {
        console.log(id)
        deleteMemo(id)
        listMemo()
    })
    ipcMain.on('update', (e, arg) => {
        const { id, content } = arg
        updateMemo(id, content)
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
