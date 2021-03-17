import styled from 'styled-components';
import marked from 'marked';
import prismjs from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'
const RenderView = styled.div`
    width: 50%;
    padding: 0 50px;
    height:100%;
    text-overflow:ellipsis;
    word-wrap: break-word;
    overflow-y:scroll;
    &::-webkit-scrollbar{
	border-radius: 10px;
	background-color: #F5F5F5;
    }
`

interface AProps{
    item: {description:string, id:number};
}

const MarkView = ({item}:AProps)=>{
    const marker = marked;
   
    marker.setOptions({
        highlight: function (code, lang) {
            code =  prismjs.highlight(code, prismjs.languages[lang], lang);
            if (!lang) {
                return `<pre><code>${code}</code></pre>`;
              }
              var langClass = "language-" + lang;
              return `<pre class="${langClass}"><code class="${langClass}">${code}</code></pre>`;
        },
        renderer : new marked.Renderer(),
        pedantic: false,
        gfm: true,
        breaks: true,
        smartLists: false,
        smartypants: false,
        xhtml: false
    });
    const html = marker(item.description);
    const markup = {__html:html};

    return(
        <RenderView dangerouslySetInnerHTML={markup}/>
    )
}

export default MarkView