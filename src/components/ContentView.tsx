import { useState } from 'react';
import styled from 'styled-components';
import MarkEditor from './Mark/MarkEditor';
import MarkView from './Mark/MarkView';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
const ContentWrapper = styled.div`
    width: 85%;
`
const ViewContent = styled.div`
    display:flex;
    flex-direction:row;
    height: 100%;
    width: 100%;
    position:relative;
`
interface ViewProp{
    item: {description:string, id:number};
    onChange : (id:number, value:string)=>void;
    len:number;
}

const NoContent = styled.div`

`
const ViewSwitch = styled.div<toggleProps>`
    position: absolute;
    left: ${props=>props.toggle? "97%" : "47%"};
    color:white;
    font-size: 40px;
    cursor:pointer;
    z-index: 999;
`
interface toggleProps{
    toggle: boolean;
}
const ContentView = ({item, onChange, len}:ViewProp)=>{
    const [toggle,setToggle] = useState(false);
    return(
        <ContentWrapper>
            {len===0 ? <NoContent/> :  
            <ViewContent>
                <ViewSwitch toggle={toggle} onClick={()=>setToggle(!toggle)}>
                    <FontAwesomeIcon icon={toggle? faAngleLeft : faAngleRight}/>
                </ViewSwitch>
                <MarkEditor item={item} onChange={onChange} toggle={toggle}/>
                <MarkView item = {item} toggle={toggle}/>
            </ViewContent>}
          
        </ContentWrapper>
    )
}

export default ContentView