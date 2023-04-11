import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

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

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    displayName, email, password, onInputChange, 
    formState, isFormValid, emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations);

  console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(formState);
  }

  return (
    <AuthLayout title='Create an account'>
      <form onSubmit={ onSubmit }>
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
                <Grid item xs={ 12 }>
                  <Button 
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
