import React, {Component, Fragment} from 'react';
import './App.css'
import store from './store'

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_match_result: 0.0,
            subject_art_result: 0.0,
            subject_art_extras: 0.0,
            subject_match_extras: 0.0
        };
        store.subscribe(() => {
            const stateObj = JSON.parse(JSON.stringify(this.state))
            if (store.getState()['subject_match_result']){
                stateObj['subject_match_result'] = store.getState()['subject_match_result'];
            }
            if (store.getState()['subject_art_result']) {
                stateObj['subject_art_result'] = store.getState()['subject_art_result'];
            }
            if (store.getState()['subject_art_extras']) {
                stateObj['subject_art_extras'] = store.getState()['subject_art_extras'];
            }
            if (store.getState()['subject_match_extras']) {
                stateObj['subject_match_extras'] = store.getState()['subject_match_extras'];
            }
            this.setState(() => (stateObj))
        })
    }

    render() {
        return(
        <div className='statistics'>
            <div>
                <div>Subject:</div>
                <div><span>美术：</span><span>{this.state.subject_art_result}</span></div>
                <div><span>数学：</span><span>{this.state.subject_match_result}</span></div>
            </div>
            <div>
                <div>Average: </div>
                <div><span>科目平均分：</span><span>{(this.state.subject_art_result + this.state.subject_match_result)/2}</span></div>
                <div><span>Extras_Average：</span><span>{(parseInt(this.state.subject_art_extras) + parseInt(this.state.subject_match_extras))/2}</span></div>
            </div>
        </div>


        )
    }
}
export default Statistics