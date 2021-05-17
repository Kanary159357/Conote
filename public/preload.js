const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('config', {
    sendAdd: (id) => {
        const data = {
            id: id,
            content: '',
        }
        ipcRenderer.send('add', data)
    },
    sendUpdate: (id, content) => {
        console.log(id, content)

        ipcRenderer.send('update', { id, content })
    },
    sendDelete: (id) => {
        console.log(id)
        ipcRenderer.send('delete', id)
    },
    onInit: () => {
        ipcRenderer.on('init', (event, data) => {
            console.log(data)
        })
        ipcRenderer.send('did-finish-load')
    },
    sendInit: () => {
        ipcRenderer.send('did-finish-load')
    },
})
