import React from 'react';
import { storiesOf } from '@storybook/react';
import { PlayPage } from 'components';

storiesOf('PlayPage', module)
    .add('default', () => (
        <PlayPage match={{ params: { id: '1' } }}/>
    ));
