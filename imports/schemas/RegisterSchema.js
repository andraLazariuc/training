import SimpleSchema from 'simpl-schema';

export default (RegisterSchema = new SimpleSchema({
  email: {
    label: 'Email',
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
}));
