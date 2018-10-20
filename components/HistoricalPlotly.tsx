import React from 'react';

declare const Plotly, $;

export default class HistoricalPlotly extends React.PureComponent {
    plotlyDivId = 'emotes-plotly';

    refreshEmotePlot = () => {
        $.getJSON('/kappa/emoteplotjson', (data) => {
            for (let i in data) {
                data[i].type = 'scatter';
            }
            var layout = {
                hovermode: 'closest',
                title: 'past 24 hours',
                showlegend: true
            };
            Plotly.newPlot(this.plotlyDivId, data, layout, { displayModeBar: false });  // data[i].x = [time array], data[i].y = [data array]
            setTimeout(this.refreshEmotePlot, 600000);  // 10 minutes
        });
    }

    componentDidMount = () => {
        this.refreshEmotePlot();
    }

    render() {
        return <div id={this.plotlyDivId} style={{ textAlign: 'center', height: '500px' }}>  </div>;
    }
}