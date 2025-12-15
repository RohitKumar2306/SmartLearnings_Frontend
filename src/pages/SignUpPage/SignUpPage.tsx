import React from "react";
import "./SignUpPage.css"; // reuse the same auth styles
import SocialLoginButtons from "../../components/LoginButtons/LoginButtons.tsx";
import SignUp from '../../components/SignUp/SignUp.tsx';
import authSideImg from '../../assets/authside.jpeg';

const SignUpPage: React.FC = () => {
  return (
    <div className="ls-auth-page">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-8">
            <div className="card ls-auth-card overflow-hidden">
              <div className="row g-0">
                {/* Left side: brand panel */}
                <div className="col-md-5 d-none d-md-flex">
                  <img src={authSideImg} className="side-image" alt="side-image"/>
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

                    <SignUp />

                    <SocialLoginButtons />

                    <p className="ls-auth-footer mt-3 mb-0">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0 ls-auth-link"
                      >
                        Sign in
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

export default SignUpPage;