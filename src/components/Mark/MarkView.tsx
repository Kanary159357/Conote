import styled from 'styled-components';
import marked from 'marked';
import prismjs from 'prismjs';
import React from 'react';
import './Prismtheme.css'
const RenderView = styled.div<{toggle:boolean}>`
    width: ${props=>props.toggle? "0%": "50%"};
    height:100%;
    text-overflow:ellipsis;
    word-wrap: break-word;
    padding: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
    ::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`

interface AProps{
    item: {description:string, id:number};
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
        <RenderView toggle={toggle} dangerouslySetInnerHTML={getMarkHtml()}/>
    )
}

export default MarkView