import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/particles/Header";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  // const [captchaToken, setCaptchaToken] = useState("");
  const watchPassword = watch("password", "");
  const watchRepeatPassword = watch("repeatPassword", "");
  const { signupContext } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const errors = {};

    // Validar nombre
    if (!validator.isLength(data.name, { max: 80 })) {
      errors.name = "El nombre debe tener máximo 80 caracteres";
    }
    if (!validator.isAlpha(data.name)) {
      errors.name = "El nombre solo puede contener letras";
    }
    // Validar apellido
    if (!validator.isLength(data.lastname, { max: 80 })) {
      errors.lastname = "El apellido debe tener máximo 80 caracteres";
    }
    if (!validator.isAlpha(data.lastname)) {
      errors.lastname = "El apellido solo puede contener letras";
    }

    // Validar nombre de usuario
    if (!validator.isLength(data.username, { min: 3, max: 20 })) {
      errors.username =
        "El nombre de usuario debe tener entre 3 y 20 caracteres";
    }
    if (!validator.isAlphanumeric(data.username)) {
      errors.username =
        "El nombre de usuario solo puede contener letras y números";
    }

    // Validar email
    if (!validator.isEmail(data.email)) {
      errors.email = "Formato de email inválido";
    }
    if (!validator.isLength(data.email, { max: 100 })) {
      errors.email = "El email debe tener máximo 100 caracteres";
    }
    if (validator.isEmpty(data.email.trim())) {
      errors.email = "El email es requerido";
    } else {
      data.email = data.email.toLowerCase(); // Convertir email a minúsculas
    }

    // Validar contraseña
    if (!validator.isLength(data.password, { max: 100 })) {
      errors.password = "La contraseña debe tener máximo 100 caracteres";
    }
    if (validator.isEmpty(data.password.trim())) {
      errors.password = "La contraseña es requerida";
    }
    if (data.password !== watchRepeatPassword) {
      errors.repeatPassword = "Las contraseñas no coinciden";
    }

    // Validar teléfono móvil
    if (!validator.isMobilePhone(data.mobile, "any", { strictMode: false })) {
      errors.mobile = "Número de teléfono móvil inválido";
    }

    return errors;
  };
  // const handleCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };

  const onSubmitHandler = async (data) => {
    const formData = { ...data };
    console.log("Formulario enviado:", formData);

    // Validar el formulario
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.error("Errores de validación:", errors);
      // Construir el mensaje para mostrar en la alerta
      const alertMessage = `Has cometido el siguiente error en el formulario: ❌ ${errors}`;
      alert(alertMessage);
      return;
    }

    delete formData.repeatPassword; // Eliminamos repeatPassword, ya que no es necesario enviarlo

    // if (captchaToken === "") {
    //   alert("Por favor, completa la verificación reCAPTCHA.");
    //   return;
    // }

    try {
      const response = await signupContext(formData);
      console.log(
        "Respuesta de la creación de cuenta AQUI BUSCO EL BUG:",
        response
      );

      if (response.ok) {
        // Redirigir al usuario después de una creación exitosa
        navigate("/user-profile");
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
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <form
          className="flex flex-col gap-4 w-80"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-light text-sm">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              {...register("name", { required: "Nombre requerido" })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.name && (
              <div style={{ color: "red" }}>{errors.name.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-light text-sm">
              Apellido:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Doe"
              {...register("lastname", { required: "Apellido requerido" })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.lastname && (
              <div style={{ color: "red" }}>{errors.lastname.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-light text-sm">
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="john_doe"
              {...register("username", {
                required: "Nombre de usuario requerido",
              })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.username && (
              <div style={{ color: "red" }}>{errors.username.message}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-light text-sm">
              Tu email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="ejemplo@holamundo.com"
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
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
              {...register("password", {
                required: "Contraseña requerida",
                validate: (value) =>
                  value === watchPassword || "Las contraseñas no coinciden",
              })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
          </div>
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password.message}</div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="repeatPassword" className="font-light text-sm">
              Repite tu contraseña:
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="******"
              {...register("repeatPassword", {
                required: "Repite tu contraseña",
                validate: (value) =>
                  value === watchRepeatPassword ||
                  "Las contraseñas no coinciden",
              })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.repeatPassword && (
              <div style={{ color: "red" }}>
                {errors.repeatPassword.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="font-light text-sm">
              Número de teléfono móvil:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="1234567890"
              {...register("mobile", { required: "Número de móvil requerido" })}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.mobile && (
              <div style={{ color: "red" }}>{errors.mobile.message}</div>
            )}
          </div>
          {/* <ReCAPTCHA
        sitekey="6LcPH8EpAAAAAFZ9ZDbmwsM4GXzWVRHl5U_xjdPb"
        onChange={handleaChange}
      /> */}
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>
        <div className="flex flex-col w-80">
          <Link to="/login" className="text-black">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>
    </>
  );
}

export { SignUp };
