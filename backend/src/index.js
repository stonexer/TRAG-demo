const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = `
  # 用户
  type CommonUserRef {
    # 用户 ID
    id: ID!
    # 昵称
    nickname: String!
    # 头像的图片链接
    avatar: String!
  }

  # 评论
  type Comment {
    # 评论 ID
    id: ID!
    # 评论内容
    content: String!
    # 评论创建者
    creator: CommonUserRef!
    # 评论回复的用户
    replyTo: CommonUserRef
    # 是否为文章作者
    isAuthor: Boolean!
    # 评论创建时间
    gmtCreate: String!
    # 点赞数
    likes: Int!
    # 相关回复评论
    replyComments: [Comment!]!
  }

  type Query {
    # 评论列表
    comments(articleID: ID!): [Comment!]!
  }
`;

const server = new ApolloServer({
  typeDefs,
  mock: true,
  introspection: true
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
