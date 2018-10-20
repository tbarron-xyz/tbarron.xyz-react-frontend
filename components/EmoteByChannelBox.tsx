import React from 'react';

import { H2center } from './H2center';
import ColsToTable from './ColsToTable';

export default class EmoteByChannelBox extends React.PureComponent<{ data, emote: string }> {
    render() {
        return (
            <div>
                <H2center data={`top channels by ${this.props.emote}`} />
                <ColsToTable titles={['Channel', 'Count']} data={this.props.data} />
            </div>
        );
    }
}
