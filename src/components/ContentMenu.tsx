import styled from 'styled-components';
import ContentItem from './ContentItem';
const MenuWrapper = styled.div`
    width: calc(12% - 1px);
    min-width:200px;
    height:100%;
    background: #fff;
    overflow-y:scroll;
    border-right: 1px solid #b8b8b8;
    &::-webkit-scrollbar {
        display: none;
    }
`

interface MenuProps {
    ContentArr : {description:String; id:number}[];
    onClick : (id:number)=>void;
}
const ContentMenu = ({ContentArr, onClick}:MenuProps)=>{
    return(
        <MenuWrapper>
            {ContentArr.map((item)=>{
                return(<ContentItem item={item} key={item.id} onClick={onClick}></ContentItem>)
            })}
           
        </MenuWrapper>
    )
}

export default ContentMenu 