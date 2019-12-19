import React, { Component } from 'react'
import './wheel.css'
class Wheel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prizeMap: {
                '0-45': 'no',
                '45-90': 'no',
                '90-135': '2',
                '135-180': 'no',
                '180-225': '1',
                '225-270': 'no',
                '270-315': 'no',
                '315-360': '3'
            },
            rotateTimes: 1,
            userPrize: 'no',
            currentAngle: 0,
            userInput:0,
        }
        this.prizeChangeHandler = this.prizeChangeHandler.bind(this)
    }
    prizeChangeHandler(event){
        this.setState({userInput: event.target.value});

        // console.log(value);
    }
    start() {
        // const userInput = prompt('请输入用户的获奖内容：1、2、3、no皆可')
        // if(!userInput){
        //     return console.log('cancel')
        // }
        this.setState({userPrize:this.state.userInput})
        const possibleRangeArr = Object.entries(this.state.prizeMap).map(([key, value]) => {
            if (value == this.state.userInput) {
                return key
            }
        }).filter(Boolean)
        console.log(possibleRangeArr)
        //获取旋转范围：
        const randomRangeStr = possibleRangeArr[Math.floor(Math.random() * possibleRangeArr.length)]
        console.log(randomRangeStr)
        // 当前的旋转度数：
        const { currentAngle } = this.state;
        console.log(currentAngle)
        //获取随机旋转度数：
        const randomRangeArr = randomRangeStr.split('-')
        const randomAngle = Math.floor(Math.random() * (randomRangeArr[1] / 1 - 5 - (randomRangeArr[0] / 1 + 5)) + randomRangeArr[0] / 1)
        console.log(randomAngle)
        this.setState({ rotateTimes: this.state.rotateTimes + 1, currentAngle: randomAngle + 360 * 5 * this.state.rotateTimes, })
    }

    render() {
        const wheelStyle = {
            transform: `rotateZ(${this.state.currentAngle}deg)`
        }
        return (
            <div>
                <label>请输入用户的获奖内容：1、2、3、no皆可'<input type="text" value={this.state.userInput} onChange={this.prizeChangeHandler}/></label>
                <button onClick={this.start.bind(this)}>点击开始</button>

                <div className="prize__wrapper">
                    <div className="prize-pointer__wrapper"></div>
                    <div className="prize-wheel__wrapper" style={wheelStyle}></div>
                </div>
            </div>
        )

    }
}

export default Wheel