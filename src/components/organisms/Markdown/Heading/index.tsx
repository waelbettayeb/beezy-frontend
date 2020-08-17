import {
  HeadingXSmall,
  HeadingSmall,
  HeadingMedium,
  HeadingLarge,
  HeadingXLarge,
  HeadingXXLarge,
} from "baseui/typography";
interface Props {
  level: number;
}
export const Heading: React.FC<Props> = (props) => {
  const { level, children } = props;
  switch (level) {
    case 1:
      return <HeadingXXLarge>{children}</HeadingXXLarge>;
    case 2:
      return <HeadingXLarge>{children}</HeadingXLarge>;
    case 3:
      return <HeadingLarge>{children}</HeadingLarge>;
    case 4:
      return <HeadingMedium>{children}</HeadingMedium>;
    case 5:
      return <HeadingSmall>{children}</HeadingSmall>;
    default:
      return <HeadingXSmall>{children}</HeadingXSmall>;
  }
};
