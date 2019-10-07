import React, { Component, ErrorInfo } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false,
        redirect: false,
    }
    static getDerivedStateFromError() {
        return { error: false }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info)
        this.setState({ hasError: true })
    }
    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => {
                this.setState({ redirect: true })
            }, 3000);
        }
    }
    render() {
        const { redirect, hasError } = this.state;

        if (redirect) {
           return <Redirect to="/" />
        }
        if (hasError) {
            return (
                <h1>There was has error with this listening <Link to="/">Click here</Link>{' '}
                    go back home page or wait three seconds
                </h1>
            )
        }
        return this.props.children
    }
}
