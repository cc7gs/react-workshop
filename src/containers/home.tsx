import React from 'react';
import { Link } from 'react-router-dom';
import {fileAddTitles} from '../route'


export const Home = () => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Advanced React Component Patterns</h1>
            <div>
                {
                    fileAddTitles.map(({title,fileName})=>{
                        return(
                            <div key={fileName} style={{margin:10}}>
                                {fileName}
                                {'. '}
                                <Link to={`/${fileName}`}>{title}</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
