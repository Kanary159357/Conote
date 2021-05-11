import React,{useState,useEffect, useRef} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';
import styled,{createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
  }

`

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  width: 100vw;
`
const temp:IContent[] = [
  {description:"Starts from now",id:0},
]

interface IContent{
  description:string;
  id:number;
};


function App() {
  const [Noteid, setNoteId] = useState(0); 
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState<IContent[]>(temp);

  const onChange = (id:number, value: string)=>{
    setArr(
      arr.map(item=>
        item.id===id? {...item, description:value} : item
        )
    )
  };

  const onNoteDel =(id:number) =>{
    const newArr = arr.filter(item=>
      item.id!==id);
    setIndex(newArr.length-1);
    setArr(newArr);
  };


  useEffect(()=>{
    console.log(index);
  },[index,arr]);

  const onNoteAdd = ()=>{
    const newNote = {
      description: "",
      id: Noteid,
    }
    setArr([...arr, newNote]);
    setNoteId(Noteid=>Noteid+1);
  };

  const onIndex = (id:number)=>{
    const index = arr.findIndex((element)=>element.id===id);
    setIndex(index);
  };

  return (
    <Wrapper>
      <GlobalStyle/>
      <ContentMenu 
        ContentArr={arr}
        onIndex= {onIndex}
        onNoteAdd = {onNoteAdd}
        onNoteDel = {onNoteDel}
        />
      <ContentView item={arr[index]} onChange={onChange}/>
    </Wrapper>
  );
}

export default App;
