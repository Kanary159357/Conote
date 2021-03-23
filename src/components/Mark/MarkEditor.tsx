import {useEffect,useRef} from 'react'
import styled from 'styled-components'
import'codemirror/mode/css/css';
import './CodeMirrorMaterial.css';
import './CodeMirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/display/placeholder'
const CodeMirror = require('codemirror');

const Editor = styled.div<RenderProps>`
    width: ${props=>props.toggle? "100%" : "50%"};
    transition: all 0.2s;

    &::-webkit-scrollbar {
        display: none;
    }
  
`
interface RenderProps{
    toggle: boolean;
}

interface ViewProp{
    item: {description:string, id:number, curdate:Date};
    onChange : (id:number, value:string, curdate:Date)=>void;
    toggle:boolean;
}

const MarkEditor = ({item, onChange, toggle}:ViewProp)=>{
    let codeMirror = useRef<CodeMirror.EditorFromTextArea>();
    const editorRef= useRef<HTMLTextAreaElement>(null);
    
    useEffect(()=>{
        const handleChange = (editor:CodeMirror.Editor)=>{
            onChange(item.id, editor.getValue(), new Date());
        }
        codeMirror.current= CodeMirror.fromTextArea(editorRef.current!,{
            mode:'markdown',
            lineWrapping:'true',
            theme: 'material',
            scrollbarStyle:'overlay',
        });
        codeMirror.current?.setValue(item.description);
        codeMirror.current?.on('change', handleChange);
        codeMirror.current?.clearHistory();

        return()=>{
            if(codeMirror.current) codeMirror.current.toTextArea();
        }
        
    },[item.id])


    return (
        <Editor toggle={toggle}>
            <textarea ref= {editorRef} placeholder="오늘의 메모는 뭘까용~ 피 피카츄~"/>
        </Editor>
    )
}

export default MarkEditor;