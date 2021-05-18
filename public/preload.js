const { contextBridge, ipcRenderer } = require('electron')

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
    onInit: async () => {
        let content
        await ipcRenderer.invoke('inittest').then((data) => {
            content = data
        })
        return content
    },
    sendInit: () => {
        ipcRenderer.send('did-finish-load')
    },
})
