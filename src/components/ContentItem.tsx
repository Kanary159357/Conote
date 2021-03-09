import styled from 'styled-components';

const ItemWrapper = styled.div`
    height: calc(8% - 1px);
    overflow:hidden;
    padding-left: 20px;
    word-break:break-all;
    white-space:ellipse;
    border-bottom : 1px solid #d9d9d9;

`

interface ItemProps {
    item : {description:String;
            id:number;
            }
}

const ContentItem = ({item}:ItemProps)=>{
    return(
        <ItemWrapper>
            {item.description}
        </ItemWrapper>
    )
}

export default ContentItem