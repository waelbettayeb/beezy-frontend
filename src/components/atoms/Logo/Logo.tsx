import React, { ReactElement } from "react";
import { useStyletron } from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";
interface Props {
  children?: any;
  height?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const Logo: React.FC<Props> = (props) => {
  const { height, onClick } = props;
  const { theme } = useTheme();
  const [css, _theme] = useStyletron();
  return (
    <React.Fragment>
      <img
        src={theme === THEME.Light ? "/logo-light.svg" : "/logo-dark.svg"}
        alt="Beeesy Logo"
        className={css({
          height: height ? height : _theme.sizing.scale1000,
        })}
        onClick={onClick}
      />
    </React.Fragment>
  );
};

export default Logo;
