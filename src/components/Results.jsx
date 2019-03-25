import React, { useEffect } from 'react';
import '../styles/Results.css';
import queryString from 'query-string';
import { Divider, Header } from 'semantic-ui-react';
import ZipcodeForm from './ZipcodeForm';

export default function Results(props) {
  useEffect(() => {
    const { zipcode } = queryString.parse(props.location.search);
    console.log(zipcode);
  }, []);

  return (
    <div>
      <Divider hidden />

      <Header className="header-main" as="h1" center>
        Texas Energy Plans
      </Header>
      <ZipcodeForm />
      <p>{props.location.search}</p>
    </div>
  );
}
