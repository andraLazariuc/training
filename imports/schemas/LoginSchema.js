import SimpleSchema from 'simpl-schema';

const LoginSchema = new SimpleSchema({
  email: {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  password: {
    type: String,
    min: 10,
  },
});

export default LoginSchema;
