export default class Validations {
    static checkEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email,
            ))
        {
          return true;
        }
return false;
    }

    static minLength(name, minLength){
        if (name.length < minLength) {
            return false;
        }
        return true;
    }
}