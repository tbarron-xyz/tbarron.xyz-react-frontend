import React from 'react';

import { H2center } from './H2center';
import TabularDataDisplay from './TabularDataDisplay';

export default class TopEmotesTable extends React.PureComponent<{titles, data, onclick0}> {
    render() {
        return (
            <div>
                <H2center data="top emotes" />
                <div style={{ textAlign: 'center' }}>(click to see top channels by that emote)</div>
                <TabularDataDisplay {...this.props} />
            </div>
        )
    }
}