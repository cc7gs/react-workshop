import React, { Component } from 'react'
import {Redirect,Link} from '@reach/router'
//错误异常捕获

export default class ErrorBoundary extends Component {
    state={
        hasError:false,
        redirect:false,
    }
    static getDerivedStateFromError(){
        return {hasError:true}
    }
    componentDidCatch(error,info){
        console.error('Error Boundary caught an error',error,info)
    }
    componentDidUpdate(){
        if(this.state.hasError){
            setTimeout(() => {
                this.setState({redirect:true})
            }, 3000);
        }
    }

    render() {
        const {hasError,redirect}=this.state;

        if(redirect){
            return <Redirect to="/" />
        }
        if (hasError) {
            return (
              <h1>
                There was an error with this listing. <Link to="/">Click here</Link>{" "}
                to back to the home page or wait five seconds.
              </h1>
            );
          }
        return this.props.children
    }
}
