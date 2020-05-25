import React, { useState, useEffect, useReducer } from 'react';
import Paragraph from './Paragraph';

const Paragraphs = ({paragraphs}) => {
    return <>
            {paragraphs
                .map(paragraph => {
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
            })}
        </>
}
 
export default Paragraphs;
