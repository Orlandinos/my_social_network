// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "./profileEditor.scss";

// const ProfileEditor = () => {
//   const token = useSelector((state) => state.auth.token);
  
//   const [username, setUsername] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [age, setAge] = useState();
//   const [bio, setBio] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [balance, setBalance] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const formData = { username, avatar, age, bio, fullName, balance };

//     try {
//       await axios.put("http://49.13.31.246:9191/me", formData, {
//         headers: { 
//           "Content-Type": "application/json",
//           "x-access-token": token,
//         },
//       });
//       setShowModal(true);
//     } catch (err) {
//       setError("Ошибка при обновлении профиля");
//     }
//   };

//   return (
//     <div className="profile-editor">
//       <h2>Редактирование профиля</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Имя пользователя</label>
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

//         <label>Полное имя</label>
//         <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        
//         <label>Аватар (URL)</label>
//         <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
        
//         <label>Возраст</label>
//         <input type="number" value={age} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} required />
        
//         <label>Биография</label>
//         <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        
        
//         {/* <label>Баланс</label>
//         <input type="number" value={balance} onChange={(e) => setBalance(e.target.value === "" ? "" : Number(e.target.value))} required /> */}
        
//         {error && <p className="error">{error}</p>}
        
//         <button type="submit">Сохранить изменения</button>
//       </form>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <p>Редактирование подтверждено</p>
//             <button className="close-button" onClick={() => setShowModal(false)}>✖</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileEditor;


import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./profileEditor.scss";

const ProfileEditor = () => {
  const token = useSelector((state) => state.auth.token);
  
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = { username, avatar, age, bio, fullName, balance };

    try {
      await axios.put("http://49.13.31.246:9191/me", formData, {
        headers: { 
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      
      setShowModal(true);

      // Очищаем все поля формы после успешного обновления
      setUsername("");
      setAvatar("");
      setAge("");
      setBio("");
      setFullName("");
      setBalance(0);
    } catch (err) {
      setError("Ошибка при обновлении профиля");
    }
  };

  return (
    <div className="profile-editor">
      <h2>Редактирование профиля</h2>
      <form onSubmit={handleSubmit}>
        <label>Имя пользователя</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Полное имя</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        
        <label>Аватар (URL)</label>
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />
        
        <label>Возраст</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} required />
        
        <label>Биография</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">Сохранить изменения</button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Редактирование подтверждено</p>
            <button className="close-button" onClick={() => setShowModal(false)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;

