

const ModelePayment = ({ total, setIsOpen, tabelID }) => {

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50">
            <div className="flex flex-col justify-center items-center h-[200px] w-[400px] bg-white gap-2 ">
                <div className="flex justify-between w-[300px]">
                    <p>Bàn:{tabelID}</p>
                    <button
                        className="bg-slate-500 text-red-50 ml-auto p-2 rounded w-6 flex opacity-50"
                        onClick={() => setIsOpen(false)}
                    >
                        X
                    </button>
                </div>
                <div className="w-9/12 grid grid-cols-3 gap-5">
                    <div className="flex flex-col w-[200px]">
                        <p className="w-full flex justify-start">Tổng tiền {total}.VNĐ </p>
                    </div>
                </div>
                <div className="mt-3 flex ">
                    <button className="btn btn-outline">
                        xác nhận thanh toán
                    </button>


                </div>
            </div>
        </div>
    );
};

export default ModelePayment;
