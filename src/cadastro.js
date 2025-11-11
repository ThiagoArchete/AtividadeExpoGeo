import * as Location from 'expo-location';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Cadastro({ onUsuarioCadastrado }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async () => {
    if (!nomeCompleto || !rua || !numero || !cidade || !estado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Erro', 'Permissão de localização negada');
        setLoading(false);
        return;
      }

      const enderecoCompleto = `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`;

      const geocode = await Location.geocodeAsync(enderecoCompleto);

      if (geocode.length === 0) {
        Alert.alert('Erro', 'Não foi possível encontrar o endereço. Verifique os dados.');
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geocode[0];

      const novoUsuario = {
        id: Date.now().toString(),
        nomeCompleto,
        rua,
        numero,
        cidade,
        estado,
        latitude,
        longitude,
      };

      onUsuarioCadastrado(novoUsuario);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>
      
      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome completo"
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
      />

      <Text style={styles.label}>Rua:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a rua"
        value={rua}
        onChangeText={setRua}
      />

      <Text style={styles.label}>Número:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>Estado:</Text>
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
        <Text style={styles.buttonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
});
