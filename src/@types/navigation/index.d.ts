/* eslint-disable @typescript-eslint/no-empty-interface */
import { RootStackParamList } from '@routes/index'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
