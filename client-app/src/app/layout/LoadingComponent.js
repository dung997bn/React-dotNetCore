import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted, content }) => {
  return (
    <Dimmer active inverted={inverted ? inverted : false}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
