import React from 'react';
import { storiesOf } from '@storybook/react';
import { Player } from 'components';

storiesOf('Player', module)
    .add('default', () => (
        <Player detail={{ id: 1, title: 'Clip', url: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3' }} />
    ))
    .add('loading', () => (
        <Player loading />
    ))
    .add('failed', () => (
        <Player failed />
    ));
