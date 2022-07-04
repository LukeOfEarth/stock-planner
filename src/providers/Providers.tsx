import { SafeAreaProvider } from "react-native-safe-area-context";
import { IProvider } from "../models";

export const Providers : React.FC<IProvider> = ({ children }) => {
    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    );
}