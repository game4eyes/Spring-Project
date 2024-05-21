import React from 'react';

const Hero = ({ title, body }) => {
    const articleStyle = {
      textAlign: 'center'
    };
    return (
        <div style={articleStyle}>
            <h1>{title}</h1>
            <h2>{body}(히어로)</h2>
            <hr />
        </div>
    );
};

export default Hero;


