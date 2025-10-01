import { useState, useRef } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../library/notifications/notifications.js";
import { validateString, validateEmail, validatePassword } from "../../../helpers/validations.js";

const Register = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    
    const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;
    
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        auth: false
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Validaciones usando helpers con errorToast
        if (!name.length || !validateString(name, 1, 13)) {
            errorToast("Nombre inválido - máximo 13 caracteres");
            nameRef.current.focus();
            return;
        }

        if (!email.length || !validateEmail(email)) {
            errorToast("Email inválido");
            emailRef.current.focus();
            return;
        }

        if (!password.length || !validatePassword(password, 7, null, true, true)) {
            errorToast("Contraseña inválida - mínimo 7 caracteres, una mayúscula y una minúscula");
            passwordRef.current.focus();
            return;
        }

        // Limpiar errores si todo está bien
        setErrors({ name: false, email: false, password: false, auth: false });

        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const userId = await response.json();
                successToast("Usuario creado exitosamente!");
                
                // Limpiar formulario
                nameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                
                // Navegar al login
                navigate("/login");
            } else {
                // Error en el registro - convertir respuesta a JSON
                const errorData = await response.json();
                throw new Error(errorData.message || "Algo ha salido mal");
            }
        } catch (error) {
            console.error('Error:', error);
            errorToast(error.message);
        }
    };

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
                                type="text"
                                required
                                ref={nameRef}
                                placeholder="Ingresar nombre de usuario"
                                className={errors.name ? "border border-danger" : ""}
                            />
                        </FormGroup>
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
                                autoComplete="new-password"
                                placeholder="Ingresar contraseña"
                                className={errors.password ? "border border-danger" : ""}
                            />
                        </FormGroup>
                        <Row>
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button variant="primary" type="submit">
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <p>
                        ¿Ya tenés cuenta?{" "}
                        <Button variant="link" onClick={() => navigate('/login')}>
                            Iniciar sesión
                        </Button>
                    </p>
                </Col>
            </Row>

            {(errors.name || errors.email || errors.password || errors.auth) && (
                <div className="alert alert-danger mt-3">
                    {errors.name && <p>El nombre es requerido y debe tener máximo 13 caracteres</p>}
                    {errors.email && <p>Debe ingresar un email válido</p>}
                    {errors.password && <p>La contraseña debe tener mínimo 7 caracteres, una mayúscula y una minúscula</p>}
                    {errors.auth && <p>Error en el registro. Verifica tus datos.</p>}
                </div>
            )}
        </>
    );
};

export default Register;