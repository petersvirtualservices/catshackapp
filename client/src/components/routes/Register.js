import React from 'react';
import Warnings from '../partials/Warnings';

class Register extends React.Component {
  render() {
    return (
      <div className='form'>
        <Warnings warnings={this.props.warnings} />

        <b>Register</b>

        <label>Name:</label>
        <input onChange={(e) => this.props.setField('name', e.target.value)} />

        <label>Email:</label>
        <input onChange={(e) => this.props.setField('email', e.target.value)} />

        <label>Password:</label>
        <input onChange={(e) => this.props.setField('password', e.target.value)} />

        <button onClick={() => { this.props.register() }}>Register</button>
      </div>
    )
  }
}

export default Register