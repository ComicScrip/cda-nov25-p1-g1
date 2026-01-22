// @ts-nocheck
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
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
  attempts?: Maybe<Array<Attempt>>;
  endDate: Scalars['DateTimeISO']['output'];
  errorsCount: Scalars['Int']['output'];
  idGame: Scalars['Int']['output'];
  idUser: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  startDate: Scalars['DateTimeISO']['output'];
  status: Scalars['String']['output'];
  usedHint: Scalars['Boolean']['output'];
  word: Word;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: Scalars['String']['output'];
  createWord: Word;
  deleteWord: Scalars['String']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  saveGame: Game;
  signUp: User;
  updateWord: Word;
};


export type MutationAdminLoginArgs = {
  data: AdminLoginInput;
};


export type MutationCreateWordArgs = {
  data: WordInput;
};


export type MutationDeleteWordArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSaveGameArgs = {
  errors: Scalars['Int']['input'];
  idWord: Scalars['Int']['input'];
  status: Scalars['String']['input'];
  usedHint: Scalars['Boolean']['input'];
};


export type MutationSignUpArgs = {
  data: SignUp;
};


export type MutationUpdateWordArgs = {
  data: WordInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRandomWord?: Maybe<Word>;
  me: User;
  users: Array<User>;
  word: Word;
  words: Array<Word>;
};


export type QueryGetRandomWordArgs = {
  difficulty: Scalars['String']['input'];
};


export type QueryWordArgs = {
  id: Scalars['Int']['input'];
};


export type QueryWordsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  labelContains?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type SignUp = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type WordInput = {
  category: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  indice: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export type SaveGameMutationVariables = Exact<{
  idWord: Scalars['Int']['input'];
  status: Scalars['String']['input'];
  errors: Scalars['Int']['input'];
  usedHint: Scalars['Boolean']['input'];
}>;


export type SaveGameMutation = { __typename?: 'Mutation', saveGame: { __typename?: 'Game', idGame: number, score: number, status: string } };

export type AdminLoginMutationVariables = Exact<{
  data: AdminLoginInput;
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: string };

export type CreateWordMutationVariables = Exact<{
  data: WordInput;
}>;


export type CreateWordMutation = { __typename?: 'Mutation', createWord: { __typename?: 'Word', idWord: number, label: string, indice: string, difficulty: string, category: string } };

export type DeleteWordMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteWordMutation = { __typename?: 'Mutation', deleteWord: string };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', idUser: number, username: string, role: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', idUser: number, username: string, role: string } };

export type SignUpMutationVariables = Exact<{
  data: SignUp;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', idUser: number, username: string, role: string } };

export type UpdateWordMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: WordInput;
}>;


export type UpdateWordMutation = { __typename?: 'Mutation', updateWord: { __typename?: 'Word', idWord: number, label: string, indice: string, difficulty: string, category: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', idUser: number, username: string, role: string }> };

export type GetRandomWordQueryVariables = Exact<{
  difficulty: Scalars['String']['input'];
}>;


export type GetRandomWordQuery = { __typename?: 'Query', getRandomWord?: { __typename?: 'Word', idWord: number, label: string, indice: string, difficulty: string, category: string } | null };

export type WordsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
}>;


export type WordsQuery = { __typename?: 'Query', words: Array<{ __typename?: 'Word', idWord: number, label: string, indice: string, difficulty: string, category: string }> };


export const SaveGameDocument = gql`
    mutation SaveGame($idWord: Int!, $status: String!, $errors: Int!, $usedHint: Boolean!) {
  saveGame(idWord: $idWord, status: $status, errors: $errors, usedHint: $usedHint) {
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
 *      idWord: // value for 'idWord'
 *      status: // value for 'status'
 *      errors: // value for 'errors'
 *      usedHint: // value for 'usedHint'
 *   },
 * });
 */
export function useSaveGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveGameMutation, SaveGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveGameMutation, SaveGameMutationVariables>(SaveGameDocument, options);
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
export function useAdminLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminLoginMutation, AdminLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(AdminLoginDocument, options);
      }
export type AdminLoginMutationHookResult = ReturnType<typeof useAdminLoginMutation>;
export type AdminLoginMutationResult = Apollo.MutationResult<AdminLoginMutation>;
export type AdminLoginMutationOptions = Apollo.BaseMutationOptions<AdminLoginMutation, AdminLoginMutationVariables>;
export const CreateWordDocument = gql`
    mutation CreateWord($data: WordInput!) {
  createWord(data: $data) {
    idWord
    label
    indice
    difficulty
    category
  }
}
    `;
export type CreateWordMutationFn = Apollo.MutationFunction<CreateWordMutation, CreateWordMutationVariables>;

/**
 * __useCreateWordMutation__
 *
 * To run a mutation, you first call `useCreateWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWordMutation, { data, loading, error }] = useCreateWordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWordMutation, CreateWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateWordMutation, CreateWordMutationVariables>(CreateWordDocument, options);
      }
export type CreateWordMutationHookResult = ReturnType<typeof useCreateWordMutation>;
export type CreateWordMutationResult = Apollo.MutationResult<CreateWordMutation>;
export type CreateWordMutationOptions = Apollo.BaseMutationOptions<CreateWordMutation, CreateWordMutationVariables>;
export const DeleteWordDocument = gql`
    mutation DeleteWord($id: Int!) {
  deleteWord(id: $id)
}
    `;
export type DeleteWordMutationFn = Apollo.MutationFunction<DeleteWordMutation, DeleteWordMutationVariables>;

/**
 * __useDeleteWordMutation__
 *
 * To run a mutation, you first call `useDeleteWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWordMutation, { data, loading, error }] = useDeleteWordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteWordMutation, DeleteWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteWordMutation, DeleteWordMutationVariables>(DeleteWordDocument, options);
      }
export type DeleteWordMutationHookResult = ReturnType<typeof useDeleteWordMutation>;
export type DeleteWordMutationResult = Apollo.MutationResult<DeleteWordMutation>;
export type DeleteWordMutationOptions = Apollo.BaseMutationOptions<DeleteWordMutation, DeleteWordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    idUser
    username
    role
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: SignUp!) {
  signUp(data: $data) {
    idUser
    username
    role
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateWordDocument = gql`
    mutation UpdateWord($id: Int!, $data: WordInput!) {
  updateWord(id: $id, data: $data) {
    idWord
    label
    indice
    difficulty
    category
  }
}
    `;
export type UpdateWordMutationFn = Apollo.MutationFunction<UpdateWordMutation, UpdateWordMutationVariables>;

/**
 * __useUpdateWordMutation__
 *
 * To run a mutation, you first call `useUpdateWordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWordMutation, { data, loading, error }] = useUpdateWordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWordMutation, UpdateWordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateWordMutation, UpdateWordMutationVariables>(UpdateWordDocument, options);
      }
export type UpdateWordMutationHookResult = ReturnType<typeof useUpdateWordMutation>;
export type UpdateWordMutationResult = Apollo.MutationResult<UpdateWordMutation>;
export type UpdateWordMutationOptions = Apollo.BaseMutationOptions<UpdateWordMutation, UpdateWordMutationVariables>;
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
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
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
export function useGetRandomWordQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables> & ({ variables: GetRandomWordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
      }
export function useGetRandomWordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
        }
export function useGetRandomWordSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetRandomWordQuery, GetRandomWordQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRandomWordQuery, GetRandomWordQueryVariables>(GetRandomWordDocument, options);
        }
export type GetRandomWordQueryHookResult = ReturnType<typeof useGetRandomWordQuery>;
export type GetRandomWordLazyQueryHookResult = ReturnType<typeof useGetRandomWordLazyQuery>;
export type GetRandomWordSuspenseQueryHookResult = ReturnType<typeof useGetRandomWordSuspenseQuery>;
export type GetRandomWordQueryResult = Apollo.QueryResult<GetRandomWordQuery, GetRandomWordQueryVariables>;
export const WordsDocument = gql`
    query Words($limit: Int, $sortBy: String, $order: String) {
  words(limit: $limit, sortBy: $sortBy, order: $order) {
    idWord
    label
    indice
    difficulty
    category
  }
}
    `;

/**
 * __useWordsQuery__
 *
 * To run a query within a React component, call `useWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWordsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useWordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WordsQuery, WordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<WordsQuery, WordsQueryVariables>(WordsDocument, options);
      }
export function useWordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WordsQuery, WordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<WordsQuery, WordsQueryVariables>(WordsDocument, options);
        }
export function useWordsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<WordsQuery, WordsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<WordsQuery, WordsQueryVariables>(WordsDocument, options);
        }
export type WordsQueryHookResult = ReturnType<typeof useWordsQuery>;
export type WordsLazyQueryHookResult = ReturnType<typeof useWordsLazyQuery>;
export type WordsSuspenseQueryHookResult = ReturnType<typeof useWordsSuspenseQuery>;
export type WordsQueryResult = Apollo.QueryResult<WordsQuery, WordsQueryVariables>;