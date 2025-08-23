import {Button} from "react-bootstrap";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackLoginHandler = () => {
        navigate("/login");
    };
    return (
        <div className="text-center mt-5">
            <h1>Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <Button onClick={goBackLoginHandler} variant="primary">
                Volver al inicio de sesión
            </Button>
        </div>
    );
};

export default NotFound;