import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateWifiConfig } from "@/services/genieacs";

export const WifiConfig = () => {
  const [username, setUsername] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !ssid || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateWifiConfig(username, ssid, password);
      console.log("WiFi update result:", result);
      
      toast({
        title: "Success",
        description: "WiFi configuration updated successfully",
      });
    } catch (error) {
      console.error("Error updating WiFi config:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update WiFi configuration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-2">
        <Label htmlFor="username">PPPoE Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter PPPoE username"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ssid">New SSID</Label>
        <Input
          id="ssid"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          placeholder="Enter new SSID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new WiFi password"
          required
          minLength={8}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update WiFi Configuration"}
      </Button>
    </form>
  );
};