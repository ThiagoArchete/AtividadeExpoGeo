import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Cadastro from './src/cadastro';
import Maps from './src/maps';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);

  const handleUsuarioCadastrado = (novoUsuario) => {
    setUsuarios([...usuarios, novoUsuario]);
  };

  return (
    <ScrollView style={styles.container}>
      <Cadastro onUsuarioCadastrado={handleUsuarioCadastrado} />
      <Maps usuarios={usuarios} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
