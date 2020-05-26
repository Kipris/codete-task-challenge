import React from 'react';
import { Route } from 'react-router-dom';
import ParagraphDetails from './ParagraphDetails';

const ParagraphDetailsRoute = () => {
    return (
        <Route path='/paragraphs/:paragraphId'>
            <ParagraphDetails />
        </Route>
    );
}
 
export default ParagraphDetailsRoute;