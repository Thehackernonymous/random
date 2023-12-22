import Validations from "@/services/Validations";

export default class SignupValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let errors = [];

        if (!Validations.checkEmail(this.email)){
            errors['email'] = 'Invalid Email';
        }

        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'password should be of 6 characters';
        }
        return errors;


    }
    static getErrorMessageFromCode(errorCode) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'EMAIL_NOT_EXISTS':
                return 'Email Not Found';   
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            default:
                return 'Error occurred. Please try again'; 
        }
    }
}
