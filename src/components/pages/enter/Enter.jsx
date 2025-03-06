import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../../features/formSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../../features/enterSlice';
import './enter.scss';


export const useForm = () => {
  const dispatch = useDispatch();
  const isSignUpActive = useSelector((state) => state.form.isSignUpActive);

  const toggle = () => {
    dispatch(toggleForm());
  };

  return {
    isSignUpActive,
    toggle,
  };
};

const Enter = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Хук для регистрации (добавляем watch для проверки совпадения паролей)
  const {
    handleSubmit: handleSubmitRegister,
    register: registerRegister,
    formState: { errors: errorsRegister },
    watch,
  } = useReactHookForm();

  // Хук для входа
  const {
    handleSubmit: handleSubmitLogin,
    register: registerLogin,
    formState: { errors: errorsLogin },
  } = useReactHookForm();

  const { isSignUpActive, toggle } = useForm();

  // Регистрация
  const handleRegister = async (data) => {
    console.log("Регистрация, данные формы:", data);

    const payload = {
      username: data.username,
      password: data.password,
      confirm_password: data.confirm_password,
    };

    try {
      const response = await fetch('http://49.13.31.246:9191/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Регистрация прошла успешно! Теперь войдите.');
        toggle();
      } else {
        console.error("Ответ сервера:", result);
        alert(result.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка сети');
    }
  };

  // Вход
  const handleLogin = async (data) => {

    try {
      const response = await axios.post('http://49.13.31.246:9191/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (response.status === 200) {
        console.log("Токен с сервера:", result.token); // Лог токена с сервера

        // Диспатчим токен в Redux
        dispatch(setToken(result.token));

        // Переход на страницу профиля
        navigate('/profile');
      } else {
        console.error("Ответ сервера:", result);
        alert(result.message || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка сети');
    }
  };



  return (
    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmitRegister(handleRegister)}>
          <h1>Создать аккаунт</h1>
          <span>Введите данные для регистрации</span>
          <input
            type="text"
            placeholder="Имя пользователя"
            {...registerRegister("username", { required: "Это поле обязательно" })}
          />
          {errorsRegister.username && <span>{errorsRegister.username.message}</span>}

          <input
            type="password"
            placeholder="Пароль"
            {...registerRegister("password", {
              required: "Введите пароль",
              minLength: {
                value: 5,
                message: "Минимум 6 символов",
              },
            })}
          />
          {errorsRegister.password && <span>{errorsRegister.password.message}</span>}

          <input
            type="password"
            placeholder="Подтвердите пароль"
            {...registerRegister("confirm_password", {
              required: "Подтвердите пароль",
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
          />
          {errorsRegister.confirm_password && <span>{errorsRegister.confirm_password.message}</span>}

          <button type="submit">Регистрация</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmitLogin(handleLogin)}>
          <h1>Войти</h1>
          <span>Введите ваши данные</span>
          <input
            type="text"
            placeholder="Имя пользователя"
            {...registerLogin("username", { required: "Это поле обязательно" })}
          />
          {errorsLogin.username && <span>{errorsLogin.username.message}</span>}

          <input
            type="password"
            placeholder="Пароль"
            {...registerLogin("password", {
              required: "Введите пароль",
              minLength: {
                value: 5,
                message: "Пароль должен быть не менее 6 символов",
              },
            })}
          />
          {errorsLogin.password && <span>{errorsLogin.password.message}</span>}

          <button type="submit">Войти</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Добро пожаловать!</h1>
            <p>Чтобы продолжить, войдите с вашими личными данными</p>
            <button className="ghost" onClick={toggle}>
              Войти
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Привет, друг!</h1>
            <p>Введите ваши данные и начните путешествие с нами</p>
            <button className="ghost" onClick={toggle}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;
