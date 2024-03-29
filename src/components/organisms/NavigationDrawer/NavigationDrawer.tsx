import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps } from "baseui/drawer";
import { Navigation } from "baseui/side-navigation";

import { Cell, Grid } from "baseui/layout-grid";

import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Router from "next/router";
import { Block } from "baseui/block";
import Logo from "@components/atoms/Logo";
import { useAuth } from "@hooks/useAuth";
import DarkModeToggle from "@components/atoms/DarkModeToggle";
import { Button } from "baseui/button";
import { FormattedList, FormattedMessage, useIntl } from "react-intl";
import { Locale } from "@components/containers/Locale";
import useLocale from "@hooks/useLocale";
interface Props extends DrawerProps {}
interface ItemProps {
  children?: React.ReactNode;
  Icon?: React.FC;
  label?: React.ReactNode;
}

const NavigationDrawer: React.FC<Props> = (props) => {
  const { onClose } = props;
  const [css, theme] = useStyletron();
  const [activeItemId, setActiveItemId] = React.useState(
    `#${Router.pathname.split("/")[1]}`
  );
  const auth = useAuth();
  const user = auth.user;
  const signOut = auth.signOut;
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const Item: React.FC<ItemProps> = (props) => {
    const { Icon, label } = props;
    return (
      <>
        <Block display={"inline-flex"} alignItems={"center"}>
          <Block>
            <Icon />
          </Block>
          <Block
            paddingLeft={theme.sizing.scale400}
            paddingRight={theme.sizing.scale400}
          >
            {label}
          </Block>
        </Block>
      </>
    );
  };
  const items = auth.user
    ? [
        {
          title: (
            <Item
              Icon={() => <HomeOutlined />}
              label={intl.formatMessage({ defaultMessage: "Home" })}
            />
          ),
          itemId: "#",
        },
        {
          title: (
            <Item
              Icon={() => <MessageOutlined />}
              label={intl.formatMessage({ defaultMessage: "Forums" })}
            />
          ),
          itemId: "https://discuss.beeesy.com/",
        },
        {
          title: (
            <Item
              Icon={() => <UserOutlined />}
              label={intl.formatMessage({ defaultMessage: "Profile" })}
            />
          ),
          itemId: "#profile",
        },
        {
          title: (
            <Item
              Icon={() => <SettingOutlined />}
              label={intl.formatMessage({ defaultMessage: "Settings" })}
            />
          ),
          itemId: "#settings",
        },
        // {
        //   title: <Item Icon={() => <ShopOutlined />} label={"Shop (soon)"} />,
        //   itemId: "#shop",
        //   disabled: true,
        // },
        // {
        //   title: <Item Icon={() => <BookOutlined />} label={"Blog (soon)"} />,
        //   itemId: "#blog",
        //   disabled: true,
        // },
      ]
    : [
        {
          title: (
            <Item
              Icon={() => <HomeOutlined />}
              label={intl.formatMessage({ defaultMessage: "Home" })}
            />
          ),
          itemId: "#",
        },
        {
          title: (
            <Item
              Icon={() => <MessageOutlined />}
              label={intl.formatMessage({ defaultMessage: "Forums" })}
            />
          ),
          itemId: "https://discuss.beeesy.com/",
        },
        // {
        //   title: <Item Icon={() => <ShopOutlined />} label={"Shop (soon)"} />,
        //   itemId: "#shop",
        //   disabled: true,
        // },
        // {
        //   title: <Item Icon={() => <BookOutlined />} label={"Blog (soon)"} />,
        //   itemId: "#blog",
        //   disabled: true,
        // },
      ];
  return (
    <Drawer
      {...props}
      autoFocus
      anchor={locale === Locale.AR ? ANCHOR.right : ANCHOR.left}
      overrides={{
        Root: {
          style: {
            zIndex: 2147483001,
          },
        },
      }}
    >
      <Block
        height={"100%"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid
          gridMargins={0}
          gridGutters={0}
          overrides={{
            Grid: {
              style: ({ $theme }) => {
                const theme = $theme;
                return {
                  width: "100%",
                };
              },
            },
          }}
        >
          <Cell span={[4, 0]}>
            <Block
              display={"flex"}
              flexDirection={"column"}
              justifyItems={"center"}
              width={"100%"}
              marginBottom={theme.sizing.scale1000}
            >
              <Logo />
            </Block>
          </Cell>
          <Cell span={[4, 0]}>
            <Navigation
              items={items}
              activeItemId={activeItemId}
              onChange={({ item }) => {
                setActiveItemId(item.itemId);
                item.itemId == "#profile" &&
                  Router.push("/profile/[pid]", `/profile/${user.id}`);
                item.itemId == "#settings" && Router.push("/settings");
                item.itemId == "#" &&
                  Router.push("/" + item.itemId.substring(1));
              }}
            />
          </Cell>
          <Cell span={[0, 8, 0]}></Cell>
          <Cell span={[0, 0, 12]}></Cell>
        </Grid>
        <Block>
          <Block
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <FormattedMessage defaultMessage="Dark mode" />
            <DarkModeToggle />
          </Block>
          {user && (
            <Button
              onClick={() => {
                signOut();
                onClose({});
              }}
              kind={"tertiary"}
              overrides={{
                Root: {
                  style: ({ $theme }) => {
                    const theme = $theme;
                    return {
                      width: "100%",
                      marginTop: theme.sizing.scale800,
                    };
                  },
                },
              }}
            >
              <FormattedMessage defaultMessage="Log Out" />
            </Button>
          )}
        </Block>
      </Block>
    </Drawer>
  );
};

export default NavigationDrawer;
