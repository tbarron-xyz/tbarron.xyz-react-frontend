import React from 'react';

import { H2center } from './H2center';
import TabularDataDisplay from './TabularDataDisplayWithFirstColumnOnclickHandler';

export default class TopChannelsByGivenEmoteTable extends React.PureComponent<{ data, emote: string }> {
    render() {
        return (
            <div>
                <H2center data={`top channels by ${this.props.emote}`} />
                <TabularDataDisplay titles={['Channel', 'Count']} data={this.props.data} />
            </div>
        );
    }
}
