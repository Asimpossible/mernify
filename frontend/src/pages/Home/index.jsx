import React from 'react'
import { MetaData } from '../../layout'
import { useGetProductsQuery } from '../../../redux/api/Products'
import { Loading, ProductItem } from '../../component';

const Index = () => {
    const { data, isFetching, isError, isLoading } = useGetProductsQuery();

    if (isFetching) console.log('Data Is Fetching')
    if (isError) console.log('Data Fetching Error')
    if (isLoading) return <div><Loading /></div>
    return (
        <>
            <MetaData title={"Buy Best Products Online"} />
            <div className="row">
                <div className="col-12 col-sm-6 col-md-12">
                    <h1 id="products_heading" className="text-secondary">Latest Products</h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {data?.products.map((product) =>
                                <ProductItem key={product?._id} product={product} />)}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Index
