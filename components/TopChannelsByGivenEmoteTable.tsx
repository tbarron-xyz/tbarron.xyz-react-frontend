import React from 'react';

import { H2center } from './H2center';
import TabularDataDisplay from './TabularDataDisplay';
import TwitchEmbedThatFollowsMouse from './TwitchEmbedThatFollowsMouse';

export default class TopChannelsByGivenEmoteTable extends React.PureComponent<{ data, emote: string }, { currentTwitchEmbedTitle: string }> {
    launchChannel(title: string) {
        this.setState({ currentTwitchEmbedTitle: title });
    }

    closeChannel(title: string) {
        this.setState({ currentTwitchEmbedTitle: null });
    }

    onclick0(title: string) {
        this.setState({ currentTwitchEmbedTitle: this.state.currentTwitchEmbedTitle ? null : title });
    }

    render() {
        return (
            <div>
                <H2center data={`top channels by ${this.props.emote}`} />
                <TabularDataDisplay
                    titles={['Channel', 'Count']}
                    data={this.props.data}
                    onMouseOver0={this.launchChannel}
                    onMouseOut0={this.closeChannel}
                    onclick0={this.onclick0} />
                {this.state.currentTwitchEmbedTitle ? <TwitchEmbedThatFollowsMouse title={this.state.currentTwitchEmbedTitle} /> : null}
            </div>
        );
    }
}
