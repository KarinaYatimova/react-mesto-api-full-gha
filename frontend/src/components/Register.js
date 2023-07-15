import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formValue.email, formValue.password);
  };

  return (
    <div className="register">
      <p className="register__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          className="register__input"
          minLength="2"
          maxLength="40"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="register__input"
          minLength="2"
          maxLength="40"
          required
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="register__button"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
