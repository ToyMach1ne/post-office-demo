import { FC, useState } from "react";
import { HeaderSecondary, TextServicesData } from "../../../common/typography/typography.styles";
import { ServiceEditButton, ServicesSubSectionContainer, SubSectionDataItem } from "./services-subsection.styles";

export interface SubSectionData {
  label: string;
  value?: string;
}

export interface EditFormProps {
  onCancel?: any;
}

interface Props {
  title: string;
  data: SubSectionData[];
  EditForm?: FC<EditFormProps>;
}

const ServicesSubsection = ({title, data, EditForm}: Props) => {

  const [isEditingMode, setEditingMode] = useState(false);

  return (
    <ServicesSubSectionContainer>
      <HeaderSecondary>{title}</HeaderSecondary>
      {!isEditingMode && 
        <>
          <ServiceEditButton onClick={() => setEditingMode(!isEditingMode)}>Edit</ServiceEditButton>
          {data.map((x, index) => 
            <SubSectionDataItem key={index}>
              <TextServicesData type='label'>{x.label}</TextServicesData>
              <TextServicesData type='data'>{x.value}</TextServicesData>
            </SubSectionDataItem>
          )}
        </>
      }
      
      {isEditingMode && EditForm && <EditForm onCancel={() => setEditingMode(false)} />}
    </ServicesSubSectionContainer>
  )
}

export default ServicesSubsection;
