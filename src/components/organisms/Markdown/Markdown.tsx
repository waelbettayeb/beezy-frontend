import { Block } from "baseui/block";
import { Paragraph2 } from "baseui/typography";
import StyledLink from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { List } from ".";
import { Heading } from "./Heading";

interface MarkdownProps {
  source: string;
}

const Markdown: React.FC<MarkdownProps> = (props) => {
  const { source } = props;
  return (
    <>
      <ReactMarkdown
        source={source}
        escapeHtml={true}
        renderers={{
          heading: Heading,
          paragraph: Paragraph2,
          list: List,
        }}
      />
    </>
  );
};

export default Markdown;
