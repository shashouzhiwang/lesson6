import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './profile'
import Statistics from './statistics'
import {MatchSubjectComponent, ArtSubjectComponent} from './subject'
import {ProfileContext} from './context'


class App extends React.Component{
    constructor(props) {
        super(props);

        this.changeEmail = (e) => {
            const value = e.target.value;
            const profile = this.state.profile;
            profile.email = e.target.value;
            this.setState(() => (profile))
        }

        this.changeEID = (e) => {
            const value = e.target.value;
            const profile = this.state.profile;
            profile.EID = e.target.value;
            this.setState(() => (profile))
        }

        this.state= {
            profile: {
                email: 'qing.luo@accenture.com',
                EID: 'qing.luo',
                changeEmail: this.changeEmail,
                changeEID: this.changeEID
            }
        }
    }

    render() {
        return (
            <div className="container">
                <ProfileContext.Provider value={this.state.profile}>
                    <Profile></Profile>
                    <Statistics></Statistics>
                    {/*<HightInput></HightInput>*/}
                    <div className="app_subject_warp">
                        <MatchSubjectComponent></MatchSubjectComponent>
                        <ArtSubjectComponent></ArtSubjectComponent>
                    </div>
                </ProfileContext.Provider>
            </div>
        )
    }
}

export default App;
