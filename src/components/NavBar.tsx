import React from 'react'
import { css,keyframes } from '@emotion/core'
import { Link } from '@reach/router'

const Spin=keyframes`
    to {
        transform:rotate(360deg);
    }
`;

export default function NavBar() {
    return (
        <header css={css`
        background-color:#333;
        position:sticky;
        top:0;
        `}>
            <Link to="/">Adopt Me!</Link>
            <span 
            css={css`
                animation:1s ${Spin} linear infinite;
                font-size:60px;
            `}
            aria-label="logo" 
            role="img"> 🐩</span>
        </header>
    )
}
