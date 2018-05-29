import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const register = ({ email, password1, password2 }) => {
  if (Accounts.findUserByEmail(email) != null) {
    throw new Meteor.Error(
      403,
      'There is already an account with this email! ',
    );
  } else if (password1 !== password2) {
    throw new Meteor.Error(403, "Passwords don't match");
  } else {
    const userId = Accounts.createUser({
      email,
      password: password2,
    });
    if (userId !== '') {
      return userId;
    }
    throw new Meteor.Error(403, "Can't create user");
  }
};

export const login = ({ user, password }) => {
  Meteor.loginWithPassword(user, password, (err) => {
    if (err) {
      console.log('There was an error: ', err);
    }
  });
};

Meteor.methods({
  'user.login': login,
  'user.register': register,
});
