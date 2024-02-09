import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { login } from '../../../api/auth';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (event) => {
    try {
      event.preventDefault();
      const formElement = document.querySelector('#loginForm');
      const formData = new FormData(formElement);
      const formDataJSON = Object.fromEntries(formData);

      const loginData = await login(formDataJSON);

      console.log(loginData.data.jwt)
      localStorage.setItem('token', loginData.data.jwt)
      navigate('/dashboard', { replace: true });
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <>        <form id='loginForm' onSubmit={handleClick}>

      <Stack spacing={3}>
        <TextField name="email" label="email" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Login
      </LoadingButton>
    </form>

    </>
  );
}
