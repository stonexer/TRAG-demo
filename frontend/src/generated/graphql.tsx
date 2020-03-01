import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  content: Scalars['String'];
  creator: CommonUserRef;
  replyTo?: Maybe<CommonUserRef>;
  isAuthor: Scalars['Boolean'];
  gmtCreate: Scalars['String'];
  likes: Scalars['Int'];
  replyComments: Array<Comment>;
};

export type CommonUserRef = {
  __typename?: 'CommonUserRef';
  id: Scalars['ID'];
  nickname: Scalars['String'];
  avatar: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
};

export type QueryCommentsArgs = {
  articleID: Scalars['ID'];
};

export type CommentsQueryVariables = {
  articleId: Scalars['ID'];
};

export type CommentsQuery = { __typename?: 'Query' } & {
  comments: Array<
    { __typename?: 'Comment' } & Pick<Comment, 'id' | 'content'> & {
        creator: { __typename?: 'CommonUserRef' } & Pick<
          CommonUserRef,
          'id' | 'nickname'
        >;
      }
  >;
};

export const CommentsDocument = gql`
  query Comments($articleId: ID!) {
    comments(articleID: $articleId) {
      id
      content
      creator {
        id
        nickname
      }
    }
  }
`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    baseOptions
  );
}
export function useCommentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    baseOptions
  );
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<
  typeof useCommentsLazyQuery
>;
export type CommentsQueryResult = ApolloReactCommon.QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>;
