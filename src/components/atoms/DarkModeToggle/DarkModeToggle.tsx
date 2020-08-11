import React, { ReactElement } from "react";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";
import {} from "baseui";
import { useTheme, THEME } from "src/hooks/Theme";
import { Button, KIND, SHAPE } from "baseui/button";
import { Search } from "baseui/icon";
import { BulbOutlined } from "@ant-design/icons";

interface Props {
  button?: boolean;
}

function DarkModeToggle(props: Props): ReactElement {
  const { theme, setTheme } = useTheme();
  const { button } = props;
  const handleClick = (e) => {
    theme === THEME.Light ? setTheme(THEME.Dark) : setTheme(THEME.Light);
  };
  return button ? (
    <Button onClick={handleClick} kind={KIND.secondary} shape={SHAPE.round}>
      <BulbOutlined />
    </Button>
  ) : (
    <Checkbox
      checked={theme === THEME.Dark}
      onChange={handleClick}
      checkmarkType={STYLE_TYPE.toggle_round}
    />
  );
}

export default DarkModeToggle;
