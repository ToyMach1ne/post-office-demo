import styled from "styled-components";
import { Colors, FontSizes, HeaderSecondary, TextServicesData } from "../../../common/typography/typography.styles";

export const ServicesSubSectionContainer = styled.div`
  position: relative;
  padding: 2.4rem;
  background-color: ${Colors.white};
  border-radius: 1.2rem;
  border: 1px solid ${Colors.grayLight5};

  ${HeaderSecondary} {
    margin-bottom: 2.4rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .inputs {
      display: flex;
      gap: 3.2rem;
    }

    .buttons {
      display: flex;
      gap: 2.4rem;
      width: 34rem;
      margin-left: auto;
    }
  }
`

export const SubSectionDataItem = styled.span`
  display: flex;
  justify-content: left;
  gap: 5rem;
  align-items: center;

  & > ${TextServicesData}:first-child {
    width: 15rem;
  }

  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }
`

export const ServiceEditButton = styled.span`
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;
  font-size: ${FontSizes.medium};
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  color: ${Colors.blue2};
  cursor: pointer;
  transition: all .2s;
  border-bottom: 1px solid transparent;
  
  &:hover {
    border-bottom: 1px solid ${Colors.blue2};
  }
`
