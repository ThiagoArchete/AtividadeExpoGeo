import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function Maps({ usuarios }) {
  
  const getMapRegion = () => {
    if (usuarios.length === 0) {
      return {
        latitude: -15.7939,
        longitude: -47.8828,
        latitudeDelta: 30,
        longitudeDelta: 30,
      };
    }

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
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Usuários</Text>
      <Text style={styles.info}>Total cadastrados: {usuarios.length}</Text>
      
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

      {usuarios.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Usuários Cadastrados:</Text>
          {usuarios.map((usuario) => (
            <View key={usuario.id} style={styles.userCard}>
              <Text style={styles.userName}>{usuario.nomeCompleto}</Text>
              <Text style={styles.userAddress}>
                {usuario.rua}, {usuario.numero}
              </Text>
              <Text style={styles.userAddress}>
                {usuario.cidade}/{usuario.estado}
              </Text>
              <Text style={styles.userCoords}>
                Lat: {usuario.latitude.toFixed(6)}, Lng: {usuario.longitude.toFixed(6)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  map: {
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listContainer: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  userCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
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
