function CardNotifi() {
    return (

        <div className="flex justify-between px-10 h-[60px] m-3 shadow-md">

            <div>
                <p className="text-[20px] text-gray-500">bàn: </p>
                <span className="text-gray-500">$:</span>
            </div>
            <div className="flex-col flex gap-1">
                <button className="bg-green-500 w-[80px] rounded text-white "> đã giao </button>
                <button className="  bg-red-500 w-[80px] rounded text-white" >hủy</button>
            </div>
        </div>
    );
}

export default CardNotifi;