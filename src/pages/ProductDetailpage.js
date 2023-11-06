import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";

function ProductDetailpage(){
    return (
        <div>
            <Navbar>
            <ProductDetail></ProductDetail>
            </Navbar>
        </div>
    )
}

export default ProductDetailpage;