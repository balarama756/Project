import { CommonActions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const resetAndNavigate = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      })
    );
  }
}; 