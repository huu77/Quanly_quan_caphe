import { NavLink } from "react-router-dom";
import Tabel1 from "../../../public/table(1).png"
// import Tabel2 from "../../../public/table(2).png"


function Card() {
    return (
        <div>
            <NavLink>
                <div className=" relative  w-[200px] ">
                    <img
                        className=" w-[200px]"
                        src={Tabel1} alt=""
                    />
                    <p className="absolute top-[40%] right-[45%]">B.1</p>

                </div>
            </NavLink>
        </div>

    );
}

export default Card;