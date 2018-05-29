/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { mount, shallow } from 'enzyme';
import { _ } from 'meteor/underscore';

import Post from './Post';
import PostsList from './PostsList';

describe('<PostsList />', () => {
  if (Meteor.isServer) return;

  const posts = _.times(3, () => Factory.create('post'));

  it('should render three <Post /> components', () => {
    const wrapper = shallow(<PostsList posts={posts}/>);
    expect(wrapper.find(Post)).to.have.length(3);
  });

  it('should render an `.list-group`', () => {
    const wrapper = shallow(<PostsList />);
    expect(wrapper.find('.list-group')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(<PostsList>
      <div className="unique" />
    </PostsList>);
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<PostsList onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});
