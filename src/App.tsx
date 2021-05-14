import React, { useState, useEffect, useRef } from 'react'
import ContentMenu from './components/ContentMenu'
import ContentView from './components/ContentView'
import styled, { createGlobalStyle } from 'styled-components'
import { IpcRenderer } from 'electron'
import { write } from 'fs'
const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
  }
`
const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    width: 100vw;
`
const temp: IContent[] = [{ description: 'Starts from now', id: 0 }]
interface IContent {
    description: string
    id: number
}

declare global {
    interface Window {
        config: {
            readConfig: () => string
            writeJson: (data: string) => void
            ipc: IpcRenderer
        }
    }
}
function App() {
    const { readConfig, writeJson, ipc } = window.config
    const [Noteid, setNoteId] = useState(0)
    const [index, setIndex] = useState(0)
    const [arr, setArr] = useState<IContent[]>(temp)

    const [loading, setLoading] = useState(false)
    const ArrRef = useRef(arr)
    const onChange = (id: number, value: string) => {
        setArr(
            arr.map((item) =>
                item.id === id ? { ...item, description: value } : item
            )
        )
        const newArr = arr.map((item) =>
            item.id === id ? { ...item, description: value } : item
        )
        setArr(newArr)
        console.log(newArr)
        ipc.send('message', JSON.stringify(newArr))
    }

    const onNoteDel = (id: number) => {
        const newArr = arr.filter((item) => item.id !== id)
        setIndex(newArr.length - 1)
        setArr(newArr)
    }
    const onNoteAdd = () => {
        const newNote = {
            description: '',
            id: Noteid,
        }
        setArr([...arr, newNote])
        const newArr = arr.concat(newNote)
        setArr(newArr)
        setNoteId((Noteid) => Noteid + 1)
    }
    useEffect(() => {
        let data = readConfig()
        const content: IContent[] = JSON.parse(data)
        setArr(content)
    }, [readConfig])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyS') {
                console.log(ArrRef.current)
                ipc.send('message', JSON.stringify(ArrRef.current))
            }
        }
        window.addEventListener('keydown', (e) => handleKeyDown(e))
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [ipc])

    const onIndex = (id: number) => {
        const index = arr.findIndex((element) => element.id === id)
        setIndex(index)
    }
    return (
        <Wrapper>
            <GlobalStyle />
            <ContentMenu
                ContentArr={arr}
                onIndex={onIndex}
                onNoteAdd={onNoteAdd}
                onNoteDel={onNoteDel}
            />
            <ContentView item={arr[index]} onChange={onChange} />
        </Wrapper>
    )
}
export default App
