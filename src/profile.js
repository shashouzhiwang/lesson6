import React, {Fragment, Component} from 'react'
import 'antd/dist/antd.css';
import { Form, Input } from 'antd'
import {ProfileContext} from "./context";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state= {
            fields: {
                name: ['username'],
                value: 'Ant Design',
            }
        }

    }

    render() {
        return(
            <Fragment>
                <ProfileContext.Consumer>
                    {
                        ({email, EID, changeEmail, changeEID}) => (
                            <div>
                                <div>
                                    <span>email: </span><Input placeholder="Basic usage" onChange={changeEmail} value={email}/>
                                </div>
                                <div>
                                    <span>EID: </span><Input placeholder="Basic usage" onChange={changeEID} value={EID}/>
                                </div>
                            </div>
                        )
                    }

                </ProfileContext.Consumer>

            </Fragment>
        )
    }
}

export default Profile
