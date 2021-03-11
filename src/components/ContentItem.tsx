import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    height: calc(8% - 1px);
    overflow:hidden;
    padding-left: 20px;
    word-break:break-all;
    white-space:ellipse;
    border-bottom : 1px solid #d9d9d9;

`
const ItemTitle = styled.div`
    text-overflow:ellipsis;
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
    const Ti = item.description.substring(0,item.description.indexOf('\n'))
    return(
        <ItemWrapper onClick={handleClick}>
            <ItemTitle>{Ti}</ItemTitle>
            {item.description}
        </ItemWrapper>
    )
}

export default ContentItem