import React from 'react';
import ReactDOM from 'react-dom';

import TwitchChatMonitorApp from './components/TwitchChatMonitorApp';

declare const $;

$(document).ready( function(){
	ReactDOM.render(<TwitchChatMonitorApp /> , document.getElementById('container'));
});
