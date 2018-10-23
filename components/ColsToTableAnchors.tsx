import React from 'react';

export default class TabularDataDisplayWithFirstColumnOnclickHandler extends React.PureComponent<{ titles, onclick0, data }> {
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
                            {row.map((e, i) =>
                                <td key={[e, i].toString()} className={i == 0 ? "count" : ""} style={{ width: `${99 / row.length}%` }} >
                                    {
                                        i == 0 ?
                                            (<a href="javascript:void(0)" onClick={i == 0 ? () => { this.props.onclick0(e); } : () => { }} > {e} </a>) :
                                            (<span>{e}</span>)
                                    }
                                </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}