import React from 'react';
import Warnings from '../partials/Warnings';

class Login extends React.Component {
  render() {
    return (
      <div className='form'>

        <Warnings warnings={this.props.warnings} />

        <b>Have an account? Login to continue!</b>
        <label>Email</label>
        <input
          onChange={(e) => this.props.setField('email', e.target.value)}></input>
        <label>Password</label>
        <input
          onChange={(e) => this.props.setField('password', e.target.value)}></input>
        <button onClick={this.props.login}>Login</button>

        <b style={{marginTop: '50px'}}>Don't have an account? Create one for free!</b>
        <button onClick={() => this.props.setRoute('register')}>Register</button>
      </div>
    )
  }
}

export default Login