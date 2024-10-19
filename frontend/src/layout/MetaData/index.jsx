import React from 'react';
import { Helmet } from 'react-helmet';

const Index = ({ title }) => {
    return (
        <>
            <Helmet>
                <title>{`${title} - ShopIT`}</title>
            </Helmet>
        </>
    )
}

export default Index
