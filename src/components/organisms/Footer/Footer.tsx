import React, { useState } from "react";
import { useStyletron } from "baseui";

import { Cell, Grid } from "baseui/layout-grid";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import Logo from "@components/atoms/Logo";
import { Block } from "baseui/block";
import useLocale from "@hooks/useLocale";
import { Locale, localeNames } from "@components/containers/Locale";
import Router from "next/router";

interface Props {}

const Footer = (props: Props) => {
  const [css, theme] = useStyletron();
  const { locale, setLocale } = useLocale();
  React.useEffect(() => {
    (function (w, d) {
      var loader = function () {
        var s = d.createElement("script"),
          tag = d.getElementsByTagName("script")[0];
        s.src = "https://cdn.iubenda.com/iubenda.js";
        tag.parentNode.insertBefore(s, tag);
      };
      if (w.addEventListener) {
        w.addEventListener("load", loader, false);
      } else if ((w as any).attachEvent) {
        (w as any).attachEvent("onload", loader);
      } else {
        w.onload = loader;
      }
    })(window, document);
  }, []);

  return (
    <Block
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      backgroundColor={theme.colors.backgroundTertiary}
      paddingTop={theme.sizing.scale1000}
      paddingBottom={theme.sizing.scale1000}
    >
      {/* <Cell span={12}>
        <Button
          onClick={() => alert("click")}
          startEnhancer={undefined}
          endEnhancer={undefined}
          disabled
          kind={KIND.primary}
          size={SIZE.default}
          shape={SHAPE.default}
          isLoading
          isSelected
        >
          Hello
        </Button>
      </Cell> */}

      <Block>
        <Logo onClick={() => Router.push("/")} />
      </Block>
      <Block
        display={"flex"}
        flexDirection={"row"}
        justifyItems={"center"}
        paddingTop={theme.sizing.scale800}
      >
        {Object.values(Locale).map((locale) => (
          <Cell span={4}>
            <Button
              onClick={() => {
                setLocale(locale);
              }}
              kind={KIND.minimal}
              size={"mini"}
            >
              {localeNames[locale]}
            </Button>
          </Cell>
        ))}
      </Block>
      <a
        href="https://www.iubenda.com/privacy-policy/27567358"
        className="iubenda-white iubenda-embed"
        title="Privacy Policy "
      >
        Privacy Policy
      </a>
    </Block>
  );
};

export default Footer;
