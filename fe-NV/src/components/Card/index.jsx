import { NavLink } from "react-router-dom";
import Tabel1 from "../../../public/table(1).png";
import { useGetAllTableQuery } from "../../apis/slices/Table";

function Card() {
    const { data } = useGetAllTableQuery();
    console.log("🚀 ~ Card ~ data:", data);

    return (
        <div className="grid grid-cols-2 gap-4">
            {data && data.data.map((item) => (
                <div key={item.id}>
                    <NavLink to={`/table/${item.id}`}>
                        <div className="relative w-[200px]">
                            <img
                                className="w-[200px]"
                                src={Tabel1}
                                alt={item.nameTable}
                            />
                            <p
                                className={`absolute top-[40%] right-[38%] ${item.status_table_id === 2 ? 'text-green-500' : 'text-rose-500'}`}
                            >
                                {item.nameTable}
                            </p>
                        </div>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default Card;
