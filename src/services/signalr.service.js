import * as signalR from "@microsoft/signalr";

class SignalRConnectionManager {
  constructor(path) {
    const URL = import.meta.env.VITE_API_URL;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL + path, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.connection
      .start({ transport: "longPolling", xdomain: true })
      .then(() => {
        console.log("chat hub connected!");
      })
      .catch((err) => {
        console.log(err);
      }); 
  }
}
 
export default SignalRConnectionManager;