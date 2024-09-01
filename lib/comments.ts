// comments.js

import graphqlRequest from "./graphqlRequest";

interface CommentBody {
  author: string;
  authorEmail: string;
  postId: string;
  content: string;
}

interface CommentResponse {
  data: {
      createComment: {
          success: boolean;
      };
  };
  errors?: Array<{ message: string }>;
}

export async function createComment(body: CommentBody):Promise<CommentResponse> {
    const mutation = {
        query: `mutation createComment(
            $author: String = "${body.author}", 
            $authorEmail: String = "${body.authorEmail}", 
            $clientMutationId: String = "uniqueId", 
            $commentOn: Int = ${parseInt(body.postId)}, 
            $content: String = "${body.content}") {
            createComment(
              input: {
                author: $author, 
                authorEmail: 
                $authorEmail, 
                clientMutationId: $clientMutationId, 
                content: $content, 
                commentOn: $commentOn
              }
            ) {
              success
            }
          }`
    };

    const resJson = await graphqlRequest<CommentResponse>(mutation);

    return resJson;
}

interface CommentAuthor {
  node: {
      name: string;
      avatar: {
          url: string;
          height: number;
          width: number;
      };
  };
}

interface CommentNode {
  id: string;
  content: string;
  date: string;
  parentId: string | null;
  author: CommentAuthor;
}

export interface CommentsData {
  nodes: CommentNode[];
}

export interface GetCommentsResponse {
  comments: CommentsData;
  commentCount: number;
}

interface CommentsQueryResponse {
  data: {
      post: {
          comments: {
              nodes: CommentNode[];
          };
          commentCount: number;
      };
  };
}


export async function getComments(slug: string): Promise<GetCommentsResponse> {
    const query = {
        query: `query getComments {
            post(id: "${slug}", idType: SLUG) {
              comments(where: {parentIn: "null"}) {
                nodes {
                  content
                  author {
                    node {
                      name
                      avatar {
                        url
                        height
                        width
                      }
                    }
                  }
                  date
                  parentId
                  id
                }
              }
              commentCount
            }
          }`
    };

    const resJson = await graphqlRequest<CommentsQueryResponse>(query);
    const post = resJson.data.post;

    console.log(JSON.stringify(post));

    return {
        comments: post.comments,
        commentCount: post.commentCount,
    }
}