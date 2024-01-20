import { useEffect } from "react";
import NoticeObj from "../../types/NoticeObj";
import AppState from "../../types/AppState";
import { useNavigate } from "react-router-dom";

type LogoutTimerProps = {
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>,
    notice: NoticeObj,
    navigate: ReturnType<typeof useNavigate>
  ) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  notice: NoticeObj;
  navigate: ReturnType<typeof useNavigate>;
};

const LogoutTimer: React.FC<LogoutTimerProps> = ({
  handleLogout,
  setAppState,
  notice,
  navigate,
}) => {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout(setAppState, notice, navigate); // Call your logout function when inactivity time is reached
      }, 1 * 60 * 1000); // 1 minute in milliseconds
    };

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Initial setup
    resetInactivityTimer();

    // Event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  return <></>;
};

export default LogoutTimer;
