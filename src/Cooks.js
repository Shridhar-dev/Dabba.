import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function Cooks(props) {
    const [location, setLocation] = useState()
    useEffect(() => {
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${props.latitude},${props.longitude}&key=7f0694bfeb4848bab8c4850c648bff91`)
        .then((res)=>(res.json())).then((result)=>{         
           setLocation(result.results[0].formatted)
        })
    }, [])
    return (
        
           
            <div id={props.id} className="d-flex justify-content-between align-items-center my-4 p-3 px-3" style={{width:'50%',borderRadius:'10px',boxShadow:'0px 5px 30px 0.5px rgba(0,0,0,0.2)',cursor:'pointer'}}>
                <Link to={"/cook/"+props.id} style={{textDecoration:'none'}}>
                <div>
                    <div style={{maxWidth:'25vw',overflow:'hidden',whiteSpace:'nowrap', textOverflow: 'ellipsis'}}>
                    <h3>{props.name}</h3>    
                    </div>
                    
                    <div style={{maxWidth:'25vw',overflow:'hidden',whiteSpace:'nowrap', textOverflow: 'ellipsis'}}>
                    <small>{location}</small>    
                    </div>
                    
                </div>
                </Link>
                <img src={props.img} width="50" style={{borderRadius:'50%'}} />
            </div>
            
        
    )
}

export default Cooks
