import React from 'react';
import { storiesOf } from '@storybook/react';
import { Studio } from 'components';

storiesOf('Studio', module)
    .add('default', () => (
        <Studio />
    ))
    .add('started', () => (
        <Studio started />
    ))
    .add('stopped', () => (
        <Studio stopped />
    ));
