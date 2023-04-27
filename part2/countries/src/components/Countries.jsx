import React, { useState } from "react";

export default function Countries({ handleFilter, countries }) {
  const [show, setShow] = useState("");

  const handleShow = (id) => {
    console.log(id);
    const filterById = countries.filter((country, index) => id === index);
    console.log("filterById ", filterById);
    setShow(filterById[0]);
  };

  return (
    <div>
      <button onClick={() => setShow(null)}>close show</button>
      {show ? (
        <div className="show">
          <h3>{show.name.common}</h3>
          <h3>area {show.area}</h3>
          <div className="languages">
            <h3>languages: </h3>
            <ul>
              {Object.values(show.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>

          <div className="flag">
            <img src={show.flags.svg} alt={show.flags.alt} />
          </div>
          <div className="weather">
            <h3>Weather in {show.name.common}</h3>

            <h4>temperature -3.73 Celcius</h4>
            <div className="weather_img">
              <img src="" alt="" />
            </div>

            <h4>wind 1.34 m/s</h4>
          </div>
        </div>
      ) : handleFilter().length === 1 ? (
        handleFilter().map((country, index) => (
          <div key={index}>
            <h3>{country.name.common}</h3>
            <h3>area {country.area}</h3>
            <div className="languages">
              <h3>languages: </h3>
              <ul>
                {Object.values(country.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>

            <div className="flag">
              <img src={country.flags.svg} alt={country.flags.alt} />
            </div>
          </div>
        ))
      ) : (
        handleFilter().map((country, index) => (
          <div key={index}>
            <h3>{country.name.common}</h3>
            <button type="button" onClick={() => handleShow(index)}>
              show
            </button>
          </div>
        ))
      )}
    </div>
  );
}
