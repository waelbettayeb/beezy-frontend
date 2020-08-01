import React, { ReactElement } from "react";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";
import {} from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";

interface Props {}

function DarkModeToggle({}: Props): ReactElement {
  const { theme, setTheme } = useTheme();
  return (
    <React.Fragment>
      <Checkbox
        checked={theme === THEME.Dark}
        onChange={(e) => {
          const value = e.currentTarget.checked;
          value ? setTheme(THEME.Dark) : setTheme(THEME.Light);
        }}
        checkmarkType={STYLE_TYPE.toggle_round}
      />
    </React.Fragment>
  );
}

export default DarkModeToggle;
