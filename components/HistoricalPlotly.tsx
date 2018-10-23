import React from 'react';

declare const Plotly, $;

export default class HistoricalPlotly extends React.PureComponent {
    plotlyDivId = 'emotes-plotly';

    refreshEmotePlot = () => {
        $.getJSON('/kappa/emoteplotjson', (data) => {
            // for (let i in data) {
            //     data[i].type = 'scatter';
            // }
            var layout = {
                hovermode: 'closest',
                title: 'past 24 hours',
                showlegend: true,
                xaxis: {
                    type: 'date'
                }
            };
            const plotlyData = data.map(d => ({
                ...d,
                type: 'scatter',
                x: d.x.map(xi => new Date(xi * 1000)) 
            }));
            Plotly.newPlot(this.plotlyDivId, plotlyData, layout, { displayModeBar: false });  // data[i].x = [time array], data[i].y = [data array]
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