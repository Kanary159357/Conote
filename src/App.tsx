import React,{useState} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';
import styled,{createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');
  body{
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    border:0;
    margin:0;
  }

`

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  width: 100vw;
`
const temp:IContent[] = [

]

interface IContent{
  description:string;
  id:number;
  curdate: Date;
};
function App() {
  const [index, setIndex] = useState(0);
  const [Noteid, setNoteId] = useState(0); 
  const [arr, setArr] = useState<IContent[]>(temp);
  const onChange = (id:number, value: string, curdate:Date)=>{
    setArr(
      arr.map(item=>
        item.id===id ? {...item, description:value, date:curdate} : item
        )
    )
  }

  const onNoteDel = (id:number) =>{
    const newArr = arr.filter(item=>
      item.id!==id);
    setIndex(newArr.length-1);
    setArr(newArr);
    setNoteId(Noteid=>Noteid-1);
  }

  const onNoteAdd = ()=>{
    const newNote = {
      description: "",
      id: Noteid,
      curdate:new Date(),
    }
    setArr([...arr, newNote]);
    setNoteId(Noteid=>Noteid+1);
    setIndex(newNote.id);
  };

  const onIndex = (id:number)=>{
    setIndex(id);
  }
  return (
    <Wrapper>
      <GlobalStyle/>
      <ContentMenu 
        ContentArr={arr}
        onIndex= {onIndex}
        onNoteAdd = {onNoteAdd}
        onNoteDel = {onNoteDel}
        />
      <ContentView len = {arr.length} item={arr[index]} onChange={onChange}/>
    </Wrapper>
  );
}

export default App;
