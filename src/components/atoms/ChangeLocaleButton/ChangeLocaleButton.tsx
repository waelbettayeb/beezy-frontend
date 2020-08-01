import React from "react";
import { Alert } from "baseui/icon";
import { Button, KIND, SHAPE } from "baseui/button";
import { ANCHOR, Drawer, SIZE } from "baseui/drawer";
import { Display, Display1, Display2, Display3 } from "baseui/typography";
import useLocale from "@hooks/useLocale";
import { Locale, localeNames } from "@components/containers/Locale";
import { FormattedMessage } from "react-intl";
import { Cell, Grid } from "baseui/layout-grid";
import { useStyletron } from "baseui";
import { GlobalOutlined } from "@ant-design/icons";
interface Props {}

const ChangeLocaleButton = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { locale, setLocale } = useLocale();
  const [css, theme] = useStyletron();

  return (
    <React.Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        kind={KIND.secondary}
        shape={SHAPE.round}
      >
        <GlobalOutlined style={{ fontSize: theme.sizing.scale700 }} />
      </Button>
      <Drawer
        isOpen={isOpen}
        autoFocus
        onClose={() => {
          setIsOpen(false);
        }}
        size={SIZE.full}
        anchor={ANCHOR.top}
      >
        <Grid gridGaps={40}>
          <Cell span={12}>
            <Display3>
              <FormattedMessage
                defaultMessage={"Select your preferred language"}
              />
            </Display3>
          </Cell>
          {Object.values(Locale).map((locale) => (
            <Cell span={4}>
              <Button
                onClick={() => {
                  setLocale(locale);
                  setIsOpen(false);
                }}
                kind={KIND.minimal}
                size={"large"}
              >
                {localeNames[locale]}
              </Button>
            </Cell>
          ))}
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};

export default ChangeLocaleButton;
