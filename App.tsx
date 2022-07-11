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

      'Rubik-Black': require('./assets/fonts/rubik/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./assets/fonts/rubik/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./assets/fonts/rubik/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./assets/fonts/rubik/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./assets/fonts/rubik/Rubik-Italic.ttf'),
      'Rubik-ExtraBold': require('./assets/fonts/rubik/Rubik-ExtraBold.ttf'),
      'Rubik-ExtraBoldItalic': require('./assets/fonts/rubik/Rubik-ExtraBoldItalic.ttf'),
      'Rubik-Light': require('./assets/fonts/rubik/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./assets/fonts/rubik/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./assets/fonts/rubik/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./assets/fonts/rubik/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./assets/fonts/rubik/Rubik-Regular.ttf'),
      'Rubik-SemiBold': require('./assets/fonts/rubik/Rubik-SemiBold.ttf'),
      'Rubik-SemiBoldItalic': require('./assets/fonts/rubik/Rubik-SemiBoldItalic.ttf'),
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