import React, { Component, ErrorInfo } from 'react'
import {Redirect,Link} from '@reach/router'

// 错误异常捕获
export default class ErrorBoundary extends Component {
    public state={
        hasError:false,
        redirect:false,
    }
    public static getDerivedStateFromError(){
        return {hasError:true}
    }
    public componentDidCatch(error:Error,info:ErrorInfo){
        console.error('Error Boundary caught an error',error,info)
    }
    public componentDidUpdate(){
        if(this.state.hasError){
            setTimeout(() => {
                this.setState({redirect:true})
            }, 3000);
        }
    }

    public render() {
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
