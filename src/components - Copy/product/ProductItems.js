import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderItems = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((item, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}/>
        <h4>Item #{index + 1}</h4>
        <Field
          name={`${item}.itemId`}
          type="text"
          component={renderField}
          label="Item"/>
        <Field
          name={`${item}.quantity`}
          type="text"
          component={renderField}
          label="Quantity"/>
      </li>
    )}
  </ul>
)

export default renderItems;