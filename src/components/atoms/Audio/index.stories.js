import React from 'react';
import { storiesOf } from '@storybook/react';
import { Audio } from 'components';

storiesOf('Audio', module)
    .add('autoplay', () => (
        <Audio src='https://archive.org/download/testmp3testfile/mpthreetest.mp3' autoPlay />
    ))
    .add('no autoplay', () => (
        <Audio src='https://archive.org/download/testmp3testfile/mpthreetest.mp3' />
    ));
