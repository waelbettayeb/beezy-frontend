import React from "react";
import { useStyletron } from "baseui";
import { Label3 } from "baseui/typography";
import { Block } from "baseui/block";

export enum ORIENTATION {
  left,
  right,
}
export interface IProps {
  orientation?: ORIENTATION;
  children?: any;
}
const Divider = (props: IProps) => {
  const { orientation, children } = props;
  const [css, theme] = useStyletron();

  const isLeft = () => {
    return orientation == ORIENTATION.left;
  };
  const isRight = () => {
    return orientation == ORIENTATION.right;
  };
  const margin = theme.sizing.scale1000;
  return (
    <Block
      display={"flex"}
      alignContent={"space-around"}
      marginTop={margin}
      marginBottom={margin}
    >
      <hr
        className={css({
          ...theme.borders.border300,
          width: isLeft() ? theme.sizing.scale700 : "100%",
        })}
      />
      {children && (
        <Label3
          width={"auto"}
          marginLeft={theme.sizing.scale500}
          marginRight={theme.sizing.scale500}
        >
          {children}
        </Label3>
      )}
      <hr
        className={css({
          ...theme.borders.border300,
          width: isRight() ? theme.sizing.scale700 : "100%",
        })}
      />
    </Block>
  );
};

export default Divider;
