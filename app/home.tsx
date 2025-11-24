import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from '../firebaseConfig';

export default function Home() {

  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function registerVehicle() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log("Usuário não está logado.");
        return;
      }

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
        userId: user.uid,
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
    <>
      <TextInput placeholder="Modelo" onChangeText={setModel} />
      <TextInput placeholder="Marca" onChangeText={setBrand} />
      <TextInput placeholder="Ano" onChangeText={setYear} />
      <TextInput placeholder="Placa" onChangeText={setPlate} />
      <TextInput placeholder="Link da imagem" onChangeText={setImageUrl} />

      <TouchableOpacity onPress={registerVehicle}>
        <View>
          <Text>Cadastrar</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
