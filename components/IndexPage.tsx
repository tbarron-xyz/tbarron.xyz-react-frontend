import React from 'react';

import EmoteByChannelBox from './EmoteByChannelBox';
import TopEmotesBox from './TopEmotesBox';
import HistoricalPlotly from './HistoricalPlotly';

declare const $, Plotly;

export default class IndexPage extends React.PureComponent<{}, { colsToTableData: [], emotesBoxData: [], emote: string }> {
    jsonSocket: WebSocket;

    constructor(props) {
        super(props);
        this.state = {
            colsToTableData: [],
            emotesBoxData: [],
            emote: 'Kappa'
        };
        this.jsonSocket = new WebSocket("ws://tbarron.xyz/kappa");
        this.jsonSocket.onmessage = event => {
            var data = JSON.parse(event.data) as { mode: string, emote: string, data: any };
                // if (data.mode == 'index') {
                //     this.updateKappaCounts(data['kappa']);
                //     this.updateEmoteCounts(data['emotes']);
                // } else
            if (data.mode == 'emote') { // this should be the only case...
                this.updateEmoteByChannel(data.data, data.emote);
                this.updateEmoteCounts(data['emotes']);
            }
        };
    }

    updateEmoteCounts = (newData) => {
        this.setState({ emotesBoxData: newData });
    }

    updateEmoteByChannel = (newData, emote: string) => {
        this.setState({ colsToTableData: newData, emote: emote });
    }

    changeModeToEmote = (emote: string) => {
        this.jsonSocket.send(JSON.stringify(['changemode', 'emote', emote]));
    };

    changeModeToIndex = () => {
        this.jsonSocket.send(JSON.stringify(['changemode', 'index']));
    };



    render() {
        return (
            <div>
                <div id="stats">
                    {this.state.colsToTableData ?
                        <EmoteByChannelBox data={this.state.colsToTableData} emote={this.state.emote} /> : null}
                </div>

                <div id="emotes">
                    {this.state.emotesBoxData ? 
                    <TopEmotesBox titles={['Emote', 'Count']} data={this.state.emotesBoxData} onclick0={this.changeModeToEmote} /> : null}
                </div>
                <hr />
                
                <HistoricalPlotly />
                        
                <hr />
            </div>
        );
    }
}