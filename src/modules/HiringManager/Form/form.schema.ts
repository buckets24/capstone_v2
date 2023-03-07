import * as Yup from 'yup'

const jobSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  description: Yup.string().trim().required('Required'),
  salary_max: Yup.string().trim().required('Required'),
  salary_min: Yup.string().trim().required('Required'),
  requirements: Yup.string().trim().required('Required'),
  status: Yup.string().trim().required('Required'),
  type: Yup.string().trim().required('Required'),
  level: Yup.string().trim().required('Required')
})

export { jobSchema }
