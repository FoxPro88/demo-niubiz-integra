import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {

  console.log("----- INIT -----");
  webview = null;
  jsonData = ""
  merchantid = ""
  purchasenumber = ""
  token = ""
  transactiontoken = ""

  const myScript = `
      var transactiontoken  = document.getElementById('transactiontoken').value;
      var token             = document.getElementById('token').value;

      var obj = new Object();
      obj.transactiontoken  = JSON.parse(transactiontoken);
      obj.token             = token;
      var data              = JSON.stringify(obj);

      window.ReactNativeWebView.postMessage(data);
      true;
    `;

  return (

  <WebView 
    source={ { uri:"https://ecarfront.guardsoft.pe/pagoniubiz/"}}        
    ref={(ref) => { this.webview = ref; }}
    onMessage={event => {
      jsonData = JSON.parse(event.nativeEvent.data);

      console.log('----- json -----');

      console.log("MerchantId => " +  jsonData["transactiontoken"]["merchantid"]);
      console.log("PurchaseNumber => " +  jsonData["transactiontoken"]["purchasenumber"]);
      console.log("Token => " +  jsonData["transactiontoken"]["token"]);
      console.log("TransactionToken => " +  jsonData["transactiontoken"]["transactionToken"]);

      merchantid       = jsonData["transactiontoken"]["merchantid"];
      purchasenumber   = jsonData["transactiontoken"]["purchasenumber"];
      token            = jsonData["transactiontoken"]["token"];
      transactiontoken = jsonData["transactiontoken"]["transactionToken"];

      console.log("MerchantId => " + merchantid);
      console.log("TransactionToken => " + transactiontoken);

      //llamar al api de autorizacion
      // var myHeaders = new Headers();
      // myHeaders.append("Authorization", token);
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "terminalId": "1",
      //   "channel": "web",
      //   "terminalUnattended": false,
      //   "captureType": "manual",
      //   "countable": true,
      //   "order": {
      //     "tokenId": transactiontoken,
      //     "productId": "PS4",
      //     "purchaseNumber": purchasenumber,
      //     "amount": 20.5,
      //     "currency": "PEN"
      //   },
      //   "sponsored": null,
      //   "antifraud": {
      //     "clientIp": "127.0.0.1"
      //   }
      // });

      // console.log("Raw => " + raw);

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      // fetch("https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/" + merchantid, requestOptions)
      // .then(response => console.log("Response" + JSON.stringify(response)))
      // .then(result => console.log("Result" + result.text()))
      // .catch(error => console.log('error', error));

    }}
    onNavigationStateChange={(event) => {

      var url = event.url;

      console.log('---- onNavigationStateChange ----')
      console.log('URL =>' + url)
      //this.webview.stopLoading();

      if (url.includes('?message=success')) {

        console.log(' --- aca viene la variable transacction token ')

        this.webview.injectJavaScript(myScript);
      }



    }}
        />

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
