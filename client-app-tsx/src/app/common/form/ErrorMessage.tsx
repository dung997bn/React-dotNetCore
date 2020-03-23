import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text?: string;
}
const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    <Message negative>
      <Message.Header>{error.statusText}</Message.Header>
      {text && <p>{text}</p>}
    </Message>
  );
};

export default ErrorMessage;
