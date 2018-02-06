import React from 'react';
import { storiesOf } from '@storybook/react';
import { ClipList } from 'components';

const list = [
    { id: 1, title: 'Clip 1' },
    { id: 2, title: 'Clip 2' },
    { id: 3, title: 'Clip 3' }
];

storiesOf('ClipList', module)
    .add('default', () => (
        <ClipList list={list} />
    ))
    .add('loading', () => (
        <ClipList list={[]} loading />
    ))
    .add('failed', () => (
        <ClipList list={[]} failed />
    ));
