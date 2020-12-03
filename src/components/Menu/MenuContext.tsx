import { createContext } from 'react';
import {MenuMode} from '.';
interface IMenuContext{
    onSelect?:(idx:React.Key)=>void;
    activeKey:React.Key;
    mode:MenuMode;
}
const MenuContext=createContext<IMenuContext>({activeKey:'0',mode:'vertical'});
export default MenuContext