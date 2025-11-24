import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebaseConfig";

export default function VehicleList() {

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVehicles() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "vehicles"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVehicles(list);

    } catch (err) {
      console.log("Erro ao buscar veículos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (vehicles.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nenhum veículo encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Meus Veículos
      </Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Marca: {item.brand}</Text>
            <Text>Modelo: {item.model}</Text>
            <Text>Ano: {item.year}</Text>
            <Text>Placa: {item.plate}</Text>
          </View>
        )}
      />
    </View>
  );
}
