
import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table";
import Category from "@apis/slices/Category";

const Reducer = {
    [Product.reducerPath]: Product.reducer,
    [Account.reducerPath]: Account.reducer,
    [Table.reducerPath]: Table.reducer,
    [Category.reducerPath]: Category.reducer,


}

export default Reducer