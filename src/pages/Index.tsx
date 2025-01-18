import { WifiConfig } from "@/components/WifiConfig";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WiFi Configuration</h1>
          <p className="mt-2 text-gray-600">
            Update SSID and password for registered PPPoE users
          </p>
        </div>
        <WifiConfig />
      </div>
    </div>
  );
};

export default Index;