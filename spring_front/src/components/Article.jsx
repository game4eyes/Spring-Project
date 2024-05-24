import React from 'react';
// import '../css/Article.css'; // CSS 파일을 컴포넌트에 임포트

function Article(props) {
    return (
        <article className="article-container">
            <h1 style ={{marginLeft:'50px'}}>{props.title}</h1>
            <hr/>
            {/* <h2>{props.body}</h2> */}
        </article>
    );
}

export default Article;
