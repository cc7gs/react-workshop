import React, { useState, FunctionComponent, SetStateAction } from 'react'

const useDropdown = (
    label: string,
    defaultState: string,
    options: string[]): [string, FunctionComponent, (newState: string) => void] => {
    const [state, setState] = useState(defaultState);
    const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`

    const DropDown: React.FC = () => (
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

    return [state, DropDown, setState]
};
export default useDropdown;