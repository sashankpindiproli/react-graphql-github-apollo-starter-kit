import gql from 'graphql-tag';

const REPOSITORY_FRAGMENT = gql`
 fragment repositoryFragment on Repository {
     id
     name
     url
     descriptionHTML
     primaryLanguage {
        name
    }
    owner {
        login
        url
    }
    stargazers {
        totalCount
    }
    viewerHasStarred
    watchers {
        totalCount
    }
    viewerSubscription
 }
`;

export default REPOSITORY_FRAGMENT;
