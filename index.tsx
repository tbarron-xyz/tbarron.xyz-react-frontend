import React from 'react';
import ReactDOM from 'react-dom';

import IndexPage from './components/IndexPage';

declare const $;


$(document).ready( function(){
	ReactDOM.render(<IndexPage /> , $('#content')[0]);
});
