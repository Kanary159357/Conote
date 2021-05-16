const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('config', {
    /* addMemo: () => {
        addMemo('토요일에 어디서 놀지 생각하기', '2020-02-11')
    },
    listMemo: () => {
        listMemo()
    },*/
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
})
