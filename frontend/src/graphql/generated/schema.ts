// @ts-nocheck
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type AdminLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Attempt = {
  __typename?: 'Attempt';
  attemptDate: Scalars['DateTimeISO']['output'];
  idAttempt: Scalars['Int']['output'];
  isCorrect: Scalars['Boolean']['output'];
  letters: Scalars['String']['output'];
};

export type Game = {
  __typename?: 'Game';
  attempts: Array<Attempt>;
  endDate: Scalars['DateTimeISO']['output'];
  idGame: Scalars['Int']['output'];
  idUser: Scalars['Int']['output'];
  maxErrors: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  startDate: Scalars['DateTimeISO']['output'];
  status: Scalars['String']['output'];
  word: Word;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  saveGame: Game;
};


export type MutationAdminLoginArgs = {
  data: AdminLoginInput;
};


export type MutationSaveGameArgs = {
  idWord: Scalars['Int']['input'];
  score: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRandomWord?: Maybe<Word>;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryGetRandomWordArgs = {
  difficulty: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  bestScore: Scalars['Int']['output'];
  creationDate: Scalars['DateTimeISO']['output'];
  game: Game;
  gamesPlayed: Scalars['Int']['output'];
  gamesWon: Scalars['Int']['output'];
  idUser: Scalars['Int']['output'];
  role: Scalars['String']['output'];
  totalScore: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type Word = {
  __typename?: 'Word';
  category: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  game: Game;
  idWord: Scalars['Int']['output'];
  indice: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type SaveGameMutationVariables = Exact<{
  score: Scalars['Int']['input'];
  idWord: Scalars['Int']['input'];
  status: Scalars['String']['input'];
}>;


export type SaveGameMutation = { __typename?: 'Mutation', saveGame: { __typename?: 'Game', idGame: number, score: number, status: string } };

export type AdminLoginMutationVariables = Exact<{
  data: AdminLoginInput;
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', idUser: number, username: string, role: string } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', idUser: number, username: string, role: string }> };

export type GetRandomWordQueryVariables = Exact<{
  difficulty: Scalars['String']['input'];
}>;


export type GetRandomWordQuery = { __typename?: 'Query', getRandomWord?: { __typename?: 'Word', idWord: number, label: string, indice: string, difficulty: string, category: string } | null };


export const SaveGameDocument = gql`
    mutation SaveGame($score: Int!, $idWord: Int!, $status: String!) {
  saveGame(score: $score, idWord: $idWord, status: $status) {
    idGame
    score
    status
  }
}
    `;
export type SaveGameMutationFn = Apollo.MutationFunction<SaveGameMutation, SaveGameMutationVariables>;

/**
 * __useSaveGameMutation__
 *
 * To run a mutation, you first call `useSaveGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveGameMutation, { data, loading, error }] = useSaveGameMutation({
 *   variables: {
 *      score: // value for 'score'
 *      idWord: // value for 'idWord'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSaveGameMutation(baseOptions?: Apollo.MutationHookOptions<SaveGameMutation, SaveGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveGameMutation, SaveGameMutationVariables>(SaveGameDocument, options);
      }
export type SaveGameMutationHookResult = ReturnType<typeof useSaveGameMutation>;
export type SaveGameMutationResult = Apollo.MutationResult<SaveGameMutation>;
export type SaveGameMutationOptions = Apollo.BaseMutationOptions<SaveGameMutation, SaveGameMutationVariables>;
export const AdminLoginDocument = gql`
    mutation AdminLogin($data: AdminLoginInput!) {
  adminLogin(data: $data)
}
    `;
export type AdminLoginMutationFn = Apollo.MutationFunction<AdminLoginMutation, AdminLoginMutationVariables>;

/**
 * __useAdminLoginMutation__
 *
 * To run a mutation, you first call `useAdminLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminLoginMutation, { data, loading, error }] = useAdminLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAdminLoginMutation(baseOptions?: Apollo.MutationHookOptions<AdminLoginMutation, AdminLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(AdminLoginDocument, options);
      }
export type AdminLoginMutationHookResult = ReturnType<typeof useAdminLoginMutation>;
export type AdminLoginMutationResult = Apollo.MutationResult<AdminLoginMutation>;
export type AdminLoginMutationOptions = Apollo.BaseMutationOptions<AdminLoginMutation, AdminLoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    idUser
    username
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    idUser
    username
    role
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const GetRandomWordDocument = gql`
    query GetRandomWord($difficulty: String!) {
  getRandomWord(difficulty: $difficulty) {
    idWord
    label
    indice
    difficulty
    category
  }
}
    `;

/**
 * __useGetRandomWordQuery__
 *
 * To run a query within a React component, call `useGetRandomWordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandomWordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandomWordQuery({
 *   variables: {
 *      difficulty: // value for 'difficulty'
 *   },
 * });
 */
export function useGetRandomWordQuery(baseOptions: Apollo.QueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables> & ({ variables: GetRandomWordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
      }
export function useGetRandomWordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
        }
export function useGetRandomWordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
        }
export type GetRandomWordQueryHookResult = ReturnType<typeof useGetRandomWordQuery>;
export type GetRandomWordLazyQueryHookResult = ReturnType<typeof useGetRandomWordLazyQuery>;
export type GetRandomWordSuspenseQueryHookResult = ReturnType<typeof useGetRandomWordSuspenseQuery>;
export type GetRandomWordQueryResult = Apollo.QueryResult<GetRandomWordQuery, GetRandomWordQueryVariables>;