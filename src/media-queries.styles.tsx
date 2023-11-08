import { css } from "styled-components";
import { AuthContainer } from "./app/routes/authorization/authorization.styles";
import { Colors, TextNavMenu } from "./app/common/typography/typography.styles";
import { NavigationContainer } from "./app/components/navigation/navigation.styles";
import { PasswordValidatorContainer } from "./app/common/password-validator/password-validator.styles";
import { SidebarContainer } from "./app/common/sidebar/sidebar.styles";
import { FooterBottomContainer, FooterContainer, FooterTopContainer } from "./app/components/footer/footer.styles";
import { NavLangButton, NavLangMenu } from "./app/components/nav-lang-dropdown/nav-lang.styles";
import { SignInNavButton } from "./app/components/nav-signin-btn/nav-signin.styles";
import { ServicesNavButton } from "./app/components/services/services.styles";
import { HelpNavButton } from "./app/components/nav-help/nav-help.styles";

export const MediaQueries = css`
  @media (max-height: 720px) {
    ${SidebarContainer} {
      overflow: scroll;
    }
  }

  @media (max-width: 900px) {

    ${FooterContainer} {
      padding-top: 1.6rem;
      padding-bottom: 1.6rem;
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
      bottom: -94.5rem;
    }

    ${NavLangButton} {
      *:not(:first-child) {
        display: none;
      }
    }

    ${NavLangMenu} {
      left: -11rem;
    }
    
    ${SignInNavButton} {
      *:not(:first-child) {
        display: none;
      }
    }

    ${ServicesNavButton} {
      svg:nth-child(2) {
        display: inline-block;
      }

      svg:not(:nth-child(2)), ${TextNavMenu} {
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
    }
  }

  @media (max-width: 400px) {       
    ${AuthContainer} {
      padding: 2.4rem 1.6rem;
    }
  }
`



