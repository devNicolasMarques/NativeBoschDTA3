import { Link, router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Swal from 'sweetalert2';
import { app } from '../firebaseConfig';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const screenWidth = Dimensions.get("window").width;

  const minPassword = 6;

  const auth = getAuth(app)

  // Não pode ter senhas com menos de 6 caracteres
  // Não pode cadastrar o mesmo email
  // Confirmar senha

  const signUp = async () => {
    if (password.length >= minPassword) {
      if (password === confirmPassword) {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Usuário registrado!",
        });
          return router.navigate('/login')
        }
        catch (e) {
          return Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Email já existente!",
        });
        }
      }
      else {
        return Swal.fire({
          icon: "error",
          title: "Erro",
          text: "As senhas não coincidem!",
        });
      }
    }
    else {
       return Swal.fire({
          icon: "error",
          title: "Erro",
          text: "A senha deve ter no mínimo 6 caracteres!",
        });
    }
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Please Insert Your Data!</Text>

      <TextInput placeholder="E-mail" style={styles.input} onChangeText={(value) => setEmail(value)} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={(value) => setPassword(value)} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} onChangeText={(value) => setConfirmPassword(value)} />

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

        <Link href={'/login'} style={[styles.link, styles.red]}>Already have an account? Sign in</Link>

      {/* Social */}

      <Text style={[styles.subtitle, { alignSelf: 'center', marginTop: 24 }]}>Access Quickly</Text>

      <View style={styles.socialContainer}>

        <TouchableOpacity>
          <Text style={[styles.link, styles.blue]}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.link, { color: "#d12121" }]}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.link, styles.blue]}>Twitter</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    alignSelf: "flex-start",
    fontSize: 20,
    marginBottom: 10,
  },

  subtitle: {
    color: "rgb(126, 126, 126)",
    alignSelf: "flex-start",
    fontSize: 16,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "#f2f2f2",
    color: "#8f8f8f",
    borderRadius: 15,
    height: 45,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#d12121",
    borderRadius: 15,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  red: {
    color: "#d12121",
  },

  blue: {
    color: "#2145d1",
  },

  link: {
    fontWeight: "600",
    marginVertical: 5,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});