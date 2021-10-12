import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { graphql } from 'react-apollo';
import Button from '../../Button';
import Link from '../../Link';
import '../style.css';
import compose from 'recompose/compose'

const ADD_STAR_REPOSITORY = gql`
    mutation($id: ID!) {
        addStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;

const REMOVE_STAR_REPOSITORY = gql`
    mutation($id: ID!) {
        removeStar(input: { starrableId: $id }) {
            starrable {
                id
                viewerHasStarred
            }
        }
    }
`;

const CHANGE_WATCHERS_REPOSITORY = gql`
    mutation($id: ID!, $subscriberState: String!) {
        updateSubscription(input: { subscribableId: $id, state: $subscriberState }) {
            subscribable {
                id
                viewerCanSubscribe
                viewerSubscription
            }
        }
    }
`;

/*export default ( { id, name, owner, stargazers, primaryLanguage, url, viewerSubscription, viewerHasStarred } ) =>
{
    return (
        <div key={id}>
            <div className="RepositoryItem-title">
                <h2>
                    <Link href={url}>{name}</Link>
                </h2>
                <div >
                    { !viewerHasStarred ? (<Mutation mutation={ ADD_STAR_REPOSITORY } variables={ { id } }>
                        { ( addStar ) =>
                            <Button className="RepositoryItem-title-action" onClick={ addStar }>
                                { stargazers.totalCount } Star
                            </Button>
                        }
                    </Mutation> ) :
                        ( <Mutation mutation={ REMOVE_STAR_REPOSITORY } variables={ { id } }>
                            {( removeStar ) => (
                                <Button className="RepositoryItem-title-action" onClick={ removeStar }>
                                    Unstar
                                </Button> ) }
                        </Mutation> ) }
                </div>
            </div>
            
            <div className="RepositoryItem-description">
                <div>
                    { primaryLanguage && <span>{ primaryLanguage.name }</span>}
                </div>
                <div>
                    { owner &&
                        ( <span>
                            Owner: <a href={ owner.url }>{ owner.login }</a>
                        </span>)}
                </div>
                <div>
                    <Mutation mutation={ CHANGE_WATCHERS_REPOSITORY } variables={ { id, subscriberState: viewerSubscription === 'UNSUBSCRIBED' ? 'SUBSCRIBED' :  'UNSUBSCRIBED' } }>
                        { ( updateSubscription ) => (
                            <Button className="RepositoryItem-title-action" onClick={ updateSubscription }>
                                {viewerSubscription === 'UNSUBSCRIBED' ? 'Subscribe' :  'Unsubscribe' }
                            </Button> ) }
                    </Mutation> 
                </div>
            </div>
        </div>
    )
}*/

const RepositoryItem = ( { id, name, owner, stargazers, primaryLanguage, url, viewerSubscription, viewerHasStarred,...props } ) => {

    const invokeStarredRepository = ( repositoryId ) => {
        const { mutate } = props;
        mutate( {
            variables: {
                id: repositoryId
            }
        } )
    }
    
    return (
        <div key={ id }>
            <div className="RepositoryItem-title">
                <h2>
                    <Link href={url}>{name}</Link>
                </h2>
                <div >
                    { !viewerHasStarred ? (
                            <Button className="RepositoryItem-title-action" onClick={() => invokeStarredRepository(id)}>
                                { stargazers.totalCount } Star
                            </Button>
                     ) :
                        ( <Mutation mutation={ REMOVE_STAR_REPOSITORY } variables={ { id } }>
                            {( removeStar ) => (
                                <Button className="RepositoryItem-title-action" onClick={ removeStar }>
                                    Unstar
                                </Button> ) }
                        </Mutation> ) }
                </div>
            </div>
        </div>) 
}

export default compose(graphql(ADD_STAR_REPOSITORY),graphql(REMOVE_STAR_REPOSITORY))(RepositoryItem)
