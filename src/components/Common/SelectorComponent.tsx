import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Input, Label, Row } from 'reactstrap';

type SelectorComponentProps = {
  pregunta: FormField;
  onChange: (id: string, value: string) => void;
};

const SelectorComponent: React.FC<SelectorComponentProps> = ({
  pregunta,
  onChange,
}) => {
  const location = useLocation();
  const isUser = location.state?.isUser ?? false;
  const fields = location.pathname=== "/response-form"? location.state?.fields: location.state?.forms?.fields;
  const formResponses = location.state?.formResponses;
 

  const matchingResponse = formResponses?.find(
    
(response: any) => response.formField.id === pregunta.id,
  );
  const matchingField = fields?.find(
   
(response: any) => response.id === pregunta.id,
  );
 
  const defaultValue = matchingResponse?.value || '';

  return (
    <Row className='mt-2'>
      <Col
        lg={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Label style={{marginBottom:'0px'}}>{pregunta.label}</Label>
      </Col>
      <Col lg={6}>
        <Input
          type='select'
          className='form-select'
          disabled={isUser} 
          required
          defaultValue={defaultValue}
          onChange={(e) => onChange(pregunta.id, e.target.value)}
        >
          <option >Selecciona una opción</option>
          {matchingField.options?.map((option:any, index:number) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <option key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </Input>
      </Col>
    </Row>
  );
};

export default SelectorComponent;
