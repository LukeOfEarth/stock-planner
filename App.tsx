import { TabNavigator } from './src/navigation/Tabs';
import { Providers } from './src/providers/Providers';

export default function App() {
  return (
    <Providers>
        <TabNavigator />
    </Providers>
  );
}