import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface Usuario {
  id: string;
  nomeCompleto: string;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
}

export default function HomeScreen() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async () => {
    if (!nomeCompleto || !rua || !numero || !cidade || !estado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      // Solicitar permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Erro', 'Permissão de localização negada');
        setLoading(false);
        return;
      }

      // Construir endereço completo
      const enderecoCompleto = `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`;

      // Geocodificar o endereço
      const geocode = await Location.geocodeAsync(enderecoCompleto);

      if (geocode.length === 0) {
        Alert.alert('Erro', 'Não foi possível encontrar o endereço. Verifique os dados e tente novamente.');
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geocode[0];

      // Criar novo usuário
      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nomeCompleto,
        rua,
        numero,
        cidade,
        estado,
        latitude,
        longitude,
      };

      // Adicionar usuário à lista
      setUsuarios([...usuarios, novoUsuario]);

      // Limpar campos
      setNomeCompleto('');
      setRua('');
      setNumero('');
      setCidade('');
      setEstado('');

      Alert.alert('Sucesso', `Usuário ${nomeCompleto} cadastrado com sucesso!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao geocodificar o endereço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Calcular região inicial do mapa
  const getMapRegion = () => {
    if (usuarios.length === 0) {
      // Região padrão (Brasil central)
      return {
        latitude: -15.7939,
        longitude: -47.8828,
        latitudeDelta: 30,
        longitudeDelta: 30,
      };
    }

    // Calcular centro baseado nos usuários cadastrados
    const latitudes = usuarios.map(u => u.latitude);
    const longitudes = usuarios.map(u => u.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;
    const latDelta = (maxLat - minLat) * 1.5 || 0.05;
    const lonDelta = (maxLon - minLon) * 1.5 || 0.05;

    return {
      latitude: centerLat,
      longitude: centerLon,
      latitudeDelta: Math.max(latDelta, 0.05),
      longitudeDelta: Math.max(lonDelta, 0.05),
    };
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Cadastro de Usuários</ThemedText>
        
        <ThemedText style={styles.label}>Nome Completo:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <ThemedText style={styles.label}>Rua:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Digite a rua"
          value={rua}
          onChangeText={setRua}
        />

        <ThemedText style={styles.label}>Número:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Digite o número"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <ThemedText style={styles.label}>Cidade:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <ThemedText style={styles.label}>Estado:</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Digite o estado (ex: SP, RJ)"
          value={estado}
          onChangeText={setEstado}
          maxLength={2}
          autoCapitalize="characters"
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={cadastrarUsuario}
          disabled={loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.info}>
          Total de usuários cadastrados: {usuarios.length}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.mapContainer}>
        <ThemedText type="subtitle" style={styles.mapTitle}>Mapa de Usuários</ThemedText>
        <MapView
          style={styles.map}
          region={getMapRegion()}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        >
          {usuarios.map((usuario) => (
            <Marker
              key={usuario.id}
              coordinate={{
                latitude: usuario.latitude,
                longitude: usuario.longitude,
              }}
              title={usuario.nomeCompleto}
              description={`${usuario.rua}, ${usuario.numero} - ${usuario.cidade}/${usuario.estado}`}
            />
          ))}
        </MapView>
      </ThemedView>

      {usuarios.length > 0 && (
        <ThemedView style={styles.listContainer}>
          <ThemedText type="subtitle" style={styles.listTitle}>Usuários Cadastrados:</ThemedText>
          {usuarios.map((usuario) => (
            <ThemedView key={usuario.id} style={styles.userCard}>
              <ThemedText style={styles.userName}>{usuario.nomeCompleto}</ThemedText>
              <ThemedText style={styles.userAddress}>
                {usuario.rua}, {usuario.numero}
              </ThemedText>
              <ThemedText style={styles.userAddress}>
                {usuario.cidade}/{usuario.estado}
              </ThemedText>
              <ThemedText style={styles.userCoords}>
                Lat: {usuario.latitude.toFixed(6)}, Lng: {usuario.longitude.toFixed(6)}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  mapContainer: {
    padding: 20,
    height: 400,
  },
  mapTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listContainer: {
    padding: 20,
  },
  listTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  userCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userAddress: {
    fontSize: 14,
    marginBottom: 3,
  },
  userCoords: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
