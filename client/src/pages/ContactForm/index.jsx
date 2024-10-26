import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import DOMPurify from "dompurify";
import Header from "../../components/particles/Header";

// *-_-* ------------- Hay que proteger la apikey de reCAPTCHA ------------- *-_-* //
// import dotenv from 'dotenv';
// dotenv.config();

function ContactForm() {
  // const [captchaToken, setCaptchaToken] = useState("");

  // -_- Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    botField: "", // Campo oculto para detectar bots
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // -_- ------------- Función para validar el formulario ------------- -_-
  const validateForm = () => {
    const errors = {};

    // Validación del campo name
    if (validator.isEmpty(formData.name.trim())) {
      errors.name = "El nombre es requerido";
    } else if (!validator.isLength(formData.name, { min: 2, max: 100 })) {
      errors.name = "El nombre debe tener entre 2 y 100 caracteres";
    }

    // Validación del campo email
    if (validator.isEmpty(formData.email.trim())) {
      errors.email = "El email es requerido";
    } else if (!validator.isEmail(formData.email)) {
      errors.email = "Formato de email inválido";
    } else if (!validator.isLength(formData.email, { max: 100 })) {
      errors.email = "El email debe tener máximo 100 caracteres";
    }

    // Validación del campo message
    if (validator.isEmpty(formData.message.trim())) {
      errors.message = "El mensaje es requerido";
    } else if (!validator.isLength(formData.message, { max: 400 })) {
      errors.message = "El mensaje debe tener máximo 400 caracteres";
    } else if (
      !validator.isAlpha(formData.message.replace(/_/g, ""), "es-ES", {
        ignore: " ",
      })
    ) {
      errors.message = "El mensaje solo puede contener letras y guiones bajos";
    }

    // Validación del campo subject
    if (validator.isEmpty(formData.subject.trim())) {
      errors.subject = "El asunto es requerido";
    } else if (!validator.isLength(formData.subject, { max: 120 })) {
      errors.subject = "El asunto debe tener máximo 120 caracteres";
    } else if (
      !validator.isAlpha(formData.subject.replace(/_/g, ""), "es-ES", {
        ignore: " ",
      })
    ) {
      errors.subject = "El asunto solo puede contener letras y guiones bajos";
    }

    // Validación del campo oculto para detectar bots
    if (!validator.isEmpty(formData.botField.trim())) {
      errors.botField = "¡Ops! Parece que eres un bot";
    }

    console.log("FormData:", formData);
    console.log("Errors:", errors);

    // Verifica si el formulario es válido
    setErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  };

  // -_- ------------- Función para manejar el reCAPTCHA ------------- -_-
  // const handleCaptchaChange = (token) => {
  //   setCaptchaToken(token);
  // };
  // -_- ------------- Función para manejar los cambios en los campos del formulario ------------- -_-
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: DOMPurify.sanitize(e.target.value),
    });
  };
  // -_- ------------- Función para manejar el envío del formulario ------------- -_-
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitizar los datos del formulario antes de enviarlos
    const sanitizedFormData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      message: DOMPurify.sanitize(formData.message),
    };

    // Validar el formulario
    const isValid = validateForm();
    if (!isValid) {
      setErrorMessage("Formulario inválido, corrija los errores");
      return;
    }

    // Verificar si el campo oculto para detectar bots está vacío
    if (formData.botField.trim() !== "") {
      setErrorMessage("¡Ops! Parece que eres un bot.");
      return;
    }

    // Verificar si el campo reCAPTCHA está lleno
    // if (captchaToken === "") {
    //   alert("Por favor, completa la verificación reCAPTCHA.");
    //   return;
    // }

    try {
      const API_BASE_URL = "http://localhost:400/api";
      // const API_BASE_URL = "https://fcommerce-server.onrender.com/api";
      // Enviar solicitud POST para autenticar al usuario y obtener el token
      const response = await fetch(`${API_BASE_URL}/contact/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sanitizedFormData.name,
          email: sanitizedFormData.email,
          message: sanitizedFormData.message,
        }),
      });

      // Resto del código para manejar la respuesta del servidor...
    } catch (error) {
      // Manejar errores de solicitud
      console.error("Error en la solicitud de contacto:", error);
      setErrorMessage(
        `Error en la solicitud de inicio de contacto: ${error.message}`
      );
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-4 mt-10">
        <h1 className="font-medium text-xl text-center w-80 mb-6">
          ¡Contáctanos!
        </h1>
        <form className="flex flex-col gap-4 w-80  ">
          {/* ref={form} */}
          {/* -_- ------------- Campo de entrada oculto para detectar bots ------------- -_- */}
          <input
            type="text"
            name="botField"
            placeholder="Eres un bot?"
            value={formData.botField}
            onChange={handleInputChange}
            style={{
              display: "block", // *-_-* OJO --------> cambiar a display: "none" <---------- *-_-*
              backgroundColor: "red",
            }}
            tabIndex="-1" // Evita que los bots se centren en este campo????
            autoComplete="off" // Evita el autocompletado del navegador?????
          />
          {/* -_- ------------- Fin de campo de entrada oculto para detectar bots ------------- *-_-* */}

          {errorMessage && (
            <div style={{ color: "red", margin: "auto" }}>{errorMessage}</div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-light text-sm">
              Tu nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="font-light text-sm">
              Asunto:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Asunto del mensaje"
              value={formData.subject}
              onChange={handleInputChange}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.subject && (
              <div style={{ color: "red" }}>{errors.subject}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-light text-sm">
              Tu email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@ejemplo.com"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-light text-sm">
                Tu mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={handleInputChange}
                style={{ resize: "none" }}
                className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
              />
              {errors.message && (
                <div style={{ color: "red" }}>{errors.message}</div>
              )}
            </div>
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
            Enviar mensaje
          </button>
        </form>
        <div className="my-2"></div>
        <div className="flex flex-col w-80">
          <Link to="/login" className="text-black">
            ¿No tienes una cuenta? Crear una cuenta
          </Link>
        </div>
      </div>
    </>
  );
}
// OJOOOOO FALTA: asunto:  subject: required,trim,lowercase, maxlength, validate con validator

export { ContactForm };
