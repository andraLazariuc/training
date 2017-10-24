//import SimpleSchema from 'simpl-schema';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


/*new SimpleSchema({
  name: String,
}).validate({
  name: 2,
});*/

/*FormSchema = new SimpleSchema({
  name: {
    label: "Name",
    type: String,
    min: 2,
    max: 25
  },
  email: {
    label: "Email",
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});*/


export const LoginSchema =new SimpleSchema({
  email: {
    label: "Email",
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
      type: String,
      min: 10
  }

});

