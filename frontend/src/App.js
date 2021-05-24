import React from 'react';
import {BrowserRouter, Route,Switch} from "react-router-dom";
import './assert/css/admin/admin2.css';

import NavBar from './components/user/Navbar'
import Home from "./components/user/Home";
import Login from './components/user/Login'
import ConferenceDetails from './components/user/ConferenceDetails';

import AdminHome from './components/admin/AdminHome';
import StaffAdd from './components/admin/staff/StaffAdd';
import StaffView from './components/admin/staff/StaffView';
import StaffEdit from './components/admin/staff/StaffEdit';
import PublishedConference from './components/admin/PublishedConference';
import AdminNotification from './components/admin/AdminNotifications';

import EditorHome from './components/editor/EditorHome';
import ConferenceAdd from './components/editor/ConferenceAdd';
import ConferenceView from './components/editor/ConferenceView'
import ConferenceEdit from './components/editor/ConferenceEdit';
import ConferenceStatus from './components/editor/ConferenceStatus';


function App() { 
  return (
    <BrowserRouter>
        <NavBar/>
        <div>
            <div className="container">
                <Route exact path="/" component={Home}/>
                <Route exact path="/conferences/:name" component={ConferenceDetails}/>
                <Route exact path="/login" component={Login}/>
            </div>
        </div>
        {
                sessionStorage.getItem('userType') === 'researcher' ?
                    (
                        <div className="container">
                            <Switch>
                                    
                            </Switch>
                        </div>
                    )
                    : sessionStorage.getItem('userType') === 'editor' ?
                    (
                       <div className="container">
                            <Switch>
                                <Route exact path='/home' component={EditorHome}/>
                                <Route exact path='/conference/add' component={ConferenceAdd}/>
                                <Route exact path='/conference/view' component={ConferenceView}/>
                                <Route exact path='/conference/edit/:id' component={ConferenceEdit}/>
                                <Route exact path='/conference/status' component={ConferenceStatus}/>
                            </Switch>
                        </div>
                    
                    ) : sessionStorage.getItem('userType') === 'admin' ?
                        (
                            <div className="container">
                                <Switch>
                                    <Route exact path='/home' component={AdminHome}/>
                                    <Route exact path='/staff/add' component={StaffAdd}/>
                                    <Route exact path='/staff/view' component={StaffView}/>
                                    <Route exact path='/staff/edit/:id' component={StaffEdit}/>
                                    <Route exact path='/conference/view' component={PublishedConference}/>
                                    <Route exact path='/conference/notification' component={AdminNotification}/>
                                </Switch>
                            </div>
                 
                        ) : null
            }
    </BrowserRouter>
    );
}

export default App;