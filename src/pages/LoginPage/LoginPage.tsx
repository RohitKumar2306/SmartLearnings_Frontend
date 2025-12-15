import React, { useContext, useState } from 'react';
import "./LoginPage.css";
import Login, { LogInFormValues } from '../../components/Login/Login.tsx';
import SocialLoginButtons from "../../components/LoginButtons/LoginButtons.tsx";
import authSideImg from "../../assets/authside.jpeg"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.tsx';
import { login } from '../../service/AuthService.ts';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignIn = async (values: LogInFormValues) => {
    setLoading(true);
    setFormError(null);
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const data = response.data;
        // same pattern as your previous project
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // (optional) store user info if you want
        localStorage.setItem(
          "ls_user",
          JSON.stringify({
            email: data.email,
            name: data.name,
            userId: data.userId,
            authorities: data.authorities,
          })
        );

        setAuthData(data.token, data.role);
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login error", err);
      const message =
        err?.response?.data?.message ||
        "Email/Password invalid. Please try again.";
      setFormError(message);
      toast.error("Email/Password invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-auth-page">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="card ls-auth-card overflow-hidden">
              <div className="row g-0">
                <div className="col-md-5 d-none d-md-flex">
                  <img src={authSideImg} className="side-image" alt="side-image"/>
                </div>

                <div className="col-md-7">
                  <div className="ls-auth-main p-4 p-md-5">
                    <div className="mb-3 text-center text-md-start">
                      <h1 className="ls-auth-title mb-1">Sign in</h1>
                      <p className="ls-auth-subtitle mb-0">
                        Sign in to your LearnSphere account.
                      </p>
                    </div>

                    <Login
                      onSubmit={handleSignIn}
                      loading={loading}
                      error={formError}
                    />

                    <SocialLoginButtons />

                    <p className="ls-auth-footer mt-3 mb-0">
                      Don&apos;t have an account?{" "}
                      <button type="button" className="btn btn-link p-0 ls-auth-link">
                        Create one
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
