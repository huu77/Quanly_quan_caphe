
import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
const Reducer = {
    [Product.reducerPath]: Product.reducer,
    [Account.reducerPath]: Account.reducer,
 
}

export default Reducer