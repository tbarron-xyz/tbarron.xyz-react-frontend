import React from 'react';

import TopChannelsByGivenEmoteTable from './TopChannelsByGivenEmoteTable';
import TopEmotesTable from './TopEmotesTable';
import HistoricalPlotly from './HistoricalPlotly';

declare const $, Plotly;

export default class TwitchChatMonitorApp extends React.PureComponent<{}, { colsToTableData: [], emotesBoxData: [], emote: string }> {
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
                <div style={{ textAlign: 'center' }}>
                    <h1>kappa stats</h1>
                    <div>(for the top 25 channels)</div>
                    <div>(over the last 5 minutes)</div>
                </div>
                <hr />

                <div id="content">
                        <div id="stats">
                            {this.state.colsToTableData ?
                                <TopChannelsByGivenEmoteTable data={this.state.colsToTableData} emote={this.state.emote} /> : null}
                        </div>

                        <div id="emotes">
                            {this.state.emotesBoxData ?
                                <TopEmotesTable titles={['Emote', 'Count']} data={this.state.emotesBoxData} onclick0={this.changeModeToEmote} /> : null}
                        </div>
                        <hr />

                        <HistoricalPlotly />

                        <hr />
                </div>

                <hr />
                <div style={{ textAlign: 'center' }}>
                    <h2>about</h2>
                    monitoring the top 25 (by viewers) channels on twitch, keeping a 5-minute running count of the per-channel Kappas and the all-channels-aggregated other emoticons, storing in redis, snapshotting every 2 minutes to mongo. written in node and Go.
                </div>
                <hr />
            </div>

        );
    }
}