import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input } from 'semantic-ui-react';
import '../styles/ZipcodeForm.css';
import { FormContext } from './FormContext';

function ZipcodeForm(props) {
  const [zipcode, setZipcode] = useState('');
  const { isLoading, handleZipSubmit } = useContext(FormContext);

  useEffect(() => {
    if (props.location.pathname === '/app/results') {
      const { zipcode: initialZipcode } = queryString.parse(
        props.location.search
      );

      if (initialZipcode) setZipcode(initialZipcode);
      if (!isLoading) handleZipSubmit(initialZipcode);
    }
  }, []);

  function handleInputChange(e) {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      setZipcode(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.history.push(`/app/results?zipcode=${zipcode}`);
    handleZipSubmit(zipcode);
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
            placeholder="Enter ZIP Code"
            loading={isLoading}
          >
            <input />
            <Icon name="search" link onClick={handleSubmit} />
          </Input>
        </Form.Field>
      </Form>
    </div>
  );
}

export default withRouter(ZipcodeForm);
