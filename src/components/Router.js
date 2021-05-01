import React from "react";
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "components/Navigation";



const AppRouter=({isLoggedIn,userObj,refreshUser}) =>{
    
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ? (//로그인 했을 때  (userobj={userObj} -> 그 태그에 userObj 객체를 전달 )
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser}/>
                        </Route>
                    </>
                    ):( //로그인하지 않았을 때 (로그아웃도 해당 )
                  
                        <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        
                        </>
                )}
            </Switch>
        </Router>

    );
};

export default AppRouter;