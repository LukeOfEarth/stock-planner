import { TabNavigator } from './src/navigation/Tabs';
import { Providers } from './src/providers/Providers';
import { StackNavigator } from './src/navigation/Stack';

export default function App() {
  return (
    <Providers>
        <StackNavigator />
    </Providers>
  );
}