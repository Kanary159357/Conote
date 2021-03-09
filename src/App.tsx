import React,{useState} from 'react';
import ContentMenu from './components/ContentMenu';
import ContentView from './components/ContentView';
import styled,{createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  box-sizing:border-box;
`

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  width: 100vw;
`
const temp:IContent[] = [
  {description : "11111111111111124214124214121111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"},
  {description : "안ㅂㅈㄼㅈㄼㅈㄼㅈㄹ녕"},
  {description : "안ㅂㅈㄹㅈㅂㄹㅈㅂㄹ녕"},
  {description : "안ㅈㅂㄹㅈㅂㄼㅈㄹ녕"},
  {description : "안ㅂㅈㄼㅈㄼㅈㄼㅈㄹ녕"},
  {description : "안ㅂㅈㄹㅈㅂㄹㅈㅂㄹ녕"},
  {description : "안ㅈㅂㄹㅈㅂㄼㅈㄹ녕"},
  {description : "안녕ㅂㅈㄹㅈㅂㄹ"},
  {description : "안ㅈㅂㄹㅈㅂㄹㅈㅂㄹ녕"},
  {description : "안ㄹㄼㅈㅂㅈㄹ녕"},
  {description : "안녕ㅈㅂㄹㅈㅂㄹㅈㅂㄹ"},
  {description : "안ㅂㅈㄼㅈ녕"},
  {description : "안ㅂㅈㄹㅈㅂㄹ녕"},
  {description : "안녕나는"},
]

interface IContent{
  description:string;
};
function App() {
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState<IContent[]>(temp);
  const handleMenuClick = ():void=>{
    console.log();
  }
  
  return (
    <Wrapper>
      <GlobalStyle/>
      <ContentMenu 
        ContentArr={arr}
        />
      <ContentView item={arr[0]}/>
    </Wrapper>
  );
}

export default App;
