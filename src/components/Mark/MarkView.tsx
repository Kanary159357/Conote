import styled from 'styled-components';
import marked from 'marked';
import prismjs from 'prismjs';
import React,{useState} from 'react';
import './Prismtheme.css'
const Wrapper = styled.div<RenderProps>`
    width: ${props=>props.toggle? "0%" : "50%"};
    transition: all 0.2s;
`;

interface RenderProps{
    toggle: boolean;
}

const RenderView = styled.div`
    text-overflow:ellipsis;
    word-wrap: break-word;
    box-sizing: border-box;
    &::-webkit-scrollbar{
	border-radius: 10px;
	background-color: #F5F5F5;
    }
    overflow-y:scroll;
    height: 100%;
`

interface AProps{
    item: {description:string, id:string};
    toggle:boolean;
}

const MarkView = ({item, toggle}:AProps)=>{
    const marker = marked;
    let markup;
    marker.setOptions({
        highlight: function (code, lang) {
            if(prismjs.languages[lang]){
            code =  prismjs.highlight(code, prismjs.languages[lang], lang);
            if (!lang) {
                return `<pre><code>${code}</code></pre>`;
              }
              var langClass = "language-" + lang;
              return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
            }else{
                return code;
            }
        },
        renderer : new marked.Renderer(),
        pedantic: false,
        gfm: true,
        breaks: true,
        smartLists: false,
        smartypants: false,
        xhtml: false,
    });

    const getMarkHtml = ()=>{
        markup = {__html: marker(item.description)};
        return markup;
    };

    return(
        <Wrapper toggle={toggle}>
        <RenderView dangerouslySetInnerHTML={getMarkHtml()}/>
        </Wrapper>
    )
}

export default MarkView