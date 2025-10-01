// Validación para cadenas de texto con longitud mínima y máxima
export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength) {
        return false;
    } else if (maxLength && str.length > maxLength) {
        return false;
    }
    
    return true;
};

// Validación para email usando expresión regular
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validación para password con requisitos específicos
export const validatePassword = (password, minLength, maxLength, requireUppercase, requireLowercase) => {
    if (minLength && password.length < minLength) {
        return false;
    }
    
    if (maxLength && password.length > maxLength) {
        return false;
    }
    
    if (requireUppercase && !/[A-Z]/.test(password)) {
        return false;
    }
    
    if (requireLowercase && !/[a-z]/.test(password)) {
        return false;
    }
    
    return true;
};