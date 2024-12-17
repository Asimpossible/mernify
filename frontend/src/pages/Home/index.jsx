import React, { useEffect } from "react";
import MetaData from "../../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/Products";
import { ProductItem, Loading, CustomPagination, Filters } from "../../components";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    let [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");

    const params = { page, keyword };

    if (min) params.min = min;
    if (max) params.max = max;
    if (category) params.category = category;
    if (ratings) params.ratings = ratings;


    const { data, isLoading, error } = useGetProductsQuery(params);

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message ? error?.data?.message : "Error occurred when fetching data");
        }
    }, [error]);

    const columnSize = keyword ? 4 : 3;

    if (isLoading) return <Loading />;

    return (
        <>
            <MetaData title={"Buy Best Products Online"} />
            <div className="row">
                {keyword && (
                    <div className="col-6 col-md-3 mt-5">
                        <Filters />
                    </div>
                )}
                <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">
                        {keyword
                            ? `${data?.products?.length} Products found with keyword: ${keyword}`
                            : "Latest Products"}
                    </h1>

                    <div id="products" className="mt-5">
                        <div className="row">
                            {data?.products?.map((product, index) => (
                                <ProductItem product={product} columnSize={columnSize} key={index} />
                            ))}
                        </div>
                    </div>

                    <CustomPagination
                        resPerPage={data?.resPerPage}
                        filteredProductsCount={data?.filteredProductsCount}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;            