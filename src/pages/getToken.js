// Import the useAuth hook from your authentication module
import { useAuth } from "@/context/AuthContext";   // Update the path to match your project

// Define the getTokenFromSomeWhere function to retrieve the token
function GetTokenFromSomeWhere() {
  // Call the useAuth hook to get the authentication information
  const { token } = useAuth();

  // Return the token
  return token;
}

// Export the getTokenFromSomeWhere function
export default GetTokenFromSomeWhere;