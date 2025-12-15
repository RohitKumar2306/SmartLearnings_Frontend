import React, { useState } from "react";

export interface LogInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LogInProps {
  onSubmit?: (values: LogInFormValues) => void;
  loading?: boolean;
  error?: string | null;
}

const Login: React.FC<LogInProps> = ({ onSubmit, loading = true, error }) => {
  const [values, setValues] = useState<LogInFormValues>({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ls-signin-form">
      {error && <p className="ls-error-text mb-2">{error}</p>}

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label ls-form-label">
          Email address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control ls-form-control"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label
          htmlFor="password"
          className="form-label ls-form-label d-flex justify-content-between align-items-center"
        >
          <span>Password</span>
          <button type="button" className="btn btn-link p-0 ls-forgot-link">
            Forgot password?
          </button>
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="form-control ls-form-control"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Remember me */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check">
          <input
            id="rememberMe"
            className="form-check-input"
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            onChange={handleChange}
          />
          <label className="form-check-label ls-form-label-sm" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-100 ls-btn-primary"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default Login;