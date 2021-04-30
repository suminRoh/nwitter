import React from "react";
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "components/Navigation";



const AppRouter=({isLoggedIn}) =>{
    
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (//로그인 했을 때
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
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