import styled from 'styled-components';
import MarkEditor from './Mark/MarkEditor';
import MarkView from './Mark/MarkView';
const ContentWrapper = styled.div`
    width: 88%;
    height: 100%;
    display:flex;
    flex-direction:column;
`
const ViewMenu = styled.div`
    height: 50px;
    width: 100%;
    background: black;
`;

const ViewContent = styled.div`
    display:flex;
    flex-direction:row;
    height: 100%;
    width: 100%;
`
interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
}

const ContentView = ({item, onChange}:ViewProp)=>{
   
    return(
        <ContentWrapper>
            <ViewContent>
                <MarkEditor item={item} onChange={onChange}/>
                <MarkView item = {item}/>
            </ViewContent>
        </ContentWrapper>
    )
}

export default ContentView