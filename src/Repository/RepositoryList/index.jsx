import React, {Component} from 'react';
import RepositoryItem from '../RepositoryItem';

class RepositoryList extends Component {
    render ()
    { 
        const { repositories } = this.props;
        const { edges } = repositories;
        return edges.map( ( { id, node } ) => <div key={id}><RepositoryItem {...node} /></div>);
    }
}

export default RepositoryList;
