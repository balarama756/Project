module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Version 3.16.5
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@service': './src/service',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@state': './src/state',
          '@styles': './src/styles'
        },
      },
    ],
  ],
};
