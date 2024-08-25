import {
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <section className="login">
        <h1>Login</h1>
        <FormControl className="w-100" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type={"text"}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Email"
          />
        </FormControl>
        <FormControl className="w-100" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="password-section">
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <label className="links">Forget password?</label>
        </div>
        <Button style={{ width: "10rem" }} variant="contained">
          Login
        </Button>
        <span>
          Don't have an account? <span className="links">Signup</span>
        </span>
      </section>
    </div>
  );
};
export default Login;
