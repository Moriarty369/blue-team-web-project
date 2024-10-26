import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Header from "../../components/particles/Header";
import { useNavigate } from "react-router-dom";
// *-_-* ------------- Hay que proteger la apikey de reCAPTCHA ------------- *-_-* //

function AdminSignIn() {
  const [botField, setBotField] = useState("");

  // -_- Estado para almacenar los datos del formulario
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const [captchaToken, setCaptchaToken] = useState("");
  const { adminSigninContext } = useAuth();
  const navigate = useNavigate();


  // -_- ------------- Función para validar el formulario ------------- -_-
  const validateForm = (data) => {
    const errors = {};

    if (validator.isEmpty(data.email.trim())) {
      errors.email = "El email es requerido";
    } else if (!validator.isEmail(data.email)) {
      errors.email = "Formato de email inválido";
    } else if (!validator.isLength(data.email, { max: 100 })) {
      errors.email = "El email debe tener máximo 100 caracteres";
    }

    if (validator.isEmpty(data.password.trim())) {
      errors.password = "La contraseña es requerida";
    } else if (!validator.isLength(data.password, { max: 100 })) {
      errors.password = "La contraseña debe tener máximo 100 caracteres";
    }

    return errors;
  };
  // -_- ------------- Función para manejar el reCAPTCHA ------------- -_-
  // const handleCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };

  // -_- ------------- Función para manejar los cambios en los campos del formulario ------------- -_-



  // -_- ------------- Función para manejar el envío del formulario ------------- -_-
 
  const onSubmitHandler = async (data) => {
    const formData = { ...data };
    console.log("Formulario enviado:", formData);
    // Validar el formulario
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.error("Errores de validación:", errors);

      return;
    }
    // if (captchaToken === "") {
    //   alert("Por favor, completa la verificación reCAPTCHA.");
    //   return;
    // }
    try {
      const response = await adminSigninContext(formData);
      console.log("Respuesta del ADMIN LOGIN:", response);

      if (response.ok) {
        // Redirigir al usuario después de una creación exitosa
        navigate("/admin/dashboard");
      } else if (response.status === 400) {
        const responseData = await response.json();
        const { message } = responseData;
        console.error("Error en la creación de la cuenta:", message);
      } else {
        console.error(
          "Error en la creación de la cuenta. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de creación de cuenta:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-4 mt-10">
        <h1 className="font-medium text-xl text-center w-80 mb-6">
          Hola Administrador, Inicia Sesión!
        </h1>
        <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit(onSubmitHandler)}>
          
          {/* -_- ------------- Campo de entrada oculto para detectar bots ------------- -_- */}
          <input
            type="text"
            name="botField"
            placeholder="Eres un bot?"
            style={{
              display: "block",
              backgroundColor: "red",
            }}
            tabIndex="-1"
            autoComplete="off"
            {...register("botField")}
          />
          {errors.botField && (
            <div style={{ color: "red", margin: "auto" }}>
              {errors.botField.message}
            </div>
          )}
        <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-light text-sm">
              Tu email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="hi@helloworld.com"
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
              {...register("email")}
            />
            {errors.email && (
              <div style={{ color: "red" }}>{errors.email.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-light text-sm">
              Tu contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
              {...register("password")}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password.message}</div>
            )}
          </div>
          {/* *-_-* ---------- ReCAPTCHA ----------- *-_-* */}
          {/* <ReCAPTCHA
            sitekey="6LcPH8EpAAAAAFZ9ZDbmwsM4GXzWVRHl5U_xjdPb"
            onChange={handleCaptchaChange}
          /> */}
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            type="submit"
            onClick={handleSubmit}
          >
            Sudo Su!
          </button>
        </form>
        <div className="flex flex-col w-80 mb-40">
          <Link to="/register" className="text-black text-center">
            <span className="text-red-500">¿No Eres Administrador? </span>O no pudiste hackearnos, anda crea una
            cuenta e inténtalo como usuario 😏
          </Link>
        </div>
      </div>
    </>
  );
}

export { AdminSignIn };
