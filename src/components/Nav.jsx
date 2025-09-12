function Nav(){
    return(
        <div className="nav">
            <div className="left">
                <img src="logo.svg" alt="" className="logo"/>
            </div>
            <div className="right">
                <button className="units"onClick={()=>{
                    document.querySelector(".openback").classList.toggle("open")
                    document.querySelector(".unitsdropdown").classList.toggle("rotate")

                    
                }} >
                    
                    <img src="icon-units.svg" alt="" className="unitsicon"/>
                    <div>Units</div> 
                    <img src="icon-dropdown.svg" alt="" className="unitsdropdown" />
                    </button>
                    <div className="openback">
                    <button className="celsius">celsius</button>
                    <button className="fahrenheit">fahrenheit </button>
                    </div>
                    </div>
        </div>
        
        
    )
}
export default Nav;