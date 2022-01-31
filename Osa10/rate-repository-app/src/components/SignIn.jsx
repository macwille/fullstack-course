import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from "formik";

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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.fieldTitle}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          <Text style={styles.fieldTitle}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          <View style={styles.submit}>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}

    </Formik>
  )
};

export default SignIn;