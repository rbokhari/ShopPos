import React from "react";

import Checkbox from 'material-ui/Checkbox';

const materialCheckbox = ({ input, label }) => (
    <Checkbox label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}/>
    );

export default materialCheckbox;