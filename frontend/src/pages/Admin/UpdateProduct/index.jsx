import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../../../components/Loading";
import { toast } from "react-hot-toast";
import MetaData from "../../../layout/MetaData";
import AdminLayout from "../../../components/Admin";
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../../redux/api/Products';
import { PRODUCT_CATEGORIES } from '../../../constants';

const UpdateProduct = () => {
    const params = useParams();

    const { data } = useGetProductDetailsQuery(params.id);
    const [updateProduct, { isLoading, error, isSuccess }] = useUpdateProductMutation()

    const navigate = useNavigate();
    const [product, setProduct] = React.useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        seller: "",
    });

    const { name, description, price, category, stock, seller } = product;

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateProduct({ id: params?.id, body: product })
    };


    React.useEffect(() => {
        if (data?.product) {
            setProduct({
                name: data?.product?.name,
                description: data?.product?.description,
                price: data?.product?.price,
                category: data?.product?.category,
                stock: data?.product?.stock,
                seller: data?.product?.seller,
            })
        }

        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Product updated");
            navigate("/admin/products")
        }
    }, [error, isSuccess, data]);

    return (
        <>
            <AdminLayout>
                <MetaData title={"Update Product"} />
                <div className="row wrapper mt-0">
                    <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                            <h2 className="mb-4">Update Product</h2>
                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label"> Name </label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description_field" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="8"
                                    name="description"
                                    value={description}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>

                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="price_field" className="form-label"> Price </label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        name="price"
                                        value={price}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="mb-3 col">
                                    <label htmlFor="stock_field" className="form-label"> Stock </label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        name="stock"
                                        value={stock}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="category_field" className="form-label"> Category </label>
                                    <select
                                        className="form-select"
                                        id="category_field"
                                        name="category"
                                        value={category}
                                        onChange={handleOnChange}>
                                        {PRODUCT_CATEGORIES.map((category) => {
                                            return (
                                                <option key={category} value={category}>{category}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3 col">
                                    <label htmlFor="seller_field" className="form-label"> Seller Name </label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        name="seller"
                                        value={seller}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn w-100 py-2" disabled={isLoading}>{isLoading ? "Updating..." : "UPDATE"}</button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default UpdateProduct
