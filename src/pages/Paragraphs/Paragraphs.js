import React from 'react';
import Paragraph from './Paragraph/Paragraph';
import Typography from '@material-ui/core/Typography';

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
                : <Typography
                    component="p">
                    No entries found
                </Typography>
            }
        </>
}
 
export default Paragraphs;
