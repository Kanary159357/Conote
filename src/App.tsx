import React, { useState, useEffect, useRef } from 'react'
import ContentMenu from './components/ContentMenu'
import ContentView from './components/ContentView'
import styled, { createGlobalStyle } from 'styled-components'
import { send } from 'process'

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
            sendAdd: (id: number) => {}
            sendDelete: (id: number) => {}
            sendUpdate: (id: number, content: string) => {}
            onInit: () => {}
            sendInit: () => {}
        }
    }
}
function App() {
    const { sendAdd, sendUpdate, sendDelete, onInit, sendInit } = window.config
    const [Noteid, setNoteId] = useState(1)
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
        sendUpdate(id, value)
        setArr(newArr)
        console.log(newArr)
    }

    const onNoteDel = (id: number) => {
        const newArr = arr.filter((item) => item.id !== id)
        setIndex(newArr.length - 1)
        sendDelete(id)
        setArr(newArr)
    }
    const onNoteAdd = () => {
        sendAdd(Noteid)
        const newNote = {
            description: '',
            id: Noteid,
        }
        setArr([...arr, newNote])
        setNoteId((Noteid) => Noteid + 1)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyS') {
                sendInit()
            }
        }
        window.addEventListener('keydown', (e) => handleKeyDown(e))
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        onInit()
    }, [])

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
