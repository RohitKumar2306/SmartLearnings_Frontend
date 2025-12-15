import React from "react";

export type SocialProvider = "google" | "outlook" | "github";

interface LoginButtonsProps {
  onSocialClick?: (provider: SocialProvider) => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({
                                                                 onSocialClick,
                                                               }) => {
  const handleClick = (provider: SocialProvider) => () => {
    if (onSocialClick) {
      onSocialClick(provider);
    } else {
      console.log("Social sign-in:", provider);
    }
  };

  return (
    <div className="ls-social-login">
      <div className="ls-divider my-3">
        <span className="ls-divider-text">or continue with</span>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <button
          type="button"
          className="btn w-100 ls-btn-social ls-btn-social-google"
          onClick={handleClick("google")}
        >
          <span className="ls-btn-social-icon">G</span>
          <span>Google</span>
        </button>

        <button
          type="button"
          className="btn w-100 ls-btn-social ls-btn-social-outlook"
          onClick={handleClick("outlook")}
        >
          <span className="ls-btn-social-icon">O</span>
          <span>Outlook</span>
        </button>

        <button
          type="button"
          className="btn w-100 ls-btn-social ls-btn-social-github"
          onClick={handleClick("github")}
        >
          <span className="ls-btn-social-icon">GH</span>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginButtons;