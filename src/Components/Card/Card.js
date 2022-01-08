import { useEffect } from "react";
import "./Card.css";
function Card({ title, subtitle, color, todayCases, total }) {
    useEffect(() => {
        const getCountries = async () => {
            await fetch("https://corona.lmao.ninja/v2/countries");
        };
    }, []);
    return (
        <div
            className="card"
            style={{
                background: `linear-gradient(to bottom, ${color}, transparent)`,
            }}
        >
            <h3>{title}</h3>
            <h5>
                {todayCases} {subtitle}{" "}
            </h5>
            <h3>{total}</h3>
        </div>
    );
}

export default Card;
