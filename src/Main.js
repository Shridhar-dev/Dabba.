import React,{useContext} from 'react'
import {User} from './App'
import Home from './Home'
import {BrowserRouter} from 'react-router-dom';
import {Switch , Route} from 'react-router-dom';
import { db } from './firebase';
import Layout from './Layout';
function Main() {
    let alert =( 
    <div className="alert alert-success" role="alert">
    <h4 className="alert-heading">Well done!</h4>
    <p>Aww yeah, you successfully created your account, now you may register as a cook or as a user </p>
    <hr/>
    <button className="btn btn-primary m-2" onClick={()=>{window.location.reload()}}>User</button>
    <button className="btn btn-primary m-2" onClick={()=>{db.collection("Users").doc(context[0].User.uid).update({cook:true }); window.location.reload()}}>Cook</button>
  </div>)
  function wertemon(){
      if( context[0].cU !== undefined){
    if(context[0].cU.additionalUserInfo.isNewUser === true){
        console.log('')
        return alert
    }
 
    else{
        console.log('')
        return <br/>
    }
  }}
      const context = useContext(User)
    return (
        <div>
            {wertemon()}
            <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
        
                <Route exact path='/cook/:id' component={Layout} />
            </Switch>
        </BrowserRouter>
        </div>
    )
}

export default Main
