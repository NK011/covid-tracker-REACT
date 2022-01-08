import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Table from "./Components/Table/Table";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worldwide");
    const [countryData, setCountryData] = useState({});
    const [sortBy, setSortBy] = useState("cases");
    const [table, setTable] = useState([]);
    const sortOptions = [
        "cases",
        "todayCases",
        "deaths",
        "todayDeaths",
        "recovered",
        "active",
        "critical",
        "casesPerOneMillion",
        "deathsPerOneMillion",
    ];

    useEffect(() => {
        const getCountries = async () => {
            await fetch("https://corona.lmao.ninja/v2/countries")
                .then((res) => res.json())
                .then((data) => {
                    const countriesName = data.map((country) => ({
                        name: country.country,
                        id: country.countryInfo.iso3,
                    }));
                    setCountries(countriesName);
                });
        };
        getCountries();
    }, []);

    useEffect(() => {
        if (country === "Worldwide") {
            const getWorldWideData = async () => {
                await fetch("https://corona.lmao.ninja/v2/all?yesterday")
                    .then((res) => res.json())
                    .then((data) => {
                        setCountryData(data);
                    });
            };

            getWorldWideData();
        } else {
            const getCountryData = async () => {
                await fetch(
                    `https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query%20`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setCountryData(data);
                    });
            };
            getCountryData();
        }
    }, [country]);

    useEffect(() => {
        const getSortedData = async () => {
            await fetch(
                `https://corona.lmao.ninja/v2/countries?yesterday&sort=${sortBy}`
            )
                .then((res) => res.json())
                .then((data) => {
                    const tableData = data.map((country) => ({
                        name: country.country,
                        id: country.countryInfo.iso3,
                        tests: country.tests,
                        cases: country.cases,
                        active: country.active,
                        recovered: country.recovered,
                        todayDeaths: country.todayDeaths,
                        deaths: country.deaths,
                        critical: country.critical,
                    }));
                    setTable(tableData);
                });
        };
        getSortedData();
    }, [sortBy]);

    return (
        <div className="app">
            <header className="app__header">
                <h1>COVID-19 TRACKER</h1>
            </header>
            <div className="app__stats">
                <div className="app__form">
                    <p
                        style={{
                            fontWeight: "bold",
                            marginBottom: "3px",
                        }}
                    >
                        Select Country :
                    </p>

                    <select
                        className="app__country"
                        name="countries"
                        id="countries"
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="Worldwide">Worldwide</option>
                        {countries.map((country) => (
                            <option
                                key={country.name}
                                value={country.name}
                                className="options"
                            >
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="app__statsCard">
                    <Card
                        title="Cases"
                        subtitle="today"
                        color={"blue"}
                        todayCases={countryData.todayCases}
                        total={countryData.cases}
                    />
                    <Card
                        title="Recovered"
                        subtitle="active"
                        todayCases={countryData.active}
                        color={"green"}
                        total={countryData.recovered}
                    />
                    <Card
                        title="Deaths"
                        subtitle="today"
                        color={"red"}
                        todayCases={countryData.todayDeaths}
                        total={countryData.deaths}
                    />
                </div>
            </div>
            <div className="app__table">
                <div className="app__dropdown">
                    <label htmlFor="options">Sort by:</label>
                    <select
                        name="options"
                        id="options"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        {sortOptions.map((option) => (
                            <option
                                key={sortOptions.indexOf(option)}
                                value={option}
                                className="options"
                            >
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <Table tableData={table} />
            </div>

            {/* table */}
        </div>
    );
}

export default App;
