import axios from "axios";
import { useEffect, useState } from "react";

function Weather({ uniti, latS, lonS }) {
  const [data, setdata] = useState(null);
  const [param, setparam] = useState(null);
  const [conditon, setcond] = useState(null);
  const [coded, setcoded] = useState(null);
  const [tempMax, settempmax] = useState(null);
  const [tempMin, settempmin] = useState(null);
  const [houricon, sethouricon] = useState(null);
  const [searched, setsearched] = useState(false);

  useEffect(() => {
    const apiUrl = latS && lonS 
  ? `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latS}&lon=${lonS}`
  : "https://ipapi.co/json/";

axios.get(apiUrl).then((response) => {
  const lat = latS || response.data.latitude;
  const lon = lonS || response.data.longitude;
  
  if (latS && lonS) {
    const modifiedParam = {
      data: {
        city: response.data.address?.city || response.data.address?.town || "city not found",
        country: response.data.address?.country || "country not found"
      }
    };
    setparam(modifiedParam);
  } else {
    const modifiedParam = {
      data: {
        city: response.data.city || "Unknown city",
        country: response.data.country_name || "Unknown country"
      }
    };
    setparam(modifiedParam);
  }
  
      axios
        .get(
          uniti
            ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`
            : `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto&temperature_unit=fahrenheit`
        )
        .then((res) => {
          setdata(res.data);
          const code = res.data.current.weather_code;
          const coded = res.data.daily.weather_code;
          const tempMaxs = res.data.daily.temperature_2m_max;
          const tempMins = res.data.daily.temperature_2m_min;
          const codeH = res.data.hourly.weather_code;

          settempmax(tempMaxs);
          settempmin(tempMins);
          if (code === 0) {
            setcond("icon-sunny.webp");
          } else if (code === 1) {
            setcond("icon-sunny.webp");
          } else if (code === 2) {
            setcond("icon-partly-cloudy.webp");
          } else if (code === 3) {
            setcond("icon-overcast.webp");
          } else if (code === 80) {
            setcond("icon-storm.webp");
          } else {
            console.log("Api failed");
          }
          // console.log(code);
          const dailyIcons = coded.map((dayCode) => {
            if (dayCode === 0) return "icon-sunny.webp";
            if (dayCode === 1) return "icon-sunny.webp";
            if (dayCode === 2) return "icon-partly-cloudy.webp";
            if (dayCode === 3) return "icon-overcast.webp";
            if (dayCode === 80) return "icon-storm.webp";
            if (dayCode === 45) return "icon-fog.webp";
            return "icon-sunny.webp";
          });
          setcoded(dailyIcons);
          // console.log(coded);
          const Houricons = codeH.map((ret) => {
            if (ret === 0) return "icon-sunny.webp";
            if (ret === 1) return "icon-sunny.webp";
            if (ret === 2) return "icon-partly-cloudy.webp";
            if (ret === 3) return "icon-overcast.webp";
            if (ret === 80) return "icon-storm.webp";
            if (ret === 45) return "icon-fog.webp";
            return "icon-sunny.webp";
          });
          sethouricon(Houricons);
          console.log(res.data);
        });
    });
  }, [uniti, lonS, latS]);

  return (
    <div className="pager">
      <div className="WeatherC">
        <div className="showcont">
          <div className="imgcontwrap">
            <div className="div">
              <img src="bg-today-small.svg" alt="" className="backpick" />
              <div className="locationcont">
                <div className="wraparound">
                  <h1 className="location">
                    {" "}
                    {data && param?.data?.country && param?.data?.city
                      ? param.data.country.charAt(0).toUpperCase() +
                        param.data.country.slice(1).toLowerCase() +
                        ", " +
                        param.data.city
                      : "loading..."}
                  </h1>
                  <div className="date">
                    {param ? new Date().toDateString() : "loading"}
                  </div>
                </div>
                <div className="lowerinfocont">
                  <div className="lowerleft">
                    <img
                      src={conditon}
                      alt="image discribing weather"
                      className="imagelowerleft"
                    />
                  </div>
                  <div className="lowerright">
                    {data
                      ? Math.round(data.current.temperature_2m) + "°"
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lowercont">
            <div className="infprovider" id="one">
              Feels Like
              <div className="feelslike">
                {data
                  ? Math.round(data.current.apparent_temperature) + "°"
                  : "loading"}
              </div>
            </div>
            <div className="infprovider" id="two">
              Humidity
              <div className="Humidity">
                {data ? data.current.relative_humidity_2m + "°" : "loading..."}
              </div>
            </div>
            <div className="infprovider" id="three">
              Wind
              <div className="Wind">
                {data ? data.current.wind_speed_10m + "Km/h" : "loading..."}
              </div>
            </div>
            <div className="infprovider" id="four">
              Precipitation
              <div className="Precipitation">
                {data ? data.current.precipitation + "Km/h" : "loading..."}
              </div>
            </div>
          </div>
        </div>
        <div className="dailywrap">
          <h2 className="dailytitle">Daily forecast</h2>
          <div className="Daily">
            <div className="childofdaily">
              <h4 id="tue">Tue</h4>
              <img src={coded ? coded[0] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[0] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[0] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="wed">Wed</h4>
              <img src={coded ? coded[1] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[1] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[1] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="thu">Thu</h4>
              <img src={coded ? coded[2] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[2] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[2] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="fri">Fri</h4>
              <img src={coded ? coded[3] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[3] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[3] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="sat">Sat</h4>
              <img src={coded ? coded[4] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[4] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[4] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="sun">Sun</h4>
              <img src={coded ? coded[5] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[5] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[5] + "°" : "Error"}
                </div>
              </div>
            </div>

            <div className="childofdaily">
              <h4 id="mon">Mon</h4>
              <img src={coded ? coded[6] : "/"} className="imageDaily" />
              <div className="tempercontainer">
                <div className="maxT">
                  {tempMax ? tempMax[6] + "°" : "Error"}
                </div>
                <div className="minT">
                  {tempMin ? tempMin[6] + "°" : "Error"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justaWrap">
        <div className="hourlycomp">
          <div className="hourwrap">
            <div className="hourlytitle">Hourly forecast</div>
            <ul
              className="hourlybtn"
              onClick={(e) => {
                document.querySelector(".hourlybtn").classList.toggle("open");
                alert("not in the mood to code this one😪😴")
              }}
            >
              Tuesday
              <img src="icon-dropdown.svg" alt="" className="dropdown" />
            </ul>
          </div>
          <div className="hourlywrap">
            <div className="hourly">
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[0] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? new Date().getHours() > 12
                      ? new Date().getHours() - 12 + " PM"
                      : new Date().getHours() + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[0]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[1] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 1) % 24 > 12
                      ? ((new Date().getHours() + 1) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 1) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[1]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[2] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 2) % 24 > 12
                      ? ((new Date().getHours() + 2) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 2) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[2]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[3] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 3) % 24 > 12
                      ? ((new Date().getHours() + 3) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 3) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[3]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[4] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 4) % 24 > 12
                      ? ((new Date().getHours() + 4) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 4) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[4]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[5] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 5) % 24 > 12
                      ? ((new Date().getHours() + 5) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 5) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[5]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[6] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 6) % 24 > 12
                      ? ((new Date().getHours() + 6) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 6) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[6]) + "°"
                    : null}
                </div>
              </div>
              <div className="hours">
                <div className="stats">
                  <img
                    src={houricon ? houricon[7] : null}
                    alt=""
                    className="imageofHour"
                  />
                </div>
                <div className="time">
                  {data
                    ? (new Date().getHours() + 7) % 24 > 12
                      ? ((new Date().getHours() + 7) % 24) - 12 + " PM"
                      : ((new Date().getHours() + 7) % 24) + " AM"
                    : null}
                </div>
                <div className="hourtemp">
                  {data
                    ? Math.round(data.hourly.temperature_2m[7]) + "°"
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Weather;
