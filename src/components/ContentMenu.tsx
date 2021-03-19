import styled from 'styled-components';
import ContentItem from './ContentItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
const MenuWrapper = styled.div`
    width: calc(12% - 1px);
    min-width:200px;
    height: 100%;
    background: #fff;
    border-right: 1px solid #b8b8b8;

`

const MenuControl = styled.div`
    height: 49px;
    border-bottom : 1px solid #d9d9d9;
    display:flex;
    flex-direction:row;
    justify-content:space-end;
`

const ControlItem =  styled.div`
    flex : 1 1 auto;
    font-size: 35px;
    display:flex;
    justify-content:center;
    align-items:center;
`

const MenuContent = styled.div`
    height : calc(100% - 50px);
    overflow-y: scroll;
    display:flex;
    flex-direction:column;
    &::-webkit-scrollbar {
        display: none;
    }
`

interface MenuProps {
    ContentArr : {description:String; id:number}[];
    onClick : (id:number)=>void;
    onNoteAdd : ()=>void;
}
const ContentMenu = ({ContentArr, onClick, onNoteAdd}:MenuProps)=>{
    return(
        <MenuWrapper>
            <MenuControl>
                <ControlItem onClick={onNoteAdd}>
                    <FontAwesomeIcon icon={faPlus}/>
                </ControlItem>
            </MenuControl>
            <MenuContent>
            {[...ContentArr].reverse().map((item)=>{
                return(<ContentItem item={item} key={item.id} onClick={onClick}/>)
            })}
            </MenuContent>

        
        </MenuWrapper>
    )
}

export default ContentMenu 