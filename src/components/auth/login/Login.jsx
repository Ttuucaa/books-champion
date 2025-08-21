import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useRef } from "react";

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        if (!emailRef.current.value.length) {
            setErrors({...errors, email: true });
            alert("El email es obligatorio");
            emailRef.current.focus();
            return;
        }
        else if (!password.length || password.length < 7) {
            setErrors({...errors, password: true });
            alert("La contraseña es obligatoria y debe tener al menos 7 caracteres");
            passwordRef.current.focus();    
            return;
        }
        setErrors({ email: false, password: false });
        alert(`El email ingresado es: ${emailRef.current.value} y el password es ${passwordRef.current.value}`);
       
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`El email ingresado es: ${email} y el password es ${password}`)
    }

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });
    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Row className="mb-2">
                        <h5>¡Bienvenidos a Books Champion!</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="email"
                                required
                                ref={emailRef}
                                placeholder="Ingresar email"
                                onChange={handleEmailChange}
                                value={email}
                                className={errors.email && "border border-danger"}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                required
                                ref={passwordRef}
                                autoComplete="current-password"
                                placeholder="Ingresar contraseña"
                                onChange={handlePasswordChange}
                                value={password}
                                className={errors.password && "border border-danger"}
                            />
                        </FormGroup>
                        <Row>
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button variant="secondary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            {(errors.email || errors.password) && (
                <div className="alert alert-danger mt-3">
                    {errors.email && <p>El email es obligatorio</p>}
                    {errors.password && <p>La contraseña es obligatoria y debe tener al menos 7 caracteres</p>}
                </div>
            )}
        </>
    );
};


export default Login;
