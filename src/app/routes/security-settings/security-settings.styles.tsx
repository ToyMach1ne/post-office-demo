import styled from "styled-components";
import { ServicePageContainer } from "../../features/services/services-page-container/services-page-container.styles";

export const SecuritySettingsContainer = styled(ServicePageContainer)`
  form .inputs {
    flex-direction: column;
    gap: 0;
    max-width: 45rem;
  }
`;