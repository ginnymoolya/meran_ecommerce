import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/action/productActions";
import { addToCart } from "../redux/action/cartActions";

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.getProductDetails);
    const { product, loading, error } = productDetails;


    useEffect(() => {
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id));
        }
    }, [dispatch, match, product]);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty));
        history.push(`/cart`);
    };

    return (
        <div className="productscreen">
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2> {error} </h2>
            ) : (
                <>
                    <p>{product}</p>
                    <div className="productscreen__left">
                        <div className="left__image">
                            <p>Product Details</p>
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="left__info">
                            <p className="left__name">{product.name}</p>
                            <p>Price: ${product.price}</p>
                            <p>Description: {product.description}</p>
                        </div>
                    </div>
                    <div className="productscreen__right">
                        <div className="right__info">
                            <p>
                                Price:
                                <span>${product.price}</span>
                            </p>
                            <p>
                                Status:
                                <span>
                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </p>
                            <p>
                                Qty
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type="button" onClick={addToCartHandler}>
                                    Add To Cart
                                </button>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductScreen;
