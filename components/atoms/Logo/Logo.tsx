import React, { ReactElement } from "react";
import { useStyletron } from "baseui";
import { useTheme, THEME } from "@hooks/Theme";

interface Props {}

function Logo({}: Props): ReactElement {
  const { theme } = useTheme();
  const [css, _theme] = useStyletron();
  return (
    <React.Fragment>
      <img
        src={
          theme === THEME.Light ? "beeezyLogoLight.svg" : "/beeezyLogoDark.svg"
        }
        alt="Beeezy Logo"
        className={css({
          height: _theme.sizing.scale1000,
        })}
      />
    </React.Fragment>
  );
}

export default Logo;
