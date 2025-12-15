import React, { useState } from "react";

export interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface SignUpFormProps {
  onSubmit?: (values: SignUpFormValues) => void;
}

const SignUp: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<SignUpFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!values.acceptTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log("Sign up form submit:", values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ls-signin-form">
      {/* Full name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label ls-form-label">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          className="form-control ls-form-control"
          placeholder="Rohit Kumar"
          value={values.fullName}
          onChange={handleChange}
          required
        />
      </div>

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
      <div className="mb-3">
        <label htmlFor="password" className="form-label ls-form-label">
          Password
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

      {/* Confirm password */}
      <div className="mb-2">
        <label htmlFor="confirmPassword" className="form-label ls-form-label">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          className="form-control ls-form-control"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Terms */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="form-check">
          <input
            id="acceptTerms"
            className="form-check-input"
            type="checkbox"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
          />
          <label
            className="form-check-label ls-form-label-sm"
            htmlFor="acceptTerms"
          >
            I agree to the{" "}
            <button
              type="button"
              className="btn btn-link p-0 ls-auth-link align-baseline"
            >
              Terms &amp; Privacy
            </button>
          </label>
        </div>
      </div>

      {error && (
        <p className="ls-error-text mb-2">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-100 ls-btn-primary"
      >
        Create account
      </button>
    </form>
  );
};

export default SignUp;