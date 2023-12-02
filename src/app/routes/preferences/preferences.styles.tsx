import styled from "styled-components";
import { ServicePageContainer } from "../../features/services/services-page-container/services-page-container.styles";

export const PreferencesContainer = styled(ServicePageContainer)`
  .ant-form-item-label, .ant-select, .ant-radio-wrapper, .ant-radio {
    font-family: Montserrat, "Open Sans", sans-serif;
  }
  
  @media(min-width: 750px) {
    form {
      .inputs > * {
        width: 33%;
      }
    } 
  }
`;

