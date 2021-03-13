import styled from 'styled-components';
import {useEffect,useRef} from 'react'
import'codemirror/mode/css/css';
import './CodeMirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/scroll/simplescrollbars.css'
const CodeMirror = require('codemirror');
const ViewWrapper = styled.div`
    width: 88%;
    height: 100%;
    display:flex;
    flex-direction:column;
`
const ViewMenu = styled.div`
    height: 50px;
    width: 100%;
    background: black;
`
const ViewContent = styled.div`
    width: calc(100%);
    height: calc(100% - 50px);
    &::-webkit-scrollbar {
        display: none;
    }
  
`
const ViewResult = styled.div`

`
interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
}

const ContentView = ({item, onChange}:ViewProp)=>{
    let codeMirror = useRef<CodeMirror.EditorFromTextArea>();
    const editorRef= useRef<HTMLTextAreaElement>(null);
 
    useEffect(()=>{
        const handleChange = (editor:CodeMirror.Editor)=>{
            onChange(item.id, editor.getValue());
        }
        codeMirror.current= CodeMirror.fromTextArea(editorRef.current!,{
            mode:'markdown',
            lineWrapping:'true',
            theme: 'material',
            scrollbarStyle:'overlay'
        });
        codeMirror.current?.setValue(item.description);
        codeMirror.current?.on('change', handleChange);
        codeMirror.current?.on('cursorActivity', (doc)=>console.log(doc.getSelection()));

        return()=>{
            if(codeMirror.current) codeMirror.current.toTextArea();
        }
        
    },[item.id])

    useEffect(()=>{

    },[])
    return(
        <ViewWrapper>
        <ViewMenu>
        <button>저장</button>
        </ViewMenu>
        <ViewContent>
        <textarea ref= {editorRef}/>
         </ViewContent>
        </ViewWrapper>
    )
}

export default ContentView