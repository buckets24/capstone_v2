import supabase from 'lib/supabase/supabase-browser'
import { useFormik } from 'formik'
import { loginSchema } from './validation'
import { Stack, Box } from '@mui/material'
import { FormTextField } from 'components/Form/TextField'
import { useState } from 'react'
import { Button } from 'components/Button/Button'

function LoginModule () {
  const [isSubmitting, setSubmitting] = useState(false)

  const initialValues = {
    email: ''
  }

  async function signInWithEmail (email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if (!error) {
      console.log('link sent')
    }

    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    isInitialValid: false,
    onSubmit: async (values) => {
      setSubmitting(true)

      signInWithEmail(values.email)
    }
  })

  return (
    <form
      noValidate
      onSubmit={formik?.handleSubmit}
    >
      <Stack
        flexDirection='column'
        gap={3}
      >
        <Box>
          <FormTextField
            name='email'
            type='text'
            value={formik?.values.email}
            onBlur={formik?.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik?.touched.email && formik?.errors.email)}
            label='Email Address'
            fullWidth
          />
        </Box>

        <Box>
          <Button
            disabled={!formik.isValid || isSubmitting}
            label={isSubmitting ? 'Logging in...' : 'Login'}
            onClick={() => formik?.handleSubmit()}
            color='primary'
          />
        </Box>
      </Stack>
    </form>
  )
}

export { LoginModule }
