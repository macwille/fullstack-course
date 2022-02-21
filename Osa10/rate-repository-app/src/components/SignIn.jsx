import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';

const SignIn = () => {

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    fieldTitle: {
      marginLeft: 12,
      fontSize: 14,
    },
    submit: {
      fontSize: 14,
      marginLeft: 90,
      marginRight: 90,
      padding: 10,
    },
    errorMessage: {
      marginLeft: 12,
      paddingBottom: 12,
      fontSize: 14,
      color: '#d73a4a'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });

  const initalValues = {
    username: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .max(28)
      .required('Username is required'),
    password: yup
      .string()
      .min(4)
      .max(28)
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={values => console.log(values)}
      validationSchema={validationSchema}
    >
      {({ handleChange, setFieldTouched, errors, touched, handleSubmit, isValid, values }) => (
        <View style={styles.container}>
          <Text style={styles.fieldTitle}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={() => setFieldTouched('username')}
            value={values.username}
            placeholder='Username'
          />
          {touched.username && errors.username &&
            <Text style={styles.errorMessage}>{errors.username}</Text>
          }
          <Text style={styles.fieldTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            value={values.password}
            placeholder='Password'
          />
          {touched.password && errors.password &&
            <Text style={styles.errorMessage}>{errors.password}</Text>
          }
          <View style={styles.submit}>
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </View>
        </View>
      )}

    </Formik>
  )
};

export default SignIn;