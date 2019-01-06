import React from 'react';
import ReactDOM from 'react-dom';
import Plotly, { LayoutAxis } from 'plotly.js';

import { divId } from './components/HistoricalPlotly';
import TwitchChatMonitorApp from './components/TwitchChatMonitorApp';

declare const $;

$(document).ready( function(){
	ReactDOM.hydrate(<TwitchChatMonitorApp /> , document.getElementById('container'));
	refreshEmotePlot();
});

const refreshEmotePlot = () => {
	$.getJSON('/kappa/emoteplotjson', (data) => {
		var layout = {
			hovermode: 'closest',
			title: 'past 24 hours',
			showlegend: true,
			xaxis: {
				type: 'date'
			}
		} as Partial<LayoutAxis>;   // Is there a better way to make this amenable to typechecking in newPlot?
		const plotlyData = data.map((d: { x: number[], y: number[], name: string }) => ({
			...d,
			type: 'scatter',
			x: d.x.map(xi => new Date(xi * 1000))
		}));
		Plotly.newPlot(divId, plotlyData, layout, { displayModeBar: false });  // data[i].x = [time array], data[i].y = [data array]
		setTimeout(refreshEmotePlot, 600000);  // 10 minutes
	});
}
