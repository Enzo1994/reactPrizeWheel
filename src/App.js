import React,{Component} from 'react'
import Wheel from './components/wheel/wheel'
import './App.css'
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputValue:'',
            inputValueAfter:''
        }
    }
    render(){
        return (
            <div>
                <Wheel></Wheel>
            </div>
        )
    }
    inputChangeHandler(e){
        this.setState({
            inputValue : e.target.value
        })
    }
    btnClickHandler(e){
        this.setState({
            inputValueAfter : this.state.inputValue
        })
    }
}

export default App