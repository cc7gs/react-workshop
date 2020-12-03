import React, { useState } from 'react';
import {ButtonDemo as Button,AuthProvider, useAuthState } from './components'
import { GlobalStyle, darkTheme, defaultTheme } from './utils'
import { ThemeProvider } from 'styled-components';


const App: React.FC = () => {
    const [useDarkTheme, setUseDarkTheme] = useState(false);

    return (
        <ThemeProvider theme={useDarkTheme ? darkTheme : defaultTheme}>
            <React.Fragment>
                <button style={{
                    margin: "0 16px 24px",
                    padding: '8px',
                    background: 'none'
                }}
                    onClick={() => setUseDarkTheme(true)}>
                    Dark Theme
                </button>
                <button
                    style={{
                        margin: "0 16px 24px",
                        padding: '8px',
                        background: 'none'
                    }}
                    onClick={() => setUseDarkTheme(false)}>
                    Default Theme
            </button>
                <div
                    style={{
                        background: useDarkTheme
                            ? defaultTheme.primaryColor
                            : darkTheme.primaryColor,
                        width: "100vw",
                        height: "90vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                >

                    <Button modifiers={['small', 'warning', "secondaryButtonWarning"]} btnType="secondary" >custom button</Button>
                    <Button > primary Button</Button>
                    <Button btnType="tertiary"> tertiary Button</Button>
                    {/* <Home /> */}
                    <GlobalStyle />
                </div>
            </React.Fragment>
        </ThemeProvider>
    );
}
function Home() {
    const { user } = useAuthState()
    if (user) return <p>user has loading...</p>
    return <div>user not login...</div>
}

export default App;
