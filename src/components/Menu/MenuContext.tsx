import { createContext } from 'react';

interface IMenuContext{
    onSelect?:(idx:React.Key)=>void;
    activeKey:React.Key;
}
const MenuContext=createContext<IMenuContext>({activeKey:'0'});
export default MenuContext