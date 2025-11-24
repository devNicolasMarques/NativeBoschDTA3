import { Link, router } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { app } from '../firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const screenWidth = Dimensions.get("window").width;

    const auth = getAuth(app)

    const signIn = async () => {
        await signInWithEmailAndPassword(auth, email, password)
        router.navigate('/home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please Insert Your Data!</Text>

            <TextInput placeholder="E-mail" style={styles.input} onChangeText={(value) => setEmail(value)} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={(value) => setPassword(value)} />

            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Link href={'/'} style={[styles.link, styles.red]}>Doesnt have an account? Sign up</Link>
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