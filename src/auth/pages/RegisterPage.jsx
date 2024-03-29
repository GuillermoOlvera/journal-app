import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Email must have @'],
  password: [(value) => value.length >= 6, 'Password must have more than 6 characters'],
  displayName: [(value) => value.length >= 1, 'Name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  const { 
    displayName, email, password, onInputChange, 
    formState, isFormValid, emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations);

  console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Create an account'>
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Full name" 
                  type="text" 
                  placeholder="Guillermo Olvera" 
                  fullWidth
                  name='displayName'
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted }
                  helperText={ displayNameValid }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Email" 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  fullWidth
                  name='email'
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ emailValid }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password" 
                  fullWidth
                  name='password'
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid }
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={ 12 }>
                  <Button 
                    disabled={ isCheckingAuthentication }
                    variant="contained" 
                    fullWidth
                    type='submit'
                  >
                    Create Account
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography xs={{ mr: 1 }}>Already have an account?</Typography>
                <Link component={ RouterLink } color='inherit' to='/auth/login'>
                  Login
                </Link>
              </Grid>
            </Grid>
        </form>
    </AuthLayout>
  )
}
