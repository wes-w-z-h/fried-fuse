import { useEffect } from "react";
import NoticeObj from "../../types/NoticeObj";
import AppState from "../../types/AppState";
import { useNavigate } from "react-router-dom";

type LogoutTimerProps = {
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>,
    notice: NoticeObj
  ) => Promise<void>;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  notice: NoticeObj;
};

const LogoutTimer: React.FC<LogoutTimerProps> = ({
  handleLogout,
  setAppState,
  notice,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(async () => {
        await handleLogout(setAppState, notice); // Call your logout function when inactivity time is reached
        navigate("/");
      }, 30 * 60 * 1000); // 30 minute in milliseconds
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

  return <div></div>;
};

export default LogoutTimer;
