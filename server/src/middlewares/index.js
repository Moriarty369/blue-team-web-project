// -_- exporta todos los middlewares desde aqui para ser utilizados en otros archivos
import * as authJWT from "./authJWT.js";
import * as verifySignup  from './signupValidator.js';
// import * as verifyContact from './contactValidator.js';

// export { authJWT, verifySignup, verifyContact  };
export { authJWT, verifySignup };
