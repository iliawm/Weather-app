import axios from "axios";
import { useState } from "react";

function Hero({setlat, setlon}){  
    const [inputofsearch, setpropofsearch] = useState("");

    const handleSearch = async () => {
        if (!inputofsearch) return;
        
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${inputofsearch}&limit=1`);
        if (response.data && response.data.length > 0) {
            setlat(response.data[0].lat);
            setlon(response.data[0].lon);
        }
        console.log({response})
    };

    return(
        <div className="Herocont">
            <h1 className="Herotext">
            How's the sky looking today? 
            </h1>
            <div className="wrap">
            <div className="searchcont">
                <img src="icon-search.svg" alt="" className="imgsearch" />
                <input 
                    type="search" 
                    className="search" 
                    placeholder="Search for a place..." 
                    onChange={(e) => setpropofsearch(e.target.value)}
                />
                </div>
                <button className="searchbtn" onClick={handleSearch}>Search</button>
                </div>
        </div>
    )
}
export default Hero;