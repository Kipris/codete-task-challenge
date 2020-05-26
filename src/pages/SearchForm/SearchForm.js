import React from 'react';
import TextField from '@material-ui/core/TextField';

const SearchForm = ({ searchString, handleSearch }) => {
    return (
        <form noValidate autoComplete="off">
            <TextField
                id="search"
                label="Search in paragraph"
                variant="outlined"
                fullWidth
                color="primary"
                value={searchString}
                onChange={event => handleSearch(event, event.target.value)} />
        </form>
    );
}

export default SearchForm;