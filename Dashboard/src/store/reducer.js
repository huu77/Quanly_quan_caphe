
import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table";
import Category from "@apis/slices/Category";
import Client from "@apis/slices/Client";
import Session from "@apis/slices/Session";
const Reducer = {
    [Product.reducerPath]: Product.reducer,
    [Account.reducerPath]: Account.reducer,
    [Table.reducerPath]: Table.reducer,
    [Category.reducerPath]: Category.reducer,
    [Client.reducerPath]: Client.reducer,
    [Session.reducerPath]: Session.reducer,
}

export default Reducer