import React from 'react'
import { MetaData } from '../../layout'
import { useGetProductsQuery } from '../../redux/api/Products'
import { Loading, ProductItem, CustomPagination, Filters } from '../../component';
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const Index = () => {
    let [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");

    const params = { page, keyword };

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category);
    ratings !== null && (params.ratings = ratings);

    const { data, isFetching, error, isError, isLoading } = useGetProductsQuery(params);

    if (isFetching) console.log('Data Is Fetching')
    if (isError) toast.error(error?.data?.message)
    if (isLoading) return <div><Loading /></div>

    const columnSize = keyword ? 4 : 3;
    return (
        <>
            <MetaData title={"Buy Best Products Online"} />
            <div className="row">
                {keyword && (
                    <div className="col-6 col-md-3 mt-5">
                        <Filters />
                    </div>
                )}
                <div className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">
                        {keyword ? `${data?.products?.length} Products found with keyword: ${keyword}` : "Latest Product"}
                    </h1>

                    <div id="products" className="mt-5">
                        <div className="row">
                            {data?.products.map((product) =>
                                <ProductItem key={product?._id} product={product} columnSize={columnSize} />)}
                        </div>
                    </div>
                    <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount} />
                </div>
            </div>
        </>
    )
}

export default Index
