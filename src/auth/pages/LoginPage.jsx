import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'guilloz@gmail.com',
    password: '123456'
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication())
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
      <form>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Correo" 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  fullWidth
                  name='email'
                  onChange={ onInputChange }
                  value={ email }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Contraseña" 
                  fullWidth
                  name='password'
                  onChange={ onInputChange }
                  value={ password }
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button variant="contained" fullWidth type='submit' onClick={ onSubmit }>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button variant="contained" fullWidth onClick={ onGoogleSignIn }>
                    <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to='/auth/register'>
                  Create an account
                </Link>
              </Grid>
            </Grid>
        </form>
    </AuthLayout>
  )
}
