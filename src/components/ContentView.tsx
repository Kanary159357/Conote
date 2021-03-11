import styled from 'styled-components';
import {useEffect,useRef} from 'react'
import'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';

const CodeMirror = require('codemirror');
const ViewWrapper = styled.div`
    width: 80%;
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
    .react-codemirror2{
        height:50%;
        .CodeMirror{
            height:100%;
            font-size:20px;
        }
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
            lineNumbers: true,
            mode:"markdown",
        });
        codeMirror.current?.setValue(item.description);
        codeMirror.current?.on('change', handleChange);
        return()=>{
            if(codeMirror.current) codeMirror.current.toTextArea();
        }
    },[item.id])

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