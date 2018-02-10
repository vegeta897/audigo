import React from 'react';
import { shallow } from 'enzyme';
import Studio from '.';

const wrap = (props = {}) => shallow(<Studio {...props} startRecording={() => {}} stopRecording={() => {}} />);

it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders audio input when no clip', () => {
    const wrapper = wrap({ clip: null });
    expect(wrapper.find('AudioInput')).toHaveLength(1);
});

it('changes record button text when recording', () => {
    const wrapper = wrap({ recording: false });
    expect(wrapper.find('button').contains('Start')).toBe(true);
    wrapper.setProps({ recording: true });
    expect(wrapper.find('button').contains('Stop')).toBe(true);
});
