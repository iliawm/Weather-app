function Hero(){
    return(
        <div className="Herocont">
            <h1 className="Herotext">
            How's the sky looking today? 
            </h1>
            <div className="wrap">
            <div className="searchcont">
                <img src="icon-search.svg" alt="" className="imgsearch" />
                <input type="search" name="" id="" className="search" placeholder="Search for a place..."/>
                </div>
                <button className="searchbtn">Search</button>
                </div>
        </div>
    )
}
export default Hero;