import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { types as routes } from "../../reducers/routes.actions";

const Header = () => {
    const dispatch = useDispatch();
    const { type } = useSelector((state) => state.location);
    console.log(type)

    if (type === routes.USER) {

    }

    return (
        <div className="header-page">
            <h1>Sistema de Usuários</h1>
        </div>
    )
}

export default Header;