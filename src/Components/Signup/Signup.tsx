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
import "./Signup.scss";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AzureOpenAI } from "openai";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <section className="login">
        <h1>Create an Account</h1>
        <FormControl className="w-100" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-firstName">
            First Name
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-firstName"
            type={"text"}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="First Name"
          />
        </FormControl>
        <FormControl className="w-100" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Last Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-lastName"
            type={"text"}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            label="Last Name"
          />
        </FormControl>
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
        <FormControl className="w-100" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        <div>
          <Checkbox />
          <span>
            I agree with the <span className="links">Terms and Conditions</span>
            and <span className="links">Privacy Policies</span> of Connect-me
          </span>
        </div>
        <Button 
          style={{ width: "10rem" }} 
          variant="contained"
          onClick={() => {}}
        >
          Sign up
        </Button>
        <span>
          Already a member? <span className="links">Log in</span>
        </span>
      </section>
    </div>
  );
};
export default Signup;
