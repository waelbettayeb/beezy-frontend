import React, { ReactElement } from "react";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";
import {} from "baseui";

interface Props {}

function DarkModeToggle({}: Props): ReactElement {
  const [checkbox, setCheckbox] = React.useState(false);
  return (
    <React.Fragment>
      <Checkbox
        checked={checkbox}
        onChange={(e) => {
          const nextCheckbox = e.currentTarget.checked;
          setCheckbox(nextCheckbox);
        }}
        checkmarkType={STYLE_TYPE.toggle_round}
      />
    </React.Fragment>
  );
}

export default DarkModeToggle;
