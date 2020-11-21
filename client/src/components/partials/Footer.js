import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

class Footer extends React.Component {
  render() {
  return (
    <div id='footer' >
      <Breadcrumbs aria-label="breadcrumb">
      <Button color="inherit" onClick={() => this.props.setRoute('home')}>
        Home
      </Button>
      <Button color="inherit" onClick={() => this.props.setRoute('login')}>
        Login
      </Button>
      <Button color="inherit" onClick={() => this.props.setRoute('register')}>
        Register
      </Button>
      <Button color="inherit" onClick={() => this.props.setRoute('animals')}>
        Find Nearby Animals
      </Button>
    </Breadcrumbs>
    </div>
  );
}
}

export default Footer;