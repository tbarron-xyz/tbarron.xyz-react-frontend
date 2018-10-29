import React from 'react';

class props {

}

export default class TabularDataDisplay extends React.PureComponent<{
    titles: string[],
    data: any[][],
    onclick0?: (title: string) => void,
    onMouseOver0?: (title: string) => void,
    onMouseOut0?: (title: string) => void
}> {
    render() {
        return (
            <table style={{ width: "100%" }}>
                <thead>
                    <tr /*style={{textAlign: "center"}}*/ >
                        {this.props.titles.map(title => <td key={title} style={{ width: `${99 / this.props.titles.length}%` }}> {title} </td>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((row, rowindex) => (
                        <tr key={rowindex} className={"count"}>
                            {row.map((e, i) => (
                                <td
                                    key={[e, i].toString()}
                                    className={i == 0 ? "count" : ""}
                                    style={{ width: `${99 / row.length}%` }}
                                    onClick={i == 0 ? () => { this.props.onclick0 ? this.props.onclick0(e) : 0; } : () => { }}
                                    onMouseOver={i == 0 ? () => { this.props.onMouseOver0 ? this.props.onMouseOver0(e) : 0 } : () => { }}
                                    onMouseOut={i == 0 ? () => { this.props.onMouseOut0 ? this.props.onMouseOut0(e) : 0 } : () => { }}
                                >
                                    {e}
                                </td>))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}