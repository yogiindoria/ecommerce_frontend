import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from '../features/common/Footer';

function Home(){
    return (
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Footer></Footer>
        </div>
    )
}

export default Home;