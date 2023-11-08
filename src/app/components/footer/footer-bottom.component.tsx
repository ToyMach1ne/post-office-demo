import { AppLinksContainer, FooterBottomContainer, SocialLinksContainer } from "./footer.styles";
import { ReactComponent as FbIcon } from "../../assets/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../assets/twitter-icon.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/linkedin-icon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/instagram-icon.svg";
import { ReactComponent as GoogleMarketIcon } from "../../assets/google-play-store-icon.svg";
import { ReactComponent as AppleStoreIcon } from "../../assets/apple-store-icon.svg";
import { TextCopyright } from "../../common/typography/typography.styles";

const FooterBottom = () => {
  return (
    <FooterBottomContainer>
      <TextCopyright>Copyright © 2013–2024 Meest.com™. All rights reserved</TextCopyright>
      <SocialLinksContainer>
        <a href=""><FbIcon /></a>
        <a href=""><TwitterIcon /></a>
        <a href=""><LinkedInIcon /></a>
        <a href=""><InstagramIcon /></a>
      </SocialLinksContainer>
      <AppLinksContainer>
        <a href=""><GoogleMarketIcon /></a>
        <span>or</span>
        <a href=""><AppleStoreIcon /></a>
      </AppLinksContainer>
    </FooterBottomContainer>
  )
}

export default FooterBottom;