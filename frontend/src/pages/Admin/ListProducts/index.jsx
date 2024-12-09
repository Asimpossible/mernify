import React from "react";
import Loading from "../../../components/Loading";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../../../layout/MetaData";
import AdminLayout from "../../../components/Admin";
import { useDispatch } from "react-redux";
import { useGetAdminProductsQuery } from "../../../redux/api/Products";

export const ListProducts = () => {
    const { data, isLoading, error } = useGetAdminProductsQuery();

    React.useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

    }, [error]);

    const setProducts = () => {
        const products = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        data?.products?.forEach((product) => {
            products.rows.push({
                id: product?._id,
                name: `${product?.name.substring(0, 20)}...`,
                stock: product?.stock,

                actions: (
                    <>
                        <Link to={`/admin/products/${product?._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link to={`/admin/products/${product?._id}/upload_images`} className="btn btn-outline-success ms-2">
                            <i className="fa fa-image"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                )
            });
        });

        return products;
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <AdminLayout>
                <MetaData title={"All Products"} />

                <h1 className="my-5">{data?.products?.length} Products</h1>

                <MDBDataTable
                    data={setProducts()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </AdminLayout>
        </div>
    );
};

export default ListProducts;