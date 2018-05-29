import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import faker from 'faker';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Posts from './posts';
import Comments from './comments';

Enzyme.configure({ adapter: new Adapter() });

Factory.define('user', Meteor.users, {
  // username: () => faker.lorem.word(),
  username: () => Random.id(),
  password: () => Random.secret(10),
  profile: {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
  },
  emails() {
    return [
      {
        address: faker.internet.email(),
        verified: false,
      },
    ];
  },
});

Factory.define('post', Posts, {
  userId: Factory.get('user'),
  title: () => faker.lorem.sentence(),
  description: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

Factory.define('comment', Comments, {
  postId: Factory.get('post'),
  userId: Factory.get('user'),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
});

export const TEST_EMAIL = 'test@test.com';
export const TEST_USERNAME = 'testUsername';
export const TEST_PASSWORD = 'password';
