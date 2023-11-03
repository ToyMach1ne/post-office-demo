import { css } from "styled-components";
import { AuthContainer } from "./app/routes/authorization/authorization.styles";
import { Colors } from "./app/common/typography/typography.styles";
import { NavigationContainer } from "./app/components/navigation/navigation.styles";
import { PasswordValidatorContainer } from "./app/common/password-validator/password-validator.styles";
import { SidebarContainer } from "./app/common/sidebar/sidebar.styles";

export const MediaQueries = css`
  @media (max-height: 720px) {
    ${SidebarContainer} {
      overflow: scroll;
    }
  }

  @media (max-width: 650px) {
    ${AuthContainer} {
      padding: 5rem;
      margin-top: 0;
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



