import React from 'react';
import { storiesOf } from '@storybook/react';
import { AudioInput } from 'components';

storiesOf('Audio', module)
    .add('default', () => (
        <AudioInput id='recorder' />
    ));
