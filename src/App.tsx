import React,{useState,useEffect, useRef} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';

import styled,{createGlobalStyle} from 'styled-components';
<<<<<<< HEAD

=======
import firestore from './firebase';
import firebase from 'firebase'
import { createNoSubstitutionTemplateLiteral } from 'typescript';
>>>>>>> parent of 7799289 (onChange, id changed.  num to string)
const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
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
  const [Noteid, setNoteId] = useState(0); 
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState<IContent[]>(temp);
  const [initLoad, setInitLoad] = useState(false);
  const arrRef = useRef<IContent[]>();
<<<<<<< HEAD

  const onChange = (id:string, value: string)=>{
    firestore.collection('test').doc(id).set({
      description: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  };

  const onNoteDel =(id:string) =>{
    firestore.collection('test').doc(id).delete();
    setIndex(0);
  };
=======
  useEffect(()=>{
    async function Init(){
      setInitLoad(true);
      await firestore.collection('test')
      .onSnapshot((snap)=>{
        arrRef.current= snap.docs.map((doc)=>{
          console.log(doc.id);
          return {id: parseInt(doc.id),
            description:doc.data().description,}
          });
        setArr(arrRef.current);
        setNoteId(arrRef.current.length);
      });
      setInitLoad(false);
    }
    Init();
  },[])

  const onChange = (id:number, value: string)=>{
    firestore.collection('test').doc(Noteid.toString()).set({
      description: value
    })
  }

  const onNoteDel = (id:number) =>{
    firestore.collection('test').doc(id.toString()).delete();
  }
>>>>>>> parent of 7799289 (onChange, id changed.  num to string)


<<<<<<< HEAD
  useEffect(()=>{
    console.log(index);
  },[index,arr]);

  const onNoteAdd = ()=>{
    
  };

  const onIndex = (id:string)=>{
    const index = arr.findIndex((element)=>element.id===id);
    setIndex(index);
  };
=======
    firestore.collection('test').doc(Noteid.toString()).set({
      description: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const onIndex = (id:number)=>{
    setIndex(id);
  }
>>>>>>> parent of 7799289 (onChange, id changed.  num to string)

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
