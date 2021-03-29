import React,{useState,useEffect, useRef, useCallback} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';
import styled,{createGlobalStyle} from 'styled-components';
import firestore from './firebase';
import firebase from 'firebase'
const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
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
  id:string;
};


function App() {
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
          return {id: doc.id,
            description:doc.data().description,}
          });
        setArr(arrRef.current);
      });
      setInitLoad(false);
    }
    Init();
  },[])

  const onChange = useCallback((id:string, value: string)=>{
    firestore.collection('test').doc(id).set({
      description: value
    })
  },[]);

  const onNoteDel = (id:string) =>{
    firestore.collection('test').doc(id).delete();
  }

  const onNoteAdd = ()=>{

    firestore.collection('test').add({
      description: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const onIndex = (id:string)=>{
    const index = arr.findIndex((element)=>element.id===id);
    setIndex(index);
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
