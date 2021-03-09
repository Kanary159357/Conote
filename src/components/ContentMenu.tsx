import styled from 'styled-components';
import ContentItem from './ContentItem';
const MenuWrapper = styled.div`
    width: calc(20% - 1px);
    height:100%;
    background: #fff;
    overflow-y:scroll;
    border-right: 1px solid #b8b8b8;
    &::-webkit-scrollbar {
        display: none;
    }
`

interface MenuProps {
    ContentArr : {description:String}[]
}
const ContentMenu = ({ContentArr}:MenuProps)=>{
    return(
        <MenuWrapper>
            {ContentArr.map((item,index)=>{
                return(<ContentItem item={item} key={index}></ContentItem>)
            })}
           
        </MenuWrapper>
    )
}

export default ContentMenu 