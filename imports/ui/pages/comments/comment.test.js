/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import sinon from 'sinon';
// import { expect } from 'chai';
import { expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { mount, shallow } from 'enzyme';
import { Random } from 'meteor/random';

import Comment from './Comment';

describe('<Comment />', () => {
  if (Meteor.isServer) return;

  const testUserId = Random.id();
  const testComment = Factory.create('comment', { userId: testUserId });

  let props;
  const wrapper = () => shallow(<Comment {...props} />);

  beforeEach(() => {
    props = {};
  });

  it('returns null if it receives an empty comment ', () => {
    expect(wrapper().getElement()).to.equal(null);
  });

  it('returns a li if a valid comment is provided', () => {
    props = { comment: testComment };
    expect(wrapper.find('list-group-item')).to.have.length(1);
  });

  it('allows us to set props', () => {
    props = { comment: testComment, bar: 'baz' };
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    props = { comment: testComment, loggedInUserId: testUserId, onButtonClick };
    const wrapperMount = mount(<Comment {...props} />);
    wrapperMount.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
