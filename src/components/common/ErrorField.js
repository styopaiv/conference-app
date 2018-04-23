import React from 'react';

const ErrorField = props => {
  const { input, type, meta: { error, touched } } = props;
  const errorText = touched &&
    error && <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <label>{props.label}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  );
};

export default ErrorField;