import { css } from "styled-components";
import { AuthContainer } from "./app/routes/authorization/authorization.styles";
import { Colors } from "./app/common/typography/typography.styles";
import { NavigationContainer } from "./app/features/navigation/navigation.styles";
import { PasswordValidatorContainer } from "./app/common/password-validator/password-validator.styles";
import { SidebarContainer } from "./app/common/sidebar/sidebar.styles";
import { FooterBottomContainer, FooterContainer, FooterTopContainer } from "./app/features/footer/footer.styles";
import { NavLangButton, NavLangContainer } from "./app/features/navigation/nav-lang-popup/nav-lang.styles";
import { SignInNavButton } from "./app/features/navigation/nav-signin-btn/nav-signin.styles";
import { ServicesNavButton } from "./app/features/navigation/nav-services/services.styles";
import { HelpNavButton } from "./app/features/navigation/nav-help/nav-help.styles";
import { NavBtn } from "./app/common/nav-btn/nav-btn.styles";
import { UserNavBtn, UserNavContainer } from "./app/features/navigation/nav-user/nav-user.styles";
import { NavPopup } from "./app/features/navigation/nav-popup/nav-popup.styles";

export const MediaQueries = css`
  @media (max-height: 720px) {
    ${SidebarContainer} {
      overflow: scroll;
    }
  }

  @media (max-width: 900px) {

    ${FooterContainer} {
      padding-bottom: 1.6rem;
      bottom: -48rem;
    }

    ${FooterBottomContainer} {
      grid-template-columns: 1fr;
      justify-items: center;
      row-gap: 1.6rem;
    }
  }

  @media (max-width: 650px) {
    ${AuthContainer} {
      padding: 5rem;
      margin-top: 0;
    }

    ${FooterContainer} {
      bottom: -112rem;
    }

    ${FooterTopContainer} {
      padding-top: 1.6rem;
    }

    ${NavLangButton}, ${UserNavBtn} {
      & > *:not(:first-child) {
        display: none;
      }
    }

    ${UserNavContainer} {
      ${NavPopup} {
        left: -13rem;
      }
    }

    ${NavLangContainer} {
      ${NavPopup} {
        left: -11rem;
      }
    }
    
    ${SignInNavButton}, ${ServicesNavButton} {
      & > ${NavBtn}:nth-child(2) {
        display: flex;
      }

      & > *:not(:nth-child(2)) {
        display: none;
      }
    }

    ${HelpNavButton} {
      display: none;
    }

    ${FooterTopContainer} {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    body {
      background-color: ${Colors.white};
      margin: 0;
    }

    ${NavigationContainer} {
      background-color: ${Colors.white};
    }
  }

  @media (max-width: 550px) {
    ${PasswordValidatorContainer} {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(6, 1fr);
    }
  }

  @media (max-width: 490px) {
    ${AuthContainer} {
      padding: 2.4rem 3rem;
      height: auto;
    }
  }

  @media (max-width: 400px) {       
    ${AuthContainer} {
      padding: 2.4rem 1.6rem;
    }
  }
`



