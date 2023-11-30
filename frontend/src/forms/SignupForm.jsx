const formik = useFormik({
  initialValues: {
    userName: '',
    password: '',
  },
  validationSchema: Yup.object({
    userName: Yup.string()
      .min(2, 'Must be at least 2 characters')
      .max(10, 'Must be no more than 10 characters')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Must be at least 6 characters')
      .max(20, 'Must be no more than 20 characters')
      .required('Required'),
  }),
  onSubmit: () => {
    console.log('dsfasf');
    // submitForm(values, formik);
  },
});