import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './assert/css/admin/admin2.css'

import NavBar from './components/user/Navbar'
import Home from './components/user/Home'
import Login from './components/user/Login'
import ConferenceDetails from './components/user/ConferenceDetails'
import UserLogin from './components/FrontLogin'
import Download from './components/user/Download';
import UpcomingEvents from './components/user/UpcomingEvents';


import AdminHome from './components/admin/AdminHome'
import StaffAdd from './components/admin/staff/StaffAdd'
import StaffView from './components/admin/staff/StaffView'
import StaffEdit from './components/admin/staff/StaffEdit'
import PublishedConference from './components/admin/PublishedConference'
import AdminNotification from './components/admin/AdminNotifications'

import EditorHome from './components/editor/EditorHome'
import ConferenceAdd from './components/editor/ConferenceAdd'
import ConferenceView from './components/editor/ConferenceView'
import ConferenceEdit from './components/editor/ConferenceEdit'
import ConferenceStatus from './components/editor/ConferenceStatus'
import FileUpload from './components/editor/FileUpload';

import AddAttendee from './components/Attendee/Add_attendee'
import DisplayAttendee from './components/Attendee/displayAttendee'
import EditAttendee from './components/Attendee/EditAttendee'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
            <div>
              <div className="container">
                <Route exact path="/addattendee" component={AddAttendee} />
                <Route exact path="/displayattendee" component={DisplayAttendee} />
                <Route exact path="/editattendee" component={EditAttendee} />
                <Route exact path="/" component={Home}/>
                <Route exact path="/conferences/:name" component={ConferenceDetails}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/UserLogin" component={UserLogin}/>
                <Route exact path="/download" component={Download}/>
                <Route exact path="/upcomingEvent" component={UpcomingEvents}/>
            </div>
        </div>
        {
                sessionStorage.getItem('userType') === 'reviewer' ?
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
                                <Route exact path='/file/upload' component={FileUpload}/>
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
  )
}

export default App
