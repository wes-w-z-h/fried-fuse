import { useEffect, useState } from "react";

type LogoutTimerProps = {
  handleLogout: () => void;
};

const LogoutTimer: React.FC<LogoutTimerProps> = ({ handleLogout }) => {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout(); // Call your logout function when inactivity time is reached
      }, 1 * 60 * 1000); // 10 minutes in milliseconds
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
