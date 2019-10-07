import React from 'react'
import { pages } from '../route'
import { Link } from 'react-router-dom';
type IProps = Readonly<{
    pageId: string;
    type: string;
}>
export const NavigationFooter: React.FC<IProps> = ({ pageId, type }) => {
    const Usage = pages[pageId][type];
    return (
        <div style={{
            display:'flex',
            justifyContent:'space-between'
        }}>
            <div style={{flex:1}}>
                {Usage.previous ? (
                    <Link to={`/${Usage.previous}`}>
                        {pages[Usage.previous].title}{' '}
                        <span role="img" aria-label="previous">
                            👈
                        </span>
                    </Link>
                ) : null}
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <Link to="/">Home</Link>
            </div>
            <div style={{flex:1, textAlign: 'right'}}>
                {
                    Usage.next ? (
                        <Link to={`/${Usage.next}`}>
                            <span role="img" aria-label="next">
                                👉
                        </span>{' '}
                            {pages[Usage.next].title}
                        </Link>
                    ):null
                }
            </div>
        </div>
    )
}
