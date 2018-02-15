import React from 'react';
import { storiesOf } from '@storybook/react';
import { ClipListItem } from 'components';

storiesOf('ClipListItem', module)
    .add('default', () => (
        <ClipListItem id={1} title='Clip Title' />
    ))
    .add('long title', () => (
        <ClipListItem id={1} title='This is a very very very very very very very very very very long title!' />
    ));
