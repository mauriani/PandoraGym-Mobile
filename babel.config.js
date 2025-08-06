module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@services': './src/services',
          '@_dtos_': './src/_dtos_',
          '@hooks': './src/hooks',
          '@context': './src/context',
          '@lib': './src/lib',
        },
      },
    ],
  ],
}
