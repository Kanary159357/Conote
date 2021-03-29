import React from "react";
import styled,{css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
const ItemWrapper = styled.div`
    flex: 1 1 auto;
    min-height:79px;
    border-bottom : 1px solid #d9d9d9;
    position:relative;
    max-height:79px;
    display:flex;
`

const ItemCss = css`
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
`
const ItemContent = styled.div`
    width:200px;
    overflow-y: auto;
    padding-left: 40px;
    white-space:nowrap;
    text-overflow: ellipsis;
`

const ItemMain = styled.div`
    ${ItemCss};
    font-size:16px;
    padding-top:10px;
    color: #808080;
`
const ItemTitle = styled.div`
    ${ItemCss};
    font-size: 18px;
    padding-top : 8px;
    color:#1d1d1d;
`
const ItemDel = styled.div`
    top:30%;
    position:absolute;
    right:20px;
    opacity: 0;
    cursor:pointer;
    font-size:25px;
    &:hover{
        color:#ff9494;
        opacity: 1;
    }
`

interface ItemProps {
    item : {description:String;
            id:string;
    },
    onIndex : (id:string)=>void;
    onNoteDel : (id:string)=>void;
}


const ContentItem = ({item, onIndex, onNoteDel}:ItemProps)=>{
    const handleClick = ()=>{
        onIndex(item.id);
    }
    const handleDel = ()=>{
        onNoteDel(item.id)
    }
    const line = item.description.indexOf('\n') ===-1 ? item.description.length : item.description.indexOf('\n');
    const Ti = item.description==="" ? "New Note" :  item.description.substring(0,line) ;
    const Ma = item.description.substring(line);
    return(
        <ItemWrapper>
            <ItemContent onClick={handleClick}>
                <ItemTitle>{Ti}</ItemTitle>
                <ItemMain>{Ma}</ItemMain>
            </ItemContent>
            <ItemDel onClick={handleDel}>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </ItemDel>
        </ItemWrapper>
    )
}

export default ContentItem