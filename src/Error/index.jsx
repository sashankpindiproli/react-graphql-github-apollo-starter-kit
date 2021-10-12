import React from 'react';

export default ( { error } ) => (
    <div className="ErrorMessage">
        <small>{ error.toString() }</small>
    </div> )
