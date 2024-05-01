
function Article(props){
    const articleStyle = {
      textAlign: 'center'
    };
      return <article style={articleStyle}>
           <h1> {props.title}</h1>
           <h2> {props.body}</h2>
     </article> 
  
    }


    export default Article;