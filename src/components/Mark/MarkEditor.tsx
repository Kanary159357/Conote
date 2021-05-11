import {useEffect,useRef} from 'react'
import styled from 'styled-components'
import'codemirror/mode/css/css';
import './CodeMirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/scroll/simplescrollbars.css'
const CodeMirror = require('codemirror');

const Editor = styled.div<{toggle:boolean}>`
  width: ${props=>props.toggle ? "calc(100% )" : "50%"};
    &::-webkit-scrollbar {
        display: none;
    }
`
interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
    toggle:boolean;
}

const MarkEditor = ({item, onChange, toggle}:ViewProp)=>{
    let codeMirror = useRef<CodeMirror.EditorFromTextArea>();
    const editorRef= useRef<HTMLTextAreaElement>(null);
    const handleChange = (editor:CodeMirror.Editor)=>{
        onChange(item.id, editor.getValue());
    }
    useEffect(()=>{
        
        codeMirror.current= CodeMirror.fromTextArea(editorRef.current!,{
            mode:'markdown',
            lineWrapping:'true',
            theme: 'material',
            scrollbarStyle:'overlay',
        });
        codeMirror.current?.setValue(item.description);
        codeMirror.current?.on('change', handleChange);

        return()=>{
            if(codeMirror.current) codeMirror.current.toTextArea();
        }
        
    },[item.id])


    return (
        <Editor toggle={toggle}>
            <textarea ref= {editorRef}/>
        </Editor>
    )
}

export default MarkEditor;