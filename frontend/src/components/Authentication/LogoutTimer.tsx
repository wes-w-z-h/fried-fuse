import { useEffect } from "react";
import AppState from "../../types/AppState";
import { useNavigate } from "react-router-dom";
import { AlertColor } from "@mui/material";

type LogoutTimerProps = {
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => Promise<void>;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  notice: (message: string, severity: AlertColor) => void;
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
        await handleLogout(setAppState); // Call your logout function when inactivity time is reached
        notice("LOGGED OUT: Inactive", "warning");
        navigate("/");
      }, 30 * 60 * 1000); // 30 minute in milliseconds
    };

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Initial setup
    resetInactivityTimer();

    // Event listeners
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, []);

  return <div></div>;
};

export default LogoutTimer;
