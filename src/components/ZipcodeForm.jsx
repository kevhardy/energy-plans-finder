import React, { useState, useContext } from 'react';
import '../styles/ZipcodeForm.css';
import { FormContext } from './FormContext';
import { Form, Input, Icon } from 'semantic-ui-react';

export default function ZipcodeForm() {
  const [zipcode, setZipcode] = useState('');
  const { handleZipSubmit } = useContext(FormContext);

  function handleInputChange(e) {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setZipcode(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    //handleZipSubmit(zipcode);
    //history.push(`app/results?=${zipcode}`);
  }

  return (
    <div className="container-zipform">
      <Form onSubmit={handleSubmit} className="zipform">
        <Form.Field name="zipcode">
          <Input
            name="zipcode"
            value={zipcode}
            icon
            onChange={handleInputChange}
            maxLength="5"
            autoComplete="off"
            focus
            placeholder="Enter Zip code"
          >
            <input />
            <Icon name="search" link onClick={handleSubmit} />
          </Input>
        </Form.Field>
      </Form>
    </div>
  );
}
