import React, {Fragment, Component, useState} from 'react'
import "antd/dist/antd.css"
import "./subject.scss"
import { Input, Button } from 'antd'
import { Slider, Row, Col } from 'antd';
import { ProfileContext } from "./context";
import store from './store'

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: '',
            result: 0,
        }
        store.subscribe(() => {
            this.setState(() => {
                return {

                }
            })
        })
        this.clickDigital = this.clickDigital.bind(this)
        this.clickSymbol = this.clickSymbol.bind(this)
        this.clickResult = this.clickResult.bind(this)
    }

    clickDigital(item) {
        const stateObj = JSON.parse(JSON.stringify(this.state));
        stateObj.formula = `${stateObj.formula}${item}`;
        this.setState(() => (stateObj))
    }
    clickSymbol(item) {
        const stateObj = JSON.parse(JSON.stringify(this.state));
        stateObj.formula = `${stateObj.formula}${item}`;
        this.setState(() => (stateObj))
    }

    clickResult(item) {
        const stateObj = JSON.parse(JSON.stringify(this.state));
        if (item === 'C') {
            stateObj.formula = ''
        }
        if (item === '=') {
            let result = '0';
            if (stateObj.formula !== '') {
                try {
                    result = eval(stateObj.formula);
                } catch(e) {
                    result = 'error'
                }
                this.props.data.getResult(result);
            }
        }
        this.setState(() => (stateObj))
    }

    render() {
        const digital = [0,1,2,3,4,5,6,7,8,9];
        const symbol = ['+','-','*',"/"];
        const result = ['C','='];
        return (
            <ProfileContext.Consumer>
                {
                    ({email, EID, changeEmail, changeEID}) => (
                        <Fragment>
                            {/*<div>*/}
                                <div>请计算{this.props.data.title}成绩</div>
                          {this.props.data.title === '数学' ? <Input placeholder="Basic usage" value={EID} onChange={changeEID}/> : ''}
                          {this.props.data.title === '美术' ? <Input placeholder="Basic usage" value={email} onChange={changeEmail}/> : ''}


                                <div style={{height: '40px', lineHeight: '40px'}}>{this.state.formula}</div>
                                <div className="operation">
                                    <div className="symbol">
                                        {
                                            symbol.map((item, index) => (
                                                <Button key={item} onClick={() => {this.clickSymbol(item)}}>{item}</Button>
                                            ))
                                        }
                                    </div>
                                    <div className="symbol">
                                        {
                                            result.map((item, index) => (
                                                <Button key={item} onClick={() => {this.clickResult(item, true)}}>{item}</Button>
                                            ))
                                        }
                                    </div>
                                    <div className="digital">
                                        {
                                            digital.map((item, index) => (
                                                <Button key={item} onClick={() => {this.clickDigital(item)}}>{item}</Button>
                                            ))
                                        }
                                    </div>
                                </div>

                            {/*</div>*/}
                        </Fragment>
                    )
                }
            </ProfileContext.Consumer>
        )
    }
}

function WithSubject(Com, data) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = data
        }

        componentDidMount() {
        }

        componentWillUnmount() {
        }

        render() {
            return <Com type={this.state} {...this.props} />;
        }
    }
}

export function MatchSubjectComponent(props) {
    const [inputValue, setInputValue] = useState(0);
    const onChange = e => {
        setInputValue(e.target.value)
        const action = {
            type: 'get_match_extras',
            value: e.target.value,
        }
        store.dispatch(action)
    };
    const getResult = (result) => {
        const action = {
            type: 'get_match',
            value: result,
        }
        store.dispatch(action)
    }
    return (
        <div className="subject">
            <Button type="primary">Show/Hidden</Button>
            <div>
                <Subject data={{title: '数学', getResult}} {...props}></Subject>
                <div className="footer">
                    <div>
                        <label>附加分：</label>
                        <Input placeholder="Basic usage" value={inputValue} onChange={onChange}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export function ArtSubjectComponent(props) {
    const [inputValue, setInputValue] = useState(0);
    const onChange = value => {
        setInputValue(value)
        const action = {
            type: 'get_art_extras',
            value: value,
        }
        store.dispatch(action)
    };
    const getResult = (result) => {
        const action = {
            type: 'get_art',
            value: result,
        }
        store.dispatch(action)
    }
    return (
        <div className="subject">
            <Button type="primary">Show/Hidden</Button>
            <div>
                <Subject data={{title: '美术', getResult}}  {...props}></Subject>
                <div className="footer">
                    <div>
                        <label >附加分：</label>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={20}
                                    onChange={onChange}
                                    value={typeof inputValue === 'number' ? inputValue : 0}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

// function withOnChange(WrappedComponent) {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//             console.log(props, '-----');
//             this.state = {
//                 name: ''
//             };
//         }
//
//         onChange = () => {
//             this.setState({
//                 name: '大板栗',
//             });
//         }
//
//         render() {
//             const newProps = {
//                 name: {
//                     value: this.state.name,
//                     onChange: this.onChange,
//                 },
//             };
//             return <WrappedComponent {...this.props} {...newProps} />;
//         }
//     };
//
// }

// const NameInput = props => (<input name="name" {...props.name} />);

// export const HightInput = withOnChange(NameInput);

// export const MatchSubject = WithCal(MatchSubjectComponent, {
//     title: '数学',
//     getResult: () => {
//         alert('数学');
//     }
// });
//
// export const ArtSubject = WithCal(ArtSubjectComponent, {
//     title: '美术',
//     getResult: () => {
//         alert('美术');
//     }
// });