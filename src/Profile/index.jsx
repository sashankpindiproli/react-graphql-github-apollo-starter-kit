import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
import Loading from '../Loading';
import RepositoryList,{ REPOSITORY_FRAGMENT } from '../Repository';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
 query {
     viewer {
         login
         name
         repositories( first: 5 orderBy: {field: PUSHED_AT , direction: ASC}) {
             edges {
                 node {
                    ...repositoryFragment 
                 }
             }
        }
        bio
     }
 }

 ${REPOSITORY_FRAGMENT}
`

/* RENDERING PROPS
class Profile extends Component
{
    render () {
        return (
            <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
                {( { data,loading, error  } ) => {
                    if ( loading ) return <Loading />
                    if ( error ) return <ErrorMessage error={ error }/>
                    const { viewer: { repositories } } = data;
                    return <RepositoryList repositories={ repositories } />;
                }
                }
            </Query>
        )
    }
}*/

class Profile extends Component {
    render () {
        const { data, loading, error } = this.props;
        const viewer = data.viewer;
        if ( loading ) return <Loading />
        if ( error ) return <ErrorMessage error={ error } />
        
        
        if ( viewer ) {
            const { repositories } = viewer;
            return <RepositoryList repositories={ repositories } />
        }
        return null;
    }
}

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
