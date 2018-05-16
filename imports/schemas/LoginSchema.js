import SimpleSchema from 'simpl-schema';

export default (LoginSchema = new SimpleSchema({
  email: {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
    type: String,
    min: 10
  }
}));
