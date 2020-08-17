import { HeadingXXLarge } from "baseui/typography";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  source: string;
}

const Markdown = (props: Props) => {
  const { source } = props;
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        h1: (props) => (
          <HeadingXXLarge>{props.value ?? props.children}</HeadingXXLarge>
        ),
      }}
    />
  );
};

export default Markdown;
