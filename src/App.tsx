import React,{useState,useEffect, useRef} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';
import styled,{createGlobalStyle} from 'styled-components';
import firestore from './firebase';
import firebase from 'firebase'
import { createNoSubstitutionTemplateLiteral } from 'typescript';
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
};


function App() {
  const [Noteid, setNoteId] = useState(0); 
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState<IContent[]>(temp);
  const [initLoad, setInitLoad] = useState(false);
  const arrRef = useRef<IContent[]>();
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

  const onNoteAdd = ()=>{

    firestore.collection('test').doc(Noteid.toString()).set({
      description: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
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
