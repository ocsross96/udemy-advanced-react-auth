import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign up the user
    console.log(email, password);
    this.props.signupUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({input, label, type, meta: { touched, error, warning, invalid }}) {
    // Construct form-group class depending on form state
    const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';

    // Construct form-control class depending on form state
    const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';

    return (
      <div className={groupClass}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className={inputClass} />
        <div className="form-control-feedback">
          {touched ? <span>{error}</span> : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" label="Email" type="text" component={this.renderField} />
        <Field name="password" label="Password" type="password" component={this.renderField} />
        <Field name="passwordConfirm" label="Confirm Password" type="passwordConfirm" component={this.renderField} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Check email value for empty
  if (!values.email) {
    errors.email = 'Please enter an email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Check password value for empty
  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  console.log(errors);

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup)

export default Signup = connect(mapStateToProps, actions)(Signup);
