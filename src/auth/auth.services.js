import { validateString, validateEmail, validatePassword } from "../helpers/validations.js";
import { errorToast } from "../components/library/notifications/notifications.js";

export const handleLogin = (event) => {
    event.preventDefault();
    
    if (!emailRef.current.value.length || !validateEmail(emailRef.current.value)) {
        errorToast("Email inválido");
        emailRef.current.focus();
        return;
    }
    
    else if (!passwordRef.current.value.length || !validatePassword(passwordRef.current.value, 7, null, true, true)) {
        errorToast("Contraseña inválida");
        passwordRef.current.focus();
        return;
    }
    
    setErrors({ email: false, password: false });
    onLogin();
    
    fetch("http://localhost:3000/auth/login", {
        // ... resto del código del fetch
    });
};