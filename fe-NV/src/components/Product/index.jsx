import Cafe from "../../../public/cup_coffee.jpg"


function Product() {
    return (
        <div className="flex justify-between px-5 shadow py-2">
            <img
                className="w-[100px]"
                src={Cafe}
                alt="" />
            <div className="text-gray-500">
                <p>giá:10000</p>
                <span>số lượng:1</span>
            </div>
        </div>
    );
}

export default Product;