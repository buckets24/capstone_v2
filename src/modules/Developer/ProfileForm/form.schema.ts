import * as Yup from 'yup'

const profileFormSchema = Yup.object().shape({
  first_name: Yup.string().trim().required('First name is required.'),
  last_name: Yup.string().trim().required('Last name is required.'),
  job_title: Yup.string().trim().required('Position is required.'),
  email: Yup.string().trim().required().email('Email Address is required.'),
  mobile: Yup.string().trim().required('Mobile number is required.'),
  location: Yup.string().trim().required('Location is required.'),
  expected_salary: Yup.string().trim().required('Expected salary is required.')
})

export { profileFormSchema }
