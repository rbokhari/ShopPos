import React from "react";

import TextField from 'material-ui/TextField';

const materialTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
<TextField 
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom} />
);

export default materialTextField;