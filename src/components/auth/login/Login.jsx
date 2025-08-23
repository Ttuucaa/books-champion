import { useState, useRef } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
 
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email.length) {
            setErrors(prev => ({...prev, email: true }));
            return;
        }

        if (password.length < 7) {
            setErrors(prev => ({...prev, password: true }));
            return;
        }

        setErrors({ email: false, password: false });
        onLogin();
        navigate("/dashboard");
    }

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
                                className={errors.email ? "border border-danger" : ""}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                required
                                ref={passwordRef}
                                autoComplete="current-password"
                                placeholder="Ingresar contraseña"
                                className={errors.password ? "border border-danger" : ""}
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
