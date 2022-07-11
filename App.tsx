import { Providers } from './src/providers/Providers';
import { StackNavigator } from './src/navigation/Stack';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Inter-Black': require('./assets/fonts/inter/Inter-Black.ttf'),
      'Inter-Bold': require('./assets/fonts/inter/Inter-Bold.ttf'),
      'Inter-ExtraBold': require('./assets/fonts/inter/Inter-ExtraBold.ttf'),
      'Inter-ExtraLight': require('./assets/fonts/inter/Inter-ExtraLight.ttf'),
      'Inter-Light': require('./assets/fonts/inter/Inter-Light.ttf'),
      'Inter-Medium': require('./assets/fonts/inter/Inter-Medium.ttf'),
      'Inter-Regular': require('./assets/fonts/inter/Inter-Regular.ttf'),
      'Inter-SemiBold': require('./assets/fonts/inter/Inter-SemiBold.ttf'),
      'Inter-Thin': require('./assets/fonts/inter/Inter-Thin.ttf'),
    });

    setLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);


  // const [loaded] = useFonts({
  //   Inter: require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf')
  // });
  
  if (!loaded) {
    return null;
  }

  return (
    <Providers>
        <StackNavigator />
    </Providers>
  );
}