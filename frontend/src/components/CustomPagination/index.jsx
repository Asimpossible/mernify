import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
    const [currentPage, setCurrentPage] = React.useState();

    let [searchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const navigate = useNavigate();

    React.useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)

        if (searchParams.has("page")) {
            searchParams.set("page", pageNumber)
        }
        else {
            searchParams.append("page", pageNumber)
        }

        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
    };

    return (
        <>
            <div className="d-flex justify-content-center my-5">
                {filteredProductsCount > resPerPage && (
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={filteredProductsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Previous"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                )}
            </div>
        </>
    )
}

export default CustomPagination
