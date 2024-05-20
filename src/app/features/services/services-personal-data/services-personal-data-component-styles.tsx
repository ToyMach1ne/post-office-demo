import styled from "styled-components";
import {
  FontSizes,
  Colors,
} from "../../../common/typography/typography.styles";

export const PersonalDataContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Colors.white};
  padding: 2.4rem;
  border-radius: 1.2rem;
  border: 1px solid ${Colors.grayLight5};
`;

export const PersonalDataTitles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const LinkEdit = styled.a`
  font-size: ${FontSizes.normal};
  font-weight: 700;
  color: ${Colors.blue4};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: ${Colors.blue};
  }
`;
export const PersonalDataRow = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PersonalDataLabelOpt = styled.p`
  width: 15%;
  font-size: ${FontSizes.normal};
  font-weight: 500;
  line-height: 2rem;
  color: ${Colors.grayLight};
`;

export const PersonalDataOpt = styled.p`
  font-size: ${FontSizes.normal};
  font-weight: 600;
  line-height: 2rem;
  color: ${Colors.gray};
`;

export const PersonalFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    width: 48%;
  }
  @media (max-width: 991.5px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;

export const PersonalFormButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 767.5px) {
    flex-direction: column;
    button {
      margin-left: 0;
      margin-bottom: 2.4rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  button {
    width: auto;
    min-width: 150px;
  }
`;

export const FieldContainerStyled = styled.div`
  &.hidden {
    display: none;
  }
  .hidden {
    display: none;
  }
`;

export const CountryCodeHolder = styled.div`
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
  width: 33%;
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 991.5px) {
    width: 40%;
  }
  input {
    text-align: center;
  }
  svg {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export const CountryCodeFlag = styled.span`
  font-family: "Noto Color Emoji", sans-serif;
  position: absolute;
  width: 14px;
  height: 14px;
  top: 0;
  left: 12px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

export const CountryCodeInput = styled.input`
  width: 100%;
  margin-right: 1rem;
  cursor: pointer;
`;

export const PhoneInputsContainer = styled.div`
  display: flex;
  @media (max-width: 991.5px) {
    margin-bottom: 2.4rem;
  }
`;

//Sidebar Countries Component
export const SidebarRightContainer = styled.div`
  background-color: ${Colors.white};
  padding: 2.4rem;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  width: 30%;
  height: 100%;
  ${PersonalDataTitles} {
    border-bottom: 1px solid ${Colors.grayLight5};
    padding: 0 2rem 1.5rem 2rem;
    margin-bottom: 1.5rem;
  }
  svg {
    cursor: pointer;
  }
`;

export const CountryListElement = styled.ul`
  padding: 0 1rem 0 1rem;
  margin-top: 1.5rem;
  overflow-y: auto;
  height: 80%;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${Colors.white};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Colors.gray3};
    border-radius: 3px;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${Colors.gray2};
  }
  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${FontSizes.normal};
    font-weight: 500;
    margin-bottom: 1.5rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    .flag-holder {
      display: inline-block;
      font-family: "Noto Color Emoji", sans-serif;
      margin-right: 5px;
    }
  }
`;
