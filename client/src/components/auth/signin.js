import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password}) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderInput(field) {
    return (
      <Field name={field.name} id={field.name} type={field.type} className="form-control" component="input" />
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          {this.renderInput({name: "email", type: "email"})}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          {this.renderInput({name: "password", type: "password"})}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin'
})(Signin)

export default Signin = connect(mapStateToProps, actions)(Signin);
