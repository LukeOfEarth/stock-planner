import { SafeAreaProvider } from "react-native-safe-area-context";
import { IProvider } from "../models";
import { NavigationContainer } from "@react-navigation/native";

export const Providers : React.FC<IProvider> = ({ children }) => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {children}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}