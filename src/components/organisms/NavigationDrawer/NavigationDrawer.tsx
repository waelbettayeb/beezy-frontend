import React, { useState } from "react";
import { useStyletron } from "baseui";
import { Drawer, ANCHOR, DrawerProps, SIZE } from "baseui/drawer";
import { Navigation } from "baseui/side-navigation";

import { Cell, Grid } from "baseui/layout-grid";
import { Label1, LabelXSmall } from "baseui/typography";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
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

interface Props extends DrawerProps {}
interface ItemProps {
  children?: React.ReactNode;
  Icon?: React.FC;
  label?: React.ReactNode;
}

const NavigationDrawer: React.FC<Props> = (props) => {
  const { onClose } = props;
  const [css, theme] = useStyletron();
  const [activeItemId, setActiveItemId] = React.useState("#");
  const auth = useAuth();
  const user = auth.user;
  const signOut = auth.signOut;
  const Item: React.FC<ItemProps> = (props) => {
    const { Icon, label } = props;
    return (
      <>
        <Block display={"inline-flex"} alignItems={"center"}>
          <Block paddingRight={theme.sizing.scale400}>
            <Icon />
          </Block>
          {label}
        </Block>
      </>
    );
  };
  const items = auth.user
    ? [
        {
          title: <Item Icon={() => <HomeOutlined />} label={"Home"} />,
          itemId: "#",
        },
        {
          title: <Item Icon={() => <UserOutlined />} label={"Profile"} />,
          itemId: "#profile",
          disabled: true,
        },
        {
          title: (
            <Item
              Icon={() => <UnorderedListOutlined />}
              label={"My listings"}
            />
          ),
          itemId: "#mylistings",
          disabled: true,
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
          title: <Item Icon={() => <HomeOutlined />} label={"Home"} />,
          itemId: "#",
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
    <Drawer {...props} autoFocus anchor={ANCHOR.left}>
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
            Dark mode
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
              Log Out
            </Button>
          )}
        </Block>
      </Block>
    </Drawer>
  );
};

export default NavigationDrawer;
