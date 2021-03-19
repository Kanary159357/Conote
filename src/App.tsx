import React,{useCallback, useState, useEffect} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';

import styled,{createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  box-sizing:border-box;
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');
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
  {description:"",id:0},
  {description : "11111111111111124214124214121111111111111111111111111111111111111111111111111111111111111111111\n\n111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111", id:1},
  {description : "안ㅂㅈㄼㅈㄼㅈㄼㅈㄹ녕",id:2},
  {description : "안ㅂㅈㄹㅈㅂㄹㅈㅂㄹ녕",id:3},
  {description : "안ㅈㅂㄹㅈㅂㄼㅈㄹ녕",id:4},
  {description : "안ㅂㅈㄼㅈㄼㅈㄼㅈㄹ녕",id:5},
  {description : "안ㅂㅈㄹㅈㅂㄹㅈㅂㄹ녕",id:6},
  {description : "안ㅈㅂㄹㅈㅂㄼㅈㄹ녕",id:7},
  {description : "안녕ㅂㅈㄹㅈㅂㄹ",id:8},
  {description : "안ㅈㅂㄹㅈㅂㄹㅈㅂㄹ녕",id:9},
  {description : "안ㄹㄼㅈㅂㅈㄹ녕",id:10},
  {description : "안녕ㅈㅂㄹㅈㅂㄹㅈㅂㄹ",id:11},
  {description : "안ㅂㅈㄼㅈ녕",id:12},
  {description : "안ㅂㅈㄹㅈㅂㄹ녕",id:13},
  {description : "안녕나는",id:14},
]

interface IContent{
  description:string;
  id:number;
};
function App() {
  const [index, setIndex] = useState(0);
  const [Noteid, setNoteId] = useState(15); 
  const [arr, setArr] = useState<IContent[]>(temp);
  const onChange = (id:number, value: string)=>{
    setArr(
      arr.map(item=>
        item.id===id ? {...item, description:value} : item
        )
    )
  }

  const onNoteDel = (id:number) =>{
    const newArr = arr.filter(item=>
      item.id!==id);
    setIndex(newArr.length-1);
    setArr(newArr);
  }


  useEffect(()=>{
    console.log(index);
  },[index,arr]);

  const onNoteAdd = ()=>{
    const newNote = {
      description: "New Note",
      id: Noteid,
    }
    setArr([...arr, newNote]);
    setNoteId(Noteid=>Noteid+1);
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
      <ContentView item={arr[index]} onChange={onChange}/>
    </Wrapper>
  );
}

export default App;
