import Header from "../../components/Hearder";
import ListProduct from './../../components/ListProduct/index';

function Cash() {
    return (
        <div className="relative">
            <Header />

            <h1 className="text-[20px] text-green-500 ml-1 mb-3">bàn :1</h1>
            <ListProduct />

            <div className="flex justify-between items-center px-3 mt-2 bottom-0 fixed z-20 bg-white w-full">
                <span>tổng tiền:100</span>
                <button className="p-2 bg-green-500 text-white rounded ">thanh toán</button>
            </div>
        </div>
    );
}

export default Cash;