/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreatePost: OnCreatePostSubscription;
  onUpdatePost: OnUpdatePostSubscription;
  onDeletePost: OnDeletePostSubscription;
  onCreateVideoCall: OnCreateVideoCallSubscription;
  onUpdateVideoCall: OnUpdateVideoCallSubscription;
  onDeleteVideoCall: OnDeleteVideoCallSubscription;
  onCreateUser: OnCreateUserSubscription;
  onUpdateUser: OnUpdateUserSubscription;
  onDeleteUser: OnDeleteUserSubscription;
};

export type CreatePostInput = {
  id?: string | null;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
};

export type ModelPostConditionInput = {
  imagekey?: ModelStringInput | null;
  author?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  locationName?: ModelStringInput | null;
  lat?: ModelFloatInput | null;
  long?: ModelFloatInput | null;
  and?: Array<ModelPostConditionInput | null> | null;
  or?: Array<ModelPostConditionInput | null> | null;
  not?: ModelPostConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Post = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePostInput = {
  id: string;
  imagekey?: string | null;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
};

export type DeletePostInput = {
  id: string;
};

export type CreateVideoCallInput = {
  id?: string | null;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
};

export enum CallStatus {
  requested = "requested",
  approved = "approved"
}

export type ModelVideoCallConditionInput = {
  attendeeIds?: ModelStringInput | null;
  time?: ModelStringInput | null;
  status?: ModelCallStatusInput | null;
  and?: Array<ModelVideoCallConditionInput | null> | null;
  or?: Array<ModelVideoCallConditionInput | null> | null;
  not?: ModelVideoCallConditionInput | null;
};

export type ModelCallStatusInput = {
  eq?: CallStatus | null;
  ne?: CallStatus | null;
};

export type VideoCall = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateVideoCallInput = {
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
};

export type DeleteVideoCallInput = {
  id: string;
};

export type CreateUserInput = {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
};

export enum UserType {
  doctor = "doctor",
  patient = "patient"
}

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  type?: ModelUserTypeInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelUserTypeInput = {
  eq?: UserType | null;
  ne?: UserType | null;
};

export type User = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
};

export type DeleteUserInput = {
  id: string;
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null;
  imagekey?: ModelStringInput | null;
  author?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  locationName?: ModelStringInput | null;
  lat?: ModelFloatInput | null;
  long?: ModelFloatInput | null;
  and?: Array<ModelPostFilterInput | null> | null;
  or?: Array<ModelPostFilterInput | null> | null;
  not?: ModelPostFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection";
  items?: Array<Post | null> | null;
  nextToken?: string | null;
};

export type ModelVideoCallFilterInput = {
  id?: ModelIDInput | null;
  attendeeIds?: ModelStringInput | null;
  time?: ModelStringInput | null;
  status?: ModelCallStatusInput | null;
  and?: Array<ModelVideoCallFilterInput | null> | null;
  or?: Array<ModelVideoCallFilterInput | null> | null;
  not?: ModelVideoCallFilterInput | null;
};

export type ModelVideoCallConnection = {
  __typename: "ModelVideoCallConnection";
  items?: Array<VideoCall | null> | null;
  nextToken?: string | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  type?: ModelUserTypeInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items?: Array<User | null> | null;
  nextToken?: string | null;
};

export type CreatePostMutation = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePostMutation = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeletePostMutation = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateVideoCallMutation = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateVideoCallMutation = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteVideoCallMutation = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type GetPostQuery = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListPostsQuery = {
  __typename: "ModelPostConnection";
  items?: Array<{
    __typename: "Post";
    id: string;
    imagekey: string;
    author?: string | null;
    comment?: string | null;
    locationName?: string | null;
    lat?: number | null;
    long?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetVideoCallQuery = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type ListVideoCallsQuery = {
  __typename: "ModelVideoCallConnection";
  items?: Array<{
    __typename: "VideoCall";
    id: string;
    attendeeIds?: Array<string | null> | null;
    time?: string | null;
    status?: CallStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items?: Array<{
    __typename: "User";
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    type?: UserType | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreatePostSubscription = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePostSubscription = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePostSubscription = {
  __typename: "Post";
  id: string;
  imagekey: string;
  author?: string | null;
  comment?: string | null;
  locationName?: string | null;
  lat?: number | null;
  long?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateVideoCallSubscription = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateVideoCallSubscription = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteVideoCallSubscription = {
  __typename: "VideoCall";
  id: string;
  attendeeIds?: Array<string | null> | null;
  time?: string | null;
  status?: CallStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  type?: UserType | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreatePost(
    input: CreatePostInput,
    condition?: ModelPostConditionInput
  ): Promise<CreatePostMutation> {
    const statement = `mutation CreatePost($input: CreatePostInput!, $condition: ModelPostConditionInput) {
        createPost(input: $input, condition: $condition) {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePostMutation>response.data.createPost;
  }
  async UpdatePost(
    input: UpdatePostInput,
    condition?: ModelPostConditionInput
  ): Promise<UpdatePostMutation> {
    const statement = `mutation UpdatePost($input: UpdatePostInput!, $condition: ModelPostConditionInput) {
        updatePost(input: $input, condition: $condition) {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePostMutation>response.data.updatePost;
  }
  async DeletePost(
    input: DeletePostInput,
    condition?: ModelPostConditionInput
  ): Promise<DeletePostMutation> {
    const statement = `mutation DeletePost($input: DeletePostInput!, $condition: ModelPostConditionInput) {
        deletePost(input: $input, condition: $condition) {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePostMutation>response.data.deletePost;
  }
  async CreateVideoCall(
    input: CreateVideoCallInput,
    condition?: ModelVideoCallConditionInput
  ): Promise<CreateVideoCallMutation> {
    const statement = `mutation CreateVideoCall($input: CreateVideoCallInput!, $condition: ModelVideoCallConditionInput) {
        createVideoCall(input: $input, condition: $condition) {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVideoCallMutation>response.data.createVideoCall;
  }
  async UpdateVideoCall(
    input: UpdateVideoCallInput,
    condition?: ModelVideoCallConditionInput
  ): Promise<UpdateVideoCallMutation> {
    const statement = `mutation UpdateVideoCall($input: UpdateVideoCallInput!, $condition: ModelVideoCallConditionInput) {
        updateVideoCall(input: $input, condition: $condition) {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVideoCallMutation>response.data.updateVideoCall;
  }
  async DeleteVideoCall(
    input: DeleteVideoCallInput,
    condition?: ModelVideoCallConditionInput
  ): Promise<DeleteVideoCallMutation> {
    const statement = `mutation DeleteVideoCall($input: DeleteVideoCallInput!, $condition: ModelVideoCallConditionInput) {
        deleteVideoCall(input: $input, condition: $condition) {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVideoCallMutation>response.data.deleteVideoCall;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async GetPost(id: string): Promise<GetPostQuery> {
    const statement = `query GetPost($id: ID!) {
        getPost(id: $id) {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPostQuery>response.data.getPost;
  }
  async ListPosts(
    filter?: ModelPostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPostsQuery> {
    const statement = `query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
        listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            imagekey
            author
            comment
            locationName
            lat
            long
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPostsQuery>response.data.listPosts;
  }
  async GetVideoCall(id: string): Promise<GetVideoCallQuery> {
    const statement = `query GetVideoCall($id: ID!) {
        getVideoCall(id: $id) {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVideoCallQuery>response.data.getVideoCall;
  }
  async ListVideoCalls(
    filter?: ModelVideoCallFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVideoCallsQuery> {
    const statement = `query ListVideoCalls($filter: ModelVideoCallFilterInput, $limit: Int, $nextToken: String) {
        listVideoCalls(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            attendeeIds
            time
            status
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVideoCallsQuery>response.data.listVideoCalls;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            firstName
            lastName
            email
            type
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  OnCreatePostListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePost">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePost {
        onCreatePost {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePost">>
  >;

  OnUpdatePostListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePost">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePost {
        onUpdatePost {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePost">>
  >;

  OnDeletePostListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePost">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePost {
        onDeletePost {
          __typename
          id
          imagekey
          author
          comment
          locationName
          lat
          long
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePost">>
  >;

  OnCreateVideoCallListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateVideoCall">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVideoCall {
        onCreateVideoCall {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateVideoCall">>
  >;

  OnUpdateVideoCallListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateVideoCall">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVideoCall {
        onUpdateVideoCall {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateVideoCall">>
  >;

  OnDeleteVideoCallListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteVideoCall">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVideoCall {
        onDeleteVideoCall {
          __typename
          id
          attendeeIds
          time
          status
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteVideoCall">>
  >;

  OnCreateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser {
        onCreateUser {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  >;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser {
        onUpdateUser {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  >;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser {
        onDeleteUser {
          __typename
          id
          firstName
          lastName
          email
          type
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  >;
}
