import styled from "styled-components";
import { ServicePageContainer } from "../../features/services/services-page-container/services-page-container.styles";
import { ServicesSubSectionContainer } from "../../features/services/services-subsection/services-subsection.styles";
import { FieldContainer } from "../../common/form-field-text/form-field-text.styles";

export const PersonalDataContainer = styled(ServicePageContainer)`
  ${ServicesSubSectionContainer}:nth-child(3) {
    form .inputs {
      display: grid;
      grid-template-columns: repeat(6, 1fr); /* 3 columns for the 1st and 4th rows */
      grid-template-rows: auto auto auto auto auto; /* 5 rows */
      gap: 10px; /* Adjust gap between grid items */
      column-gap: 2rem;
      row-gap: 2rem;

      ${FieldContainer} {
        margin-bottom: 0;
      }

      div:nth-child(1) {
        grid-column: 1 / span 6;
      }

      div:nth-child(2) {
        grid-column: 1 / span 3;
      }

      div:nth-child(3) {
        grid-column: 4 / span 3;
      }

      div:nth-child(4) {
        grid-column: 1 / span 3;
      }

      div:nth-child(5) {
        grid-column: 4 / span 3;
      }

      div:nth-child(6) {
        grid-column: 1 / span 2;
      }

      div:nth-child(7) {
        grid-column: 3 / span 2;
      }

      div:nth-child(8) {
        grid-column: 5 / span 2;
      }
    }
  }
`
