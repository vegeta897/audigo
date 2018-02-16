// https://github.com/diegohaz/arc/wiki/Styling
// Imported in App.js
import { reversePalette } from 'styled-theme/composer';

const theme = {};

// https://coolors.co/cfdbd5-e8eddf-eb5e28-242423-333533

theme.palette = {
    primary: [
        '#df5623',
        '#f66029',
        '#ed7c4e',
        '#f19975',
        '#f9d3c4'
    ],
    secondary: [
        '#c2185b',
        '#e91e63',
        '#f06292',
        '#f8bbd0'
    ],
    danger: [
        '#d32f2f',
        '#f44336',
        '#f8877f',
        '#ffcdd2'
    ],
    alert: [
        '#ffa000',
        '#ffc107',
        '#ffd761',
        '#ffecb3'
    ],
    go: [
        '#529f0e',
        '#6ec71f',
        '#89d545',
        '#a8e86f',
        '#ccf7a1'
    ],
    white: [
        '#fff',
        '#fff',
        '#eee'
    ],
    grayscale: [
        '#171717',
        '#242423',
        '#2c2c2b',
        '#333533',
        '#454745',
        '#585958',
        '#7d7e7d',
        '#a2a3a2',
        '#c7c7c7',
        '#dfdfdf',
        '#eeeeee',
        '#f6f6f6',
        '#ffffff'
    ]
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
    primary: 'Lato, Helvetica Neue, Helvetica, Roboto, sans-serif',
    pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
    quote: 'Georgia, serif'
};

theme.sizes = {
    maxWidth: '1100px'
};

export default theme;
