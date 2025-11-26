import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from '../firebaseConfig';

export default function Home() {

  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function registerVehicle() {
    try {
      
      if (!brand || !model || !year) {
        console.log("Preencha brand, model e year.");
        return;
      }

      const vehicle = {
        brand,
        model,
        year: Number(year),
        plate: plate || null,
        imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "vehicles"), vehicle);
      console.log("Veículo cadastrado!");

    } catch (err) {
      console.log("Erro ao cadastrar:", err);
    }
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      
      <Text style={{ 
        fontSize: 26, 
        fontWeight: "bold",
        marginBottom: 20 
      }}>
        Cadastrar Veículo
      </Text>

      <TextInput
        placeholder="Modelo"
        placeholderTextColor="#888"
        onChangeText={setModel}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 16,
          elevation: 2,
        }}
      />

      <TextInput
        placeholder="Marca"
        placeholderTextColor="#888"
        onChangeText={setBrand}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 16,
          elevation: 2,
        }}
      />

      <TextInput
        placeholder="Ano"
        placeholderTextColor="#888"
        keyboardType="numeric"
        onChangeText={setYear}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 16,
          elevation: 2,
        }}
      />

      <TextInput
        placeholder="Placa"
        placeholderTextColor="#888"
        onChangeText={setPlate}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 12,
          fontSize: 16,
          elevation: 2,
        }}
      />

      <TextInput
        placeholder="Link da imagem (opcional)"
        placeholderTextColor="#888"
        onChangeText={setImageUrl}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 10,
          marginBottom: 20,
          fontSize: 16,
          elevation: 2,
        }}
      />
      
      <TouchableOpacity onPress={registerVehicle}>
        <View
          style={{
            backgroundColor: "#3498db",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            elevation: 3,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Cadastrar
          </Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}
