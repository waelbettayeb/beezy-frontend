import { Paragraph2 } from "baseui/typography";

interface Props {
  ordered: string;
}

export const List: React.FC<Props> = (props) => {
  const { children, ordered } = props;
  return ordered ? (
    <Paragraph2>
      <ol>{children}</ol>
    </Paragraph2>
  ) : (
    <Paragraph2>
      <ul>{children}</ul>
    </Paragraph2>
  );
};
