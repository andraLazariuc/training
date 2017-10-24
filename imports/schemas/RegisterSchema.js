//import SimpleSchema from 'simpl-schema';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


export const RegisterSchema =new SimpleSchema({
  email: {
    label: "Email",
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password1: {
      type: String,
      min: 10
  },
  password2: {
      type: String,
      min: 10
  }

});

