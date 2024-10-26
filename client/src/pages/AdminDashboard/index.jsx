import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/particles/Header";
import MapChart from "../../components/molecules/Charts/MapChart.jsx";
import { LineChart } from "../../components/molecules/Charts/LineChart.jsx";

const API_BASE_URL = "http://localhost:4000/api";
const ITEMS_PER_PAGE = 4;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const [totalPagesUsers, setTotalPagesUsers] = useState(1);
  const [totalPagesLogs, setTotalPagesLogs] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [userModal, setUserModal] = useState(null);
  const [IPBlocked, setIPBlocked] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    roles: [],
  });

  // -_- ---------------- Función para obtener datos de usuarios y registros de seguridad ---------------- -_-
  const fetchData = async () => {
    const { token } = JSON.parse(localStorage.getItem("adminToken"));

    if (token) {
      try {
        const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
          headers: {
            "x-access-token": token,
          },
        });

        const logsResponse = await axios.get(`${API_BASE_URL}/security/logs`, {
          headers: {
            "x-access-token": token,
          },
        });

        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
          setVisibleUsers(usersResponse.data.slice(0, ITEMS_PER_PAGE));
          setTotalPagesUsers(
            Math.ceil(usersResponse.data.length / ITEMS_PER_PAGE)
          );
        } else {
          console.error("La respuesta no contiene un array de usuarios");
        }

        setSecurityLogs(logsResponse.data);
        setVisibleLogs(logsResponse.data.slice(0, ITEMS_PER_PAGE));
        setTotalPagesLogs(Math.ceil(logsResponse.data.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    } else {
      console.error(
        "No se encontró el token de autorización en el localStorage"
      );
    }
  };
  // Ejecutar solo una vez al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  const openModalForCreate = () => {
    setAction("create");
    setUserData({
      name: "",
      lastname: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
      roles: [],
    });
    setShowModal(true);
  };

  const openModalForEdit = (user) => {
    setAction("edit");
    setUserData(user);
    setShowModal(true);
  };

  const openModalUserView = (user) => {
    setAction("view");
    setUserData(user);
    setUserModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // -_- ---------------- Función para crear un nuevo usuario ---------------- -_-
  const createUser = async () => {
    try {
      // Mostrar un alert de confirmación antes de crear un nuevo usuario
      const confirmCreate = window.confirm(
        "¿Seguro que quieres crear un nuevo usuario?"
      );

      if (confirmCreate) {
        // lógica para abrir un modal o redirigir a una página de creación de usuarios
        console.log("Crear nuevo usuario");
        alert("Crear nuevo usuario");
        openModalForCreate();
      } else {
        console.log("Creación cancelada");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // -_- ---------------- Función para editar un usuario existente ---------------- -_-
  const editUser = async (userId) => {
    try {
      // Aquí puedes implementar la lógica para abrir un modal o redirigir a una página de edición de usuarios
      console.log("Editar usuario con ID:", userId);
      alert(`Editar usuario con ID: ${userId}`);
      openModalForEdit();
      setUserData(users.find((user) => user._id === userId));
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  // -_- ---------------- Función para eliminar un usuario ---------------- -_-
  // -_- ---------------- Función para eliminar un usuario ---------------- -_-
  const deleteUser = async (userId) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("adminToken"));

      // Mostrar un alert de confirmación antes de eliminar el usuario
      const confirmDelete = window.confirm(
        `¿Seguro que quieres eliminar usuario con ID: ${userId}?`
      );

      if (confirmDelete) {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
          headers: {
            "x-access-token": token,
          },
        });
        console.log("Usuario eliminado:", response.data);
        alert("Usuario eliminado!!!");
        fetchData(); // Actualiza los datos después de eliminar el usuario
      } else {
        console.log("Eliminación cancelada");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
  // -_- ---------------- Funcines del CRUD ---------------- -_-
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    const { token } = JSON.parse(localStorage.getItem("adminToken"));
    console.log("TOKEN CRUD", token);
    e.preventDefault();
    try {
      if (action === "create") {
        const response = await axios.post(`${API_BASE_URL}/users`, userData, {
          headers: {
            "x-access-token": token,
          },
        });
        console.log("Nuevo usuario creado:", response.data);
        alert("Nuevo usuario creado!!!");
      } else if (action === "edit") {
        const response = await axios.put(
          `${API_BASE_URL}/users/${userData._id}`,
          userData,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        console.log("Usuario editado:", response.data);
        alert("Usuario editado!!!");
      } else if (action === "delete") {
        const response = await axios.delete(
          `${API_BASE_URL}/users/${userData._id}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        console.log("Usuario eliminado:", response.data);
        alert("Usuario eliminado!!!");
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error al realizar la operación:", error);
    }
  };

  // -_- ---------------- Funciones de paginación ---------------- -_-
  const handleNextPageUsers = () => {
    setCurrentPageUsers(currentPageUsers + 1);
    const startIndex = (currentPageUsers + 1 - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleUsers(users.slice(startIndex, endIndex));
  };

  const handlePrevPageUsers = () => {
    setCurrentPageUsers(currentPageUsers - 1);
    const startIndex = (currentPageUsers - 1 - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleUsers(users.slice(startIndex, endIndex));
  };

  const handleNextPageLogs = () => {
    setCurrentPageLogs(currentPageLogs + 1);
    const startIndex = (currentPageLogs + 1 - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleLogs(securityLogs.slice(startIndex, endIndex));
  };

  const handlePrevPageLogs = () => {
    setCurrentPageLogs(currentPageLogs - 1);
    const startIndex = (currentPageLogs - 1 - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleLogs(securityLogs.slice(startIndex, endIndex));
  };

  // -_- ---------------- Funciones para bloquear y desbloquear IPs ---------------- -_- //
  const handleBlockIP = async (logId) => {
    try {
      // Realiza una solicitud PUT a la API para bloquear el registro con el ID logId
      await axios.put(`${API_BASE_URL}/security/logs/block/${logId}`, { isBlocked: true });

      // Actualiza el estado local para reflejar el cambio
      setIPBlocked(true);
      fetchData()
    } catch (error) {
      console.error("Error al bloquear el registro:", error);
    }
  };

  const handleUnlockIP = async (logId) => {
    try {
      // Realiza una solicitud PUT a la API para desbloquear el registro con el ID logId
      await axios.put(`${API_BASE_URL}/security/logs/unlock/${logId}`, { isBlocked: false });

      // Actualiza el estado local para reflejar el cambio
      setIPBlocked(false);
      fetchData()
    } catch (error) {
      console.error("Error al desbloquear el registro:", error);
    }
  };

  // -_- ---------------- FINAL DE Función para desbloquear una IP ---------------- -_- //
  return (
    <>
      <Header />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

      {/* // -_- ---------------------- REGISTROS DE USUARIOS ------------------------ -_- */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Usuarios logueados</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Móvil</th>
                <th className="px-4 py-2">Contraseña</th>
                <th className="px-4 py-2">Role ID</th>
                <th className="px-4 py-2" colSpan="3">
                  Acciones CRUD
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2 max-w-[30px] overflow-x-auto">
                    {user._id}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.lastname}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2 max-w-[30px] overflow-x-auto">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2">{user.mobile}</td>
                  <td className="border px-4 py-2  max-w-[10px] overflow-x-auto">
                    {user.password}
                  </td>
                  <td className="border px-4 py-2 max-w-[10px] overflow-x-auto">
                    {user.roles}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-900 text-white py-1 px-2 rounded ml-2"
                      onClick={() => openModalUserView(user)}
                    >
                      Ver
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-600 hover:bg-yellow-900 text-white py-1 px-2 rounded ml-2"
                      onClick={() => editUser(user._id)}
                    >
                      Editar
                    </button>
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-600 hover:bg-red-900 text-white py-1 px-2 rounded ml-2"
                      onClick={() => deleteUser(user._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex px-4 py-4 justify-center ">
            <button
              className="bg-green-600 hover:bg-green-900 text-white py-1 px-2 rounded ml-2"
              onClick={() => createUser()}
            >
              Crear Usuario
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevPageUsers}
              disabled={currentPageUsers === 1}
            >
              Anterior
            </button>
            <span className="text-gray-700 mx-20">
              Página {currentPageUsers} de {totalPagesUsers}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPageUsers}
              disabled={currentPageUsers === totalPagesUsers}
            >
              Siguiente
            </button>
          </div>
        </div>
{/* // -_- ---------------------- REGISTROS DE SEGURIDAD ------------------------ -_- */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Registros de seguridad</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Tipo de Evento</th>
                <th className="px-4 py-2">IP</th>
                <th className="px-4 py-2">Ruta de solicitud</th>
                <th className="px-4 py-2">Agente de usuario</th>
                <th className="px-4 py-2">Método HTTP</th>
                <th className="px-4 py-2">Estado HTTP</th>
                <th className="px-4 py-2">Bloqueado</th>
              </tr>
            </thead>
            <tbody>
              {visibleLogs.map((log) => (
                <tr key={log._id} className={log.isBlocked ? "bg-red-200" : ""}>
                  <td className="border px-4 py-2">{log._id}</td>
                  <td className="border px-4 py-2">{log.timestamp}</td>
                  <td className="border px-4 py-2">{log.eventType}</td>
                  <td className="border px-4 py-2">{log.clientIP}</td>
                  <td className="border px-4 py-2">{log.requestPath}</td>
                  <td className="border px-4 py-2">{log.userAgent}</td>
                  <td className="border px-4 py-2">{log.httpMethod}</td>
                  <td className="border px-4 py-2">{log.httpStatus}</td>
                  <td className="border px-4 py-2">
                    {log.isBlocked ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleUnlockIP(log._id)}
                      >
                        Desbloquear IP
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleBlockIP(log._id)}
                      >
                        Boloquear IP
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevPageLogs}
              disabled={currentPageLogs === 1}
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPageLogs} de {totalPagesLogs}
            </span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextPageLogs}
              disabled={currentPageLogs === totalPagesLogs}
            >
              Siguiente
            </button>
          </div>
        </div>

        <div>
          {/* -_- ---------------------- MODAL UPDATE-CREATE ------------------------ -_- */}
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                {/* Fondo oscuro */}
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                {/* Contenedor del modal */}
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
                  {/* Cabecera del modal */}
                  <div className="bg-gray-800 px-4 py-2">
                    <h3 className="text-lg font-medium text-white">
                      {action === "create" ? "Crear Usuario" : "Editar Usuario"}
                    </h3>
                  </div>

                  {/* Cuerpo del modal */}
                  <div className="bg-gray-100 px-4 py-6">
                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                      {/* Nombre */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Nombre
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Nombre"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Apellido */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="lastname"
                        >
                          Apellido
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="lastname"
                          type="text"
                          placeholder="Apellido"
                          name="lastname"
                          value={userData.lastname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Nombre de usuario
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Nombre de usuario"
                          name="username"
                          value={userData.username}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="lastname"
                          type="email"
                          placeholder="ejemplo@ejemplo.com"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="mobile"
                        >
                          Móvil
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="mobile"
                          type="text"
                          placeholder="Teléfono móvil"
                          name="mobile"
                          value={userData.mobile}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="password"
                        >
                          Contraseña
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                          type="text"
                          placeholder="**********"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Botón de submit */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          {action === "create" ? "Crear" : "Guardar Cambios"}
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* -_- ---------------------- MODAL USUARIO UNICO ------------------------ -_- */}
          {userModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                {/* Fondo oscuro */}
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                {/* Contenedor del modal */}
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
                  {/* Cabecera del modal */}
                  <div className="bg-gray-800 px-4 py-2">
                    <h3 className="text-lg font-medium text-white">
                      Vista Detallada de Usuario
                    </h3>
                  </div>

                  {/* Cuerpo del modal */}
                  <div className="bg-gray-100 px-4 py-6">
                    {/* Información detallada del usuario */}
                    <div className="mb-4">
                      <p className="text-gray-700 font-bold">ID:</p>
                      <p>{userData._id}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700 font-bold">Nombre:</p>
                      <p>{userData.name}</p>
                    </div>
                    {/* Agregar más campos según sea necesario */}

                    {/* Botón para cerrar el modal */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => setUserModal(false)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <MapChart />
        <LineChart />
      </div>
    </>
  );
};

export { AdminDashboard };
