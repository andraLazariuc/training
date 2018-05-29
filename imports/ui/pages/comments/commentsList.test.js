/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { shallow } from 'enzyme';
import { _ } from 'meteor/underscore';

import Comment from './Comment';
import CommentsList from './CommentsList';

describe('<CommentsList />', () => {
  if (Meteor.isServer) return;

  const comments = _.times(3, () => Factory.create('comment'));

  it('should render three <Comment /> components', () => {
    const wrapper = shallow(<CommentsList comments={comments}/>);
    expect(wrapper.find(Comment)).to.have.length(3);
  });

  it('should render an `.list-group`', () => {
    const wrapper = shallow(<CommentsList />);
    expect(wrapper.find('.list-group')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow((
      <CommentsList>
        <div className="unique" />
      </CommentsList>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
});
