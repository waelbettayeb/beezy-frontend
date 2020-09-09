import Divider from "@components/atoms/Divider";
import AppNavBar from "@components/molecules/AppNavBar/AppNavBar";
import BackHomeNavBar from "@components/molecules/BackHomeNavBar /BackHomeNavBar ";
import Footer from "@components/organisms/Footer";
import { useStyletron } from "baseui";
import { Cell, Grid } from "baseui/layout-grid";
import { StyledLink } from "baseui/link";
import {
  DisplaySmall,
  DisplayXSmall,
  HeadingMedium,
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
  LabelXSmall,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import React from "react";

interface Props {}

export const PrivacyPage = (props: Props) => {
  const [css, theme] = useStyletron();
  return (
    <>
      <BackHomeNavBar />
      <Grid
        overrides={{
          Grid: {
            style: {
              marginTop: theme.sizing.scale1000,
              marginBottom: theme.sizing.scale1000,
            },
          },
        }}
      >
        <Cell span={[12]}>
          <DisplaySmall>Privacy Policy of beeesy.com</DisplaySmall>
          <LabelXSmall>
            This Application collects some Personal Data from its Users.
          </LabelXSmall>
          <Divider />
          <HeadingMedium>
            Personal Data collected for the following purposes and using the
            following services:
          </HeadingMedium>
          <LabelLarge>Registration and authentication</LabelLarge>
          <LabelMedium>Facebook Authentication</LabelMedium>
          <ParagraphSmall>
            Personal Data: various types of Data as specified in the privacy
            policy of the service
          </ParagraphSmall>
          <Divider />
          <HeadingMedium>Contact information</HeadingMedium>
          <LabelLarge>Owner and Data Controller</LabelLarge>
          <ParagraphSmall>Beeesy</ParagraphSmall>
          <ParagraphMedium>
            Owner contact email: bettayebwael@gmail.com
          </ParagraphMedium>
          <Divider />
          <ParagraphSmall>Latest update: September 09, 2020</ParagraphSmall>
          <StyledLink
            href={
              "https://www.iubenda.com/privacy-policy/27567358/legal?ifr=true&height=721&newmarkup=no"
            }
          >
            Show the complete Privacy Policy
          </StyledLink>
        </Cell>
      </Grid>
      <Footer />
    </>
  );
};
export default PrivacyPage;
