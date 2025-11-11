# 📱 AtividadeExpoGeo - Sistema de Geolocalização# Welcome to your Expo app 👋



## 📋 Estrutura do ProjetoThis is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).



```## Get started

AtividadeExpoGeo/

├── assets/           # Imagens e recursos1. Install dependencies

├── src/

│   ├── cadastro.js  # Componente de cadastro de usuários   ```bash

│   └── maps.js      # Componente de exibição do mapa   npm install

├── App.js           # Componente principal   ```

├── index.js         # Entry point da aplicação

├── app.json         # Configurações do Expo2. Start the app

└── package.json     # Dependências do projeto

```   ```bash

   npx expo start

## 🎯 Funcionalidades   ```



### ✅ Cadastro de UsuáriosIn the output, you'll find options to open the app in a

- Formulário com campos: Nome Completo, Rua, Número, Cidade, Estado

- Validação de campos obrigatórios- [development build](https://docs.expo.dev/develop/development-builds/introduction/)

- Feedback visual durante o cadastro- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

### 🗺️ Geolocalização- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

- **Geocodificação**: Conversão de endereço em coordenadas (latitude/longitude)

- Biblioteca utilizada: `expo-location`You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

- Função: `Location.geocodeAsync(enderecoCompleto)`

## Get a fresh project

### 📍 Exibição no Mapa

- Biblioteca: `react-native-maps`When you're ready, run:

- Marcadores personalizados com nome do usuário

- Ajuste automático do zoom para mostrar todos os usuários```bash

- Suporte a múltiplos usuáriosnpm run reset-project

```

## 🔧 Como Funciona a Geocodificação

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Passo a Passo:

## Learn more

1. **Captura dos Dados**

   ```javascriptTo learn more about developing your project with Expo, look at the following resources:

   const enderecoCompleto = `${rua}, ${numero}, ${cidade}, ${estado}, Brasil`;

   ```- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).

- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

2. **Geocodificação** (Conversão de Endereço → Coordenadas)

   ```javascript## Join the community

   const geocode = await Location.geocodeAsync(enderecoCompleto);

   const { latitude, longitude } = geocode[0];Join our community of developers creating universal apps.

   ```

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.

3. **Como funciona internamente:**- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

   - O `geocodeAsync` usa serviços de geolocalização (Google Maps, Apple Maps)
   - Envia o endereço de texto para a API
   - A API busca no banco de dados de mapas
   - Retorna as coordenadas geográficas precisas

4. **Exemplo Real:**
   ```
   Entrada: "Avenida Paulista, 1578, São Paulo, SP, Brasil"
   Saída: { latitude: -23.5614, longitude: -46.6558 }
   ```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o app
npm start

# Para Android
npm run android

# Para iOS
npm run ios
```

## 📚 Para Apresentação

### Pontos Importantes:

1. **Explicar a Estrutura**
   - `App.js`: Gerencia o estado dos usuários
   - `cadastro.js`: Formulário e lógica de geocodificação
   - `maps.js`: Exibição do mapa e marcadores

2. **Explicar a Geocodificação**
   - Conversão de texto (endereço) para coordenadas numéricas
   - Usa APIs de mapas (Google/Apple)
   - Processo assíncrono (await/async)

3. **Demonstrar o Funcionamento**
   - Cadastrar um usuário com endereço real
   - Mostrar o marcador aparecendo no mapa
   - Cadastrar múltiplos usuários
   - Mostrar o mapa ajustando automaticamente

## 🔑 Tecnologias

- **React Native**: Framework para apps mobile
- **Expo**: Plataforma de desenvolvimento
- **expo-location**: Biblioteca de geolocalização
- **react-native-maps**: Biblioteca de mapas
- **JavaScript**: Linguagem de programação

## 📝 Observações

- Requer permissão de localização
- Funciona offline após carregar o mapa
- Suporta endereços brasileiros
