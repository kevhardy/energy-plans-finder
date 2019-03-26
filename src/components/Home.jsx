import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import '../styles/Home.css';
import ZipcodeForm from './ZipcodeForm';

export default function Home(props) {
  return (
    <div className="home-main">
      <Divider hidden />

      <Header className="header-main" as="h1">
        TX Energy Plans
      </Header>

      <p className="header-info">
        View and compare plans offered in your area. Get started by entering in
        your <strong>ZIP code</strong> down below.
      </p>

      <Divider hidden />
      <ZipcodeForm />
    </div>
  );
}
