import axios from "axios";

const GENIEACS_API_URL = "http://your-genieacs-server:7557"; // Replace with your GenieACS server URL

export interface WifiUpdateResponse {
  status: string;
  message: string;
}

export const updateWifiConfig = async (
  username: string,
  ssid: string,
  password: string
): Promise<WifiUpdateResponse> => {
  console.log("Updating WiFi config for user:", username);
  
  try {
    // Find the device by PPPoE username
    const deviceResponse = await axios.get(
      `${GENIEACS_API_URL}/devices/?query=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username=${username}`
    );

    if (!deviceResponse.data || deviceResponse.data.length === 0) {
      throw new Error("Device not found for the given PPPoE username");
    }

    const device = deviceResponse.data[0];
    const deviceId = device._id;

    // Update SSID
    await axios.post(`${GENIEACS_API_URL}/devices/${deviceId}/tasks`, {
      name: "setParameterValues",
      parameterValues: [
        ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", ssid],
        ["InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase", password]
      ]
    });

    console.log("WiFi configuration updated successfully");
    return {
      status: "success",
      message: "WiFi configuration updated successfully"
    };
  } catch (error) {
    console.error("Error in updateWifiConfig:", error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Failed to update WiFi configuration"
    );
  }
};