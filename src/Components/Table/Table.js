import "./Table.css";

function Table({ tableData }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr id="thead">
                        <th style={{ textAlign: "left", width: "25px" }}>
                            Country
                        </th>

                        <th className="hiddenOnSmall">Tests</th>
                        <th>Total Cases</th>
                        <th className="hiddenOnSmall">Active</th>
                        <th>Recovered</th>
                        <th className="hiddenOnSmall">Critical</th>
                        <th
                            style={{ color: "#F90716" }}
                            className="hiddenOnSmall"
                        >
                            Deaths Today
                        </th>
                        <th style={{ color: "#F90716" }}>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((country) => (
                        <tr className="tbody" key={country.name}>
                            <td style={{ fontWeight: 600, width: "100%" }}>
                                {country.name}
                            </td>
                            <td className="hiddenOnSmall">{country.tests}</td>
                            <td>{country.cases}</td>
                            <td className="hiddenOnSmall">{country.active}</td>
                            <td>{country.recovered}</td>
                            <td className="hiddenOnSmall">
                                {country.critical}
                            </td>
                            <td className="hiddenOnSmall">
                                {country.todayDeaths}
                            </td>
                            <td>{country.deaths}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
