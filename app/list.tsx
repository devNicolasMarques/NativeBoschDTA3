import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { db } from "../firebaseConfig";

export default function VehicleList() {

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchVehicles() {
    try {
      const q = query(collection(db, "vehicles"));
      const snapshot = await getDocs(q);

      console.log(snapshot.docs)

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

  async function updateVehicle(id: string, data: any) {
    try {
      const ref = doc(db, "vehicles", id);
      await updateDoc(ref, data);

      alert("Veículo atualizado!");
      fetchVehicles();

    } catch (err) {
      console.log("Erro ao atualizar:", err);
    }
  }

  async function deleteVehicle(id: string) {
    try {
      const ref = doc(db, "vehicles", id);
      await deleteDoc(ref);

      alert("Veículo deletado!");
      fetchVehicles();

    } catch (err) {
      console.log("Erro ao deletar:", err);
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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
        Veículos
      </Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 12,
              marginBottom: 15,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.brand} {item.model}
            </Text>
            <Text style={{ opacity: 0.7 }}>Ano: {item.year}</Text>
            <Text style={{ opacity: 0.7 }}>Placa: {item.plate}</Text>

            <View style={{ flexDirection: "row", marginTop: 12, gap: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3498db",
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }}
                onPress={() =>
                  updateVehicle(item.id, { brand: "Atualizado" })
                }
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#e74c3c",
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }}
                onPress={() => deleteVehicle(item.id)}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
