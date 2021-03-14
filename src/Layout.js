import React, { useContext, useEffect, useState } from 'react'
import { User } from './App'
import { db,auth } from './firebase'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
function Layout(props) {
    const [client, setClient] = useState({})
    const context = useContext(User)
    const [showRating, setShowRating] = useState()

    useEffect(async() => {
        let snap = await db.collection('Users').doc(props.match.params.id).get();
        setClient(snap.data())
        if(snap.data().user_raters.includes(context[0].User.uid) === false){
            setShowRating(
                <div className="d-flex align-items-center justify-content-center">
            <span className="star star-1  h1" onClick={()=>{rate(5)}}>⭐</span>
            <span className="star star-2 h2" onClick={()=>{rate(4)}}>⭐</span>
            <span className="star star-3 h3" onClick={()=>{rate(3)}}>⭐</span>
            <span className="star star-4 h4" onClick={()=>{rate(2)}}>⭐</span>
            <span className="star star-5 h5" onClick={()=>{rate(1)}}>⭐</span>
            </div>

            )
        }
        else{
            setShowRating(<></>)
        }
    }, [])

    function rate(n){
        db.collection('Users').doc(props.match.params.id).update({rating: firebase.firestore.FieldValue.increment(n) ,raters: firebase.firestore.FieldValue.increment(1), user_raters :firebase.firestore.FieldValue.arrayUnion(context[0].User.uid)})
        setTimeout(function(){ window.location.reload() }, 2000);
    }
    
    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{height:'100vh',width:'100vw',overflowX:'hidden'}}>
           <div className="d-flex justify-content-between align-items-center px-5 py-3 mb-5" style={{width:'100vw',position:'relative'}}>
               <Link to="/"> <h1 style={{fontFamily:'Roboto',fontWeight:'900'}}>Dabba.</h1></Link>
                <img onClick={()=>auth.signOut()} src={context[0].User.photoURL} className="img-fluid" width="50" style={{borderRadius:'50%',cursor:'pointer'}}/>
            </div>
            <img src={client.img} width="200" className="img-fluid" style={{borderRadius:'50%'}}/>
            <h1 className="my-3">{client.name}</h1>
            <h2>{client.email}</h2>
            <h2>{client.phone}</h2>
            <small> <a href={"https://www.google.co.in/maps/@"+client.latitude+','+client.longitude+',18z'} style={{color:'blue'}}>Show on Google Maps </a></small>
            <small style={{maxWidth:'50%'}}>Rating: {client.rating/client.raters}</small>
            {showRating}
        </div>
    )
}

export default Layout
