import React from 'react'
import { pages } from '../route'
import { ErrorBoundary,NavigationFooter } from '../component'
import { RouteComponentProps } from 'react-router'

interface IRouterProps {
    pageId: string;
}
interface IProps {
    type: string;
}
export const FullPage: React.FC<RouteComponentProps<IRouterProps> & IProps> = ({ match, ...props }) => {
    const { pageId } = match.params;
    const { type } = props;
    const page = pages[pageId];
    const Usage = pages[pageId][type].default
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1>{page.title}</h1>
            </div>
            <div
                style={{
                    flex: 1,
                    padding: 20,
                    margin: 20,
                    border: '1px solid',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ErrorBoundary>
                    <Usage />
                </ErrorBoundary>
            </div>
            <NavigationFooter pageId={pageId} type={'comp'}/>
        </div>
    )
}
