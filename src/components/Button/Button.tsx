import React from 'react'
import styled, { css } from 'styled-components'
import { applyStyleModifiers, ModifierKeys } from 'styled-components-modifiers'
import { typeScale } from '../../utils'

const BUTTON_MODIFIER = {
    small: () => `
        font-size:${typeScale.helperText};
        padding:8px;
    `,
    large: () => `
       font-size:${typeScale.header5};
       padding:16px 24px;
    `,
    warning: () => `
    background-color:${({theme}:any)=>theme.status.warningColor};
    color:${({theme}:any)=>theme.textColorInverted};
    
    &:hover,&:focus{
         background-color:${({theme}:any)=>theme.status.warningColorHover};
         outline: 3px solid ${({theme}:any)=>theme.status.warningColorHover};
         outline-offset:2px;
         border:2px solid transparent; 
     }
     &:active {
        background-color: ${({theme}:any)=>theme.status.warningColorActive};
      }
    `,
    primaryButtonWarning: () => `
    background-color: ${({theme}:any)=>theme.status.warningColor};
    color: ${({theme}:any)=>theme.textColorInverted};
  `,
    secondaryButtonWarning: () => `
    border: 2px solid ${({theme}:any)=>theme.status.warningColor};
  `,
    error: () => `
    background: none;
    color: ${({theme}:any)=>theme.status.errorColor};
    &:hover, &:focus {
      background-color: ${({theme}:any)=>theme.status.errorColorHover};
      outline: 3px solid ${({theme}:any)=>theme.status.errorColorHover};
      outline-offset: 2px;
      border: 2px solid transparent;
    }
    &:active {
      background-color: ${({theme}:any)=>theme.status.errorColorActive};
    }
  `,
    primaryButtonError: () => `
    background-color: ${({theme}:any)=>theme.status.errorColor};
    color: ${({theme}:any)=>theme.textColorInverted};
  `,
    secondaryButtonError: () => `
    border: 2px solid ${({theme}:any)=>theme.status.warningColor};
  `,
    success: () => `
    background: none;
    color: ${({theme}:any)=>theme.status.successColor};
    &:hover, &:focus {
      background-color: ${({theme}:any)=>theme.status.successColorHover};
      outline: 3px solid ${({theme}:any)=>theme.status.successColorHover};
      outline-offset: 2px;
      border: 2px solid transparent;
    }
    &:active {
      background-color: ${({theme}:any)=>theme.status.successColorActive};
    }
  `,
    primaryButtonSuccess: () => `
    background-color: ${({theme}:any)=>theme.status.successColor};
    color: ${({theme}:any)=>theme.textColorInverted};
  `,
    secondaryButtonSuccess: () => `
    border: 2px solid ${({theme}:any)=>theme.status.warningColor};
  `
}

type BtnTpe = 'primary' | 'secondary' | 'tertiary';

interface IButton {
    btnType?: BtnTpe;
    modifiers?: ModifierKeys
}




const primaryCss = css`
 background-color:${props=>props.theme.primaryColor};
 color:${props=>props.theme.textColorOnPrimary};
 border: 2px solid transparent;

 &:disabled{
     background-color:${props=>props.theme.disabled};
     color:${props=>props.theme.textOnDisabled};
     border:2px solid transparent;
 }
 ${applyStyleModifiers(BUTTON_MODIFIER)}
`;

const secondaryCss = css`
background:none;
border: 2px solid ${props=>props.theme.primaryColor};
color:${props=>props.theme.primaryColor};

&:disabled{
    color:${props=>props.theme.disabled};
    border-color:${props=>props.theme.disabled};
}

${applyStyleModifiers(BUTTON_MODIFIER)}

`;

const tertiaryCss = css`
 background:none;
 border:none;
 color:${props=>props.theme.primaryColor}

 ${applyStyleModifiers(BUTTON_MODIFIER)}

`

const ButtonTypeStyle: { [key in BtnTpe]: any } = {
    primary: primaryCss,
    secondary: secondaryCss,
    tertiary: tertiaryCss
}

const Button = styled.button<IButton>`
padding: 12px 24px;
font-size: ${typeScale.paragraph};
border-radius:2px;
min-width:100px;
cursor:pointer;
font-family:${props=>props.theme.primaryFont};

&:hover{
    background-color:${props=>props.theme.primaryHoverColor};
    color:${props=>props.theme.textColorOnPrimary}
}

&:focus{
    outline:3px solid ${props=>props.theme.primaryHoverColor};
    outline-offset:2px;
}
&:active{
    background-color:${props=>props.theme.primaryActiveColor};
    border-color:${props=>props.theme.primaryActiveColor};
    color:${props=>props.theme.textColorOnPrimary}
}

&:disabled{
    background:none;
    border:none;
    color:${props=>props.theme.disabled};
    cursor:not-allowed;
}

${props => props.btnType ? ButtonTypeStyle[props.btnType] : ButtonTypeStyle.primary}
`;


export default Button