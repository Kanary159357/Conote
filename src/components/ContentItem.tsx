import React from 'react';
import styled,{css} from 'styled-components';

const ItemWrapper = styled.div`
    height: calc(8% - 1px);
    overflow:hidden;
    padding-left: 20px;
    white-space:nowrap;
    text-overflow: ellipsis;
    border-bottom : 1px solid #d9d9d9;
`

const ItemCss = css`
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
`

const ItemContent = styled.div`
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


interface ItemProps {
    item : {description:String;
            id:number;
    },
    onClick : (id:number)=>void;
}


const ContentItem = ({item, onClick}:ItemProps)=>{
    const handleClick = ()=>{
        onClick(item.id);
    }
    const line = item.description.indexOf('\n') ===-1 ? item.description.length : item.description.indexOf('\n');
    const Ti = item.description.substring(0,line)
    const Ma = item.description.substring(line);
    return(
        <ItemWrapper onClick={handleClick}>
            <ItemTitle>{Ti}</ItemTitle>
            <ItemContent>{Ma}</ItemContent>
        </ItemWrapper>
    )
}

export default ContentItem