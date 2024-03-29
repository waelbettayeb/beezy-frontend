import React from "react";

import { Button } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { useAuth } from "@hooks/useAuth";
import { Block } from "baseui/block";
import { StatefulPopover } from "baseui/popover";
import { useStyletron } from "baseui";
import { StatefulMenu } from "baseui/menu";
import DarkModeToggle from "../DarkModeToggle";
import { Avatar } from "baseui/avatar";
import Router from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {}

const AvatarButton = (props: Props) => {
  const auth = useAuth();
  const user = auth.user;
  const signOut = auth.signOut;
  const [css, theme] = useStyletron();
  const intl = useIntl();
  const content = () => {
    return (
      <Block
      //    margin={theme.sizing.scale900}
      >
        <StatefulMenu
          items={[
            {
              label: intl.formatMessage({ defaultMessage: "Profile" }),
              onClick: () =>
                Router.push("/profile/[pid]", `/profile/${user.id}`),
            },
            {
              label: intl.formatMessage({ defaultMessage: "Settings" }),
              onClick: () => Router.push("/settings"),
            },
            {
              label: (
                <React.Fragment>
                  <Block display={"flex"}>
                    <FormattedMessage defaultMessage="Dark mode" />
                    <DarkModeToggle />
                  </Block>
                </React.Fragment>
              ),
            },
            {
              label: intl.formatMessage({ defaultMessage: "Log Out" }),
              onClick: signOut,
            },
          ]}
          onItemSelect={({ item }) => {
            if (item.onClick) item.onClick();
          }}
        />
      </Block>
    );
  };
  return (
    <React.Fragment>
      <StatefulPopover content={content} showArrow returnFocus autoFocus>
        <Button
          shape={"round"}
          kind={"minimal"}
          overrides={{
            BaseButton: {
              style: ({ $theme }) => {
                return {
                  padding: "0px",
                };
              },
            },
          }}
        >
          <Avatar
            src={user?.avatar?.url}
            name={`${user.firstName} ${user.lastName}`}
          />
        </Button>
      </StatefulPopover>
    </React.Fragment>
  );
};

export default AvatarButton;
