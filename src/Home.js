import React, { useContext, useEffect,useState } from 'react'
import { auth, db } from './firebase'
import {User} from './App'
import { Link } from 'react-router-dom'
import LatLon from 'geodesy/latlon-spherical.js';
import Cooks from './Cooks'

function Home() {
    const context = useContext(User)
    const [users, setUsers] = useState([])
    const [snap, setSnap] = useState()
    
    const newObj = [];
    useEffect(async() => {
        setSnap(await db.collection('Users').doc(context[0].User.uid).get())

        db.collection('Users').onSnapshot((snap)=>{
            setUsers(snap.docs.map((doc)=>({id:doc.id,data:doc.data()})))
        })
    }, [])

    function arr_sorter(){
        newObj.sort(function(a, b) {
            return( a.distance - b.distance)
        })
        
        
    }
    return (
        
        <div style={{height:'100vh',width:'100vw',overflowX:'hidden'}}>
           
            <Link>
             <div className="d-flex justify-content-between align-items-center px-5 py-3" style={{width:'100vw'}}>
                  <h1 style={{fontFamily:'Roboto',fontWeight:'900'}}>Dabba.</h1>
                  <img onClick={()=>auth.signOut()} src={context[0].User.photoURL} className="img-fluid" width="50" style={{borderRadius:'50%'}}/>
             </div>
             </Link>
             <div style={{width:'100vw'}}>
                <div></div>
                <div className="cook-list d-flex justify-content-center align-items-center flex-column">
                   {
                    users.map((user)=>{
                        
                        
                        if(user.data.cook === true && snap.data() !== undefined){
                                const p1 = new LatLon(snap.data().latitude, snap.data().longitude);
                                let p2 = new LatLon(user.data.latitude, user.data.longitude);
                                let d = p1.distanceTo(p2) / 1000;
                                let kmd = d.toString().substring(0, 4) 
                    
                               
                                newObj.push({name:user.data.name, id:user.data.id, image:user.data.img ,distance:parseFloat(kmd),lat:user.data.latitude,long:user.data.longitude})
                                console.log(newObj)
                                arr_sorter()
                                console.log(newObj)
                               
                        }
                    })
                    
                   
                   }
                   {
                       newObj.map((near)=>{
                            return(
                                <Cooks id={near.id} name={near.name} img={near.image} latitude={near.lat} longitude={near.long} />
                            )
                       })
                   }
                 
                   
                   
                </div>
             </div>
        </div>
    )
}

export default Home
