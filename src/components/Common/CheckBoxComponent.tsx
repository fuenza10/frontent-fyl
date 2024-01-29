import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Input, Label, Row } from 'reactstrap';

interface CheckboxComponentProps {
  pregunta: FormField;
  onChange: (questionId: string, value: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  pregunta,
  onChange,
}) => {
  const location = useLocation();
  const formResponses = location.state?.formResponses;
  const isUser = location.state?.isUser ?? false;
  const matchingResponse = formResponses?.find(
    (response: any) => response.formField.id === pregunta.id,
  );
  const [checked, setChecked] = useState({
    yes: matchingResponse?.value === 'true',
    no: matchingResponse?.value === 'false',
  });

  useEffect(() => {
    const matchingResponse = formResponses?.find(
      (response: any) => response.formField.id === pregunta.id,
    );
    setChecked({
      yes: matchingResponse?.value === 'true',
      no: matchingResponse?.value === 'false',
    });
  }, [pregunta.id, formResponses]);

  const handleCheckboxChange = (value: 'yes' | 'no') => {
    const newChecked =
      value === 'yes' ? { yes: true, no: false } : { yes: false, no: true };
    setChecked(newChecked);
    onChange(pregunta.id, newChecked.yes);
  };

  return (
    <Row className='mt-3'>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Label style={{ marginBottom: '0px' }}>{pregunta.label}</Label>
      </Col>
      <Col>
        <div className='form-check-right'>
          <Label>Sí</Label>
          <Input
            type='checkbox'
            checked={checked.yes}
            className='form-check-input'
            onChange={() => handleCheckboxChange('yes')}
            disabled={isUser}
          />
        </div>
        <div className='form-check-right' style={{ paddingLeft: '10px' }}>
          <Label>No</Label>
          <Input
            type='checkbox'
            className='form-check-input'
            disabled={isUser}
            checked={checked.no}
            onChange={() => handleCheckboxChange('no')}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CheckboxComponent;
