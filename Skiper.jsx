import React, { useEffect, useState } from "react";
import { Platform, StatusBar, View, Text, Linking } from "react-native";
import FlashMessage from "react-native-flash-message";
import { ApolloClient, split, HttpLink } from "apollo-boost";
import { Provider } from "react-redux";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context"
import Modal from 'react-native-modal'
import LottieView from 'lottie-react-native'

import NetInfo from "@react-native-community/netinfo";

// Import utils
import { keys } from "./src/utils/keys";
import { getAsyncStorage } from "./src/utils/AsyncStorage";

// Import hooks
import { useStatusGps } from "./src/hooks/useStatusGps";
import { useVersionCode } from './src/hooks/useVersionCode'

// Import store
import store from "./src/store/store";

// Import navigation
import Navigation from "./src/navigation/Navigation";
import TemplateError from "./src/screens/TemplateError/TemplateError";

import { configure } from "./src/hooks/usePushNotification";

// Import theme
import { Theme } from "./src/constants/Theme";

// Import components
import IconButton from "./src/components/button/IconButton";

const httpLink = new HttpLink({
  uri: keys.urlApi
});

const wsLink = new WebSocketLink({
  uri: keys.urlApi,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = setContext(async (_, { headers }) => {
  const userData = await getAsyncStorage(keys.asyncStorageKey);
  if (userData) {
    const userToken = JSON.parse(userData).userToken;
    return {
      headers: {
        ...headers,
        Authorization: userToken ? `Bearer ${userToken}` : ""
      }
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  onError: error => {
    const { networkError } = error;
    console.log(networkError);
  }
});

const Skiper = () => {
  const { updatePending } = useVersionCode()
  console.log(updatePending)
  configure();
  const { message, denied } = useStatusGps();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected)
    return <TemplateError isOnline title="Ooppss!" description="Revisa tu conexion a internet e intenta nuevamente."/>
    
  if (denied)
    return <TemplateError isGps title="Ooppss!" description={message} />;

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {Platform.OS === "ios" 
          ? ( <StatusBar barStyle="dark-content" /> ) 
          : ( <StatusBar backgroundColor={Theme.COLORS.colorMainAlt} /> )}
        {updatePending && (
          <Modal
            style={{
              flex: 1,
              margin: 0,
              backgroundColor: 'rgba(0,0,0,.7)',
            }}
            isVisible={true}
            animationInTiming={700}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                source={require('./warning.json')} 
                autoPlay
                loop
                style={{
                  width: 180,
                  height: 180
                }}
              />
            </View>
            <View style={{
              height: 200,
              paddingVertical: 10,
              justifyContent: 'space-evenly',
              position: 'relative',
              top: -30
            }}>
              <Text style={{ 
                color: Theme.COLORS.colorSecondary,
                fontSize: 26,
                textTransform: 'uppercase',
                fontFamily: 'Lato-Bold',
                textAlign: 'center'
              }}>Advertencia</Text>
              <Text style={{
                color: '#fff',
                fontSize: Theme.SIZES.small,
                fontFamily: 'Lato-Regular',
                textAlign: 'center',
              }}>Se encontraron actualizaciones importantes, por favor actualiza para poder continuar.</Text>
              <View style={{ marginVertical: 5 }} />
              <View style={{ alignItems: 'center' }}>
                <IconButton
                  stylesButton={{
                    borderRadius: 100,
                    paddingHorizontal: 20,
                    height: 46,
                    backgroundColor: Theme.COLORS.colorButton,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: 220,
                    borderBottomColor: Theme.COLORS.colorSecondary,
                    borderBottomWidth: 0.3
                  }}
                  onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.alyskiperuser')}
                  message='DESCARGAR AHORA'
                />
              </View>
            </View>
          </Modal>
        )}
        <Navigation />
        <FlashMessage position="top" />
      </ApolloProvider>
    </Provider>
  );
};

export default Skiper;
