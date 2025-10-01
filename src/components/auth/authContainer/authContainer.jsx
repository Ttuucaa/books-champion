import { useState, useRef } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../library/notifications/notifications.js";

const AuthContainer = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        auth: false
    });

    const navigate = useNavigate();

    const login = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Validaciones
        if (!email.length) {
            setErrors(prev => ({...prev, email: true}));
            return;
        }

        if (password.length < 7) {
            setErrors(prev => ({...prev, password: true}));
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const token = await response.json();
                localStorage.setItem('token', token);
                localStorage.setItem('userEmail', email);
                successToast("¡Inicio de sesión exitoso!");
                onLogin();
                navigate("/dashboard");
            } else {
                errorToast("Email o contraseña incorrectos");
                setErrors(prev => ({...prev, auth: true}));
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors(prev => ({...prev, auth: true}));
        }
    };

    const register = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Validaciones
        if (!name.length) {
            setErrors(prev => ({...prev, name: true}));
            return;
        }

        if (!email.length) {
            setErrors(prev => ({...prev, email: true}));
            return;
        }

        if (password.length < 7) {
            setErrors(prev => ({...prev, password: true}));
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const userId = await response.json();
                console.log("Usuario creado exitosamente!");
                
                // Limpiar formulario
                nameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                
                // Cambiar a modo login
                setIsLogin(true);
                
                // Notificación de éxito
                successToast("Usuario creado exitosamente!");
                
            } else {
                errorToast("Error al registrar usuario");
                setErrors(prev => ({...prev, auth: true}));
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors(prev => ({...prev, auth: true}));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({ name: false, email: false, password: false, auth: false });
        
        if (isLogin) {
            login();
        } else {
            register();
        }
    };

    const handleLogout = () => {
        // Eliminar token del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        
        // Notificación de logout
        successToast("Sesión cerrada exitosamente!");
        
        // Navegar al login
        setIsLogin(true);
        navigate("/login");
    };

    const handleRegisterClick = () => {
        setIsLogin(false);
        setErrors({ name: false, email: false, password: false, auth: false });
    };

    const handleLoginClick = () => {
        setIsLogin(true);
        setErrors({ name: false, email: false, password: false, auth: false });
    };

    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Row className="mb-2">
                        <h5>¡Bienvenidos a Books Champion!</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <FormGroup className="mb-4">
                                <Form.Control
                                    type="text"
                                    required={!isLogin}
                                    ref={nameRef}
                                    placeholder="Ingresar nombre de usuario"
                                    className={errors.name ? "border border-danger" : ""}
                                />
                            </FormGroup>
                        )}
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
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                placeholder="Ingresar contraseña"
                                className={errors.password ? "border border-danger" : ""}
                            />
                        </FormGroup>
                        <Row>
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button 
                                    variant={isLogin ? "secondary" : "primary"} 
                                    type="submit"
                                >
                                    {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            
            {!isLogin && (
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center">
                        <p>
                            ¿Aún no tienes cuenta?{" "}
                            <Button variant="link" onClick={handleLoginClick}>
                                Iniciar sesión
                            </Button>
                        </p>
                    </Col>
                </Row>
            )}

            {isLogin && (
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center">
                        <p>
                            ¿Aún no tienes cuenta?{" "}
                            <Button variant="link" onClick={handleRegisterClick}>
                                Registrarse
                            </Button>
                        </p>
                    </Col>
                </Row>
            )}

            {(errors.name || errors.email || errors.password || errors.auth) && (
                <div className="alert alert-danger mt-3">
                    {errors.name && <p>El nombre es obligatorio</p>}
                    {errors.email && <p>El email es obligatorio</p>}
                    {errors.password && <p>La contraseña debe tener al menos 7 caracteres</p>}
                    {errors.auth && <p>Error en la autenticación. Verifica tus datos.</p>}
                </div>
            )}
        </>
    );
};

export default AuthContainer;
