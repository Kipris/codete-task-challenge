import React from 'react';
import Paragraph from './Paragraph/Paragraph';

const Paragraphs = ({paragraphs}) => {
    return <>
            {paragraphs.length 
                ? paragraphs.map(paragraph => {
                    const body = paragraph.body.length >= 80
                        ? `${paragraph.body.slice(0, 80)}...`
                        : paragraph.body;
                    return (
                        <Paragraph 
                            key={paragraph.id}
                            id={paragraph.id}
                            title={paragraph.title}
                            body={body}/>
                    )
                })
                : <p>No entries found</p>
            }
        </>
}
 
export default Paragraphs;
