import React,{useState} from 'react'
const useDropdown = (label,defaultState,options) => {
    const [state,setState]=useState(defaultState);
    const id=`use-dropdown-${label.replace(" ","").toLowerCase()}`
    const DropDown = () => (
        <label htmlFor={id}>
           {label}
            <select
                id="animal"
                value={state}
                disabled={!options.length}
                onChange={e => setState(e.target.value)}
                onBlur={e => setState(e.target.value)}
            >
                <option />
                {
                    options.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))
                }
            </select>
        </label>
    );
    return [state,DropDown,setState]
};
export default useDropdown;