import React, { useState } from "react";

function Login({ handleLogin }) {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  };

  return (
    <div className="register">
      <p className="register__welcome">Вход</p>
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
        <button type="submit" className="register__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
