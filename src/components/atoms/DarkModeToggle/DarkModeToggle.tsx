import React, { ReactElement } from "react";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";
import {} from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";

interface Props {}

function DarkModeToggle({}: Props): ReactElement {
  const { theme, setTheme } = useTheme();
  const [checkbox, setCheckbox] = React.useState(theme === THEME.Dark);
  return (
    <React.Fragment>
      <Checkbox
        checked={checkbox}
        onChange={(e) => {
          const value = e.currentTarget.checked;
          setCheckbox(value);
          value ? setTheme(THEME.Dark) : setTheme(THEME.Light);
        }}
        checkmarkType={STYLE_TYPE.toggle_round}
      />
    </React.Fragment>
  );
}

export default DarkModeToggle;
