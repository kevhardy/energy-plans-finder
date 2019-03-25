import React, { useEffect } from 'react';
import '../styles/Results.css';
import queryString from 'query-string';
import { Divider, Header, Icon } from 'semantic-ui-react';
import ZipcodeForm from './ZipcodeForm';

export default function Results(props) {
  useEffect(() => {
    const { zipcode } = queryString.parse(props.location.search);
    console.log(zipcode);
  }, []);

  function goHome() {
    props.history.push('/');
  }

  return (
    <div>
      <Divider hidden />
      <div className="container-header">
        <div className="header-home">
          <Icon name="home" size="large" link onClick={goHome} />
        </div>
        <Header className="header-results" as="h1">
          Texas Energy Plans
        </Header>
        <div className="header-spacer" />
      </div>

      <ZipcodeForm />
    </div>
  );
}
