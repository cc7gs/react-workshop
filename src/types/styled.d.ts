import 'styled-components'

declare module 'styled-components'{
    export interface DefaultTheme{
        primaryColor: string,
        primaryHoverColor: string,
        primaryActiveColor: string,
        textColorOnPrimary: string,
        textColor: string,
        textColorInverted:string,
        disabled:string,
        textOnDisabled:string,
        primaryFont: string,
        status: {
          warningColor: string,
          warningColorHover: string,
          warningColorActive: string,
          errorColor: string,
          errorColorHover:string,
          errorColorActive:string,
          successColor: string,
          successColorHover:string,
          successColorActive: string
        }
      }
}
