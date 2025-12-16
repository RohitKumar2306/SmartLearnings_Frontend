import React, { useContext, useState } from 'react';
import "./SignUpPage.css"; // reuse the same auth styles
import SocialLoginButtons from "../../components/LoginButtons/LoginButtons.tsx";
import SignUp, {SignUpFormValues} from '../../components/SignUp/SignUp.tsx';
import authSideImg from '../../assets/authside.jpeg';
import { AppContext } from '../../context/AppContext.tsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../../service/AuthService.ts';

const SignUpPage: React.FC = () => {

  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSignUp = async (values: SignUpFormValues) => {
    // this is triggered by the form component
    setServerError(null);

    setLoading(true);
    try {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago";

      const response = await register({
        name: values.fullName,
        email: values.email,
        password: values.password,
        timezone,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Account created successfully");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        setAuthData(response.data.token, response.data.role);
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      const msg =
        error?.response?.data?.message ||
        "Unable to create account. Please try again later.";
      setServerError(msg);
      toast.error("Unable to create account. Please try again later.");
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
                {/* Left side: brand panel */}
                <div className="col-md-5 d-none d-md-flex">
                  <img src={authSideImg} className="side-image" alt="side" />
                </div>

                {/* Right side: sign-up form */}
                <div className="col-md-7">
                  <div className="ls-auth-main p-4 p-md-5">
                    <div className="mb-3">
                      <h1 className="ls-auth-title mb-1">Create your account</h1>
                      <p className="ls-auth-subtitle mb-0">
                        Start your micro-learning journey in a few steps.
                      </p>
                    </div>

                    <SignUp
                      onSubmit={handleSignUp}
                      loading={loading}
                      serverError={serverError}
                    />

                    <SocialLoginButtons />

                    <p className="ls-auth-footer mt-3 mb-0">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0 ls-auth-link"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
                {/* end right */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;