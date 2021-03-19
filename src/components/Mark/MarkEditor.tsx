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

const Editor = styled.div`
  width: 50%;
    &::-webkit-scrollbar {
        display: none;
    }
  
`
interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
}

const MarkEditor = ({item, onChange}:ViewProp)=>{
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
        codeMirror.current?.clearHistory();

        return()=>{
            if(codeMirror.current) codeMirror.current.toTextArea();
        }
        
    },[item,onChange])


    return (
        <Editor>

            <textarea ref= {editorRef}/>
        </Editor>
    )
}

export default MarkEditor;