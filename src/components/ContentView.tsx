import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2';

const ViewWrapper = styled.div`
    width: 80%;
    height: 100%;
    display:flex;
    flex-direction:column;
`
const ViewMenu = styled.div`
    height: 20px;
    width: 100%;
    background: black;
`
const ViewContent = styled.div`
    padding: 0;
    width: 100%;
    margin-left: 20px;
    &::-webkit-scrollbar {
        display: none;
    }
 
`



interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
}

const ContentView = ({item, onChange}:ViewProp)=>{
    return(
        <ViewWrapper>
        <ViewMenu>
        <button>저장</button>
        </ViewMenu>
        <ViewContent>
        <ControlledEditor
            value={item.description}
            onBeforeChange={(editor,data,value)=>{
                onChange(item.id, value);
            }}
        >
        </ControlledEditor>
        </ViewContent>
        </ViewWrapper>
    )
}

export default ContentView