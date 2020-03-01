import React from 'react';
import { useCommentsQuery } from '../../generated/graphql';
import { AsyncBoundary } from '../AsyncBoundary';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const commentsResult = useCommentsQuery({
    variables: {
      articleId: '1'
    }
  });

  return (
    <AsyncBoundary {...commentsResult}>
      {(data) =>
        data.comments.map((item) => <div key={item.id}>{item.content}</div>)
      }
    </AsyncBoundary>
  );
};

export default App;
