import { Fragment, useEffect, useState } from "react";
import AppState from "../../types/AppState";
import { useNavigate } from "react-router-dom";
import { AlertColor, Button, Paper, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

type LogoutTimerProps = {
  handleLogout: (
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
  ) => Promise<void>;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  notice: (message: string, severity: AlertColor) => void;
  appState: AppState;
};

const LogoutTimer: React.FC<LogoutTimerProps> = ({
  handleLogout,
  setAppState,
  notice,
  appState,
}) => {
  const TIMEOUT_TIMER: number = 0.3 * 60; // minutes in seconds
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(TIMEOUT_TIMER); // seconds

  let inactivityTimer: NodeJS.Timeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    setCountdown(TIMEOUT_TIMER);
    inactivityTimer = setTimeout(async () => {
      if (appState.loggedInStatus === "LOGGED_IN") {
        await handleLogout(setAppState);
        notice("LOGGED OUT: Inactive", "warning");
        navigate("/");
      }
    }, TIMEOUT_TIMER * 1000 + 5); // in milliseconds + 4ms in case delay rendering
  };
  const updateCountdown = () => {
    setCountdown((prevCountdown) => Math.max(0, prevCountdown - 1));
  };

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    const initTimer = () => {
      document.addEventListener("mousemove", () => {
        handleActivity();
        updateCountdown();
      });
      document.addEventListener("keydown", () => {
        handleActivity();
        updateCountdown();
      });
      resetInactivityTimer();
      const countdownInterval = setInterval(updateCountdown, 1002);
      return () => {
        clearInterval(countdownInterval);
        clearTimeout(inactivityTimer);
      };
    };

    // Initial setup
    return appState.loggedInStatus === "LOGGED_IN" ? initTimer() : undefined;
  }, [appState]);

  return (
    <Fragment>
      {countdown}
      {appState.loggedInStatus === "LOGGED_IN" && countdown <= 15 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 100000,
          }}
        >
          <Paper
            elevation={24}
            sx={{
              paddingTop: 10,
              width: "47%",
              height: "50%",
              justifyContent: "center",
              alignContent: "center",
              borderRadius: 17,
            }}
          >
            <Typography
              variant="h4"
              fontFamily={"monospace"}
              sx={{ color: "" }}
            >{`Session expires in: ${countdown}`}</Typography>
            <Typography variant="body1" fontFamily={"monospace"} fontSize={17}>
              Move the mouse or press a key!
            </Typography>
            <img
              src={`${process.env.PUBLIC_URL}/images/psyduck.jpg`}
              style={{ maxHeight: "65%", maxWidth: "87%" }}
            />
            <Typography
              color="text.secondary"
              fontFamily={"monospace"}
              fontSize={13}
            >
              image via nintendo
            </Typography>
          </Paper>
        </div>
      )}
    </Fragment>
  );
};

export default LogoutTimer;
