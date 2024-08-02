import { useState } from "react";
import Header from "../../components/Hearder";
import ModelePayment from "../../components/ModelPayment";
import ListProduct from './../../components/ListProduct/index';
import { useParams } from "react-router-dom";
import { useGetProductByTableQuery } from "../../apis/slices/Table";

function Cash() {
    const { tabelID } = useParams();

    const { data } = useGetProductByTableQuery(tabelID);
    console.log("🚀 ~ Cash ~ useGetProductByTableQuery:", useGetProductByTableQuery)


    const [isOpent, setIsOpen] = useState(false)
    // const total = 2000
    console.log("🚀 ~ Cash ~ tabelID:", tabelID)
    return (
        <div className="relative">
            <Header />

            <h1 className="text-[20px] text-green-500 ml-1 mb-3">bàn: 1</h1>
            <ListProduct />

            <div className="flex justify-between items-center px-3 mt-2 bottom-0 fixed z-20 bg-white w-full">
                <span>tổng tiền:100</span>
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-green-500 text-white rounded ">thanh toán</button>
            </div>
            {
                isOpent &&

                <ModelePayment
                    // total={total}
                    tabelID={tabelID}
                    setIsOpen={setIsOpen}
                />
            }
        </div>

    );
}

export default Cash;