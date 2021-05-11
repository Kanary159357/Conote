import React,{ useState } from 'react';
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
    len:number;
}

const ContentView = ({item, onChange}:ViewProp)=>{
   
    return(
        <ContentWrapper>
            <ViewContent>
                <ViewSwitch toggle={toggle} onClick={()=>setToggle(toggle=>!toggle)}>
                    <FontAwesomeIcon icon={toggle? faAngleLeft : faAngleRight}/>
                </ViewSwitch>
                <MarkEditor item={item} onChange={onChange} toggle={toggle}/>
                <MarkView item = {item} toggle={toggle}/>
            </ViewContent>}
          
        </ContentWrapper>
    )
}

export default React.memo(ContentView);