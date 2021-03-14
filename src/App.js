import React,{useState,useEffect,createContext} from 'react';
import './App.css';

import Logo from './Images/logo.png'
import Google from './Images/google.png'
import { auth,provider,db } from './firebase';
import Main from './Main'

let User = createContext();
 let currUser;
function App() {
  
  const [accountStatus, setAccountStatus] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      if(user){
        setAccountStatus(
          <User.Provider value={[{User:user,cU:currUser}]}>
             <Main />
          </User.Provider>
        )
      }
      else{
        setAccountStatus(
         <Login />
        )
      }
    })
  }, [])

  return (
    <>
    {accountStatus}
    </>
  );
}

function Login() {
  let lat;
  let long;
  function signIn(){
    auth.signInWithPopup(provider)
    .then((user)=>{
     
        if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition);
         
        } else { 
          alert("Geolocation is not supported by this browser.")
        }
      
      function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat,long)
      }


      currUser = user;
      if(user.additionalUserInfo.isNewUser === true){
        setTimeout(function(){ 
          db.collection("Users").doc(user.user.uid).set({
            name:user.user.displayName,
            email:user.user.email,
            phone:user.user.phoneNumber,
            img:user.user.photoURL,
            id:user.user.uid,
            cook:false,
            latitude: lat,
            longitude:long,
            raters:0,
            rating:0,
            user_raters:[]
        })
        }, 1000);  
        
      }
    })
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{width:'100vw',height:'100vh',background:'white'}}>
      <img src={Logo} className="img-fluid" width="200"/>
      <h1 style={{fontFamily:'Roboto',fontWeight:'900'}}>Dabba.</h1>
      <div className="d-flex align-items-center justify-content-center  py-2 px-3 mt-3" onClick={()=>{signIn()}} style={{background:'black',cursor:'pointer'}} >
        <div className="m-0 p-0 px-3">
          <img src={Google} className="img-fluid" width="35" />
        </div>
        <div className="m-0 p-0">
          <p className="m-0 p-0 h5" style={{color:'white'}}>Sign In With Google</p>
        </div>
      </div>
    </div>
  )
}

export default App;
export {User};
