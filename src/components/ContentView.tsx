import styled from 'styled-components';
import MonacoEditor from 'monaco-editor';
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
const ViewContent = styled.textarea`
    padding: 0;
    width: 100%;
    height: calc(20% - 65px);
    overflow-y:hidden;
    border:none;
    outline:none;
    word-break:break-all;
    white-space:normal;
    font-size:20px;
    margin-left: 20px;
    &::-webkit-scrollbar {
        display: none;
    }
 
`



interface ViewProp{
    item: {description:String}
}

const ContentView = ({item}:ViewProp)=>{
    return(
        <ViewWrapper>
        <ViewMenu>
        <button>저장</button>
        </ViewMenu>
        <MonacoEditor>
            
        </MonacoEditor>
        </ViewWrapper>
    )
}

export default ContentView