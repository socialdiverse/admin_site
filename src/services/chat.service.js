import * as signalR from "@microsoft/signalr";

export const SignalRConnection = (module) => {
  const URL = import.meta.env.VITE_API_URL;
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(URL + module, {
      skipNegotiation: true,
      transport:
        signalR.HttpTransportType.WebSockets ||
        signalR.HttpTransportType.LongPolling,
    })
    .withAutomaticReconnect()
    .build();
    
  connection
    .start({ transport: "longPolling", xdomain: true })
    .then((res) => {
      console.log("chat hub connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};
