### Get Start

## 安装依赖

```bash
$ yarn install
$ yarn podInstall
```

## 安卓端调试

```bash
$ npx taro build --type rn --platform android --watch --reset-cache
$ yarn android
```

## 安卓端打包

```bash
$ npx taro build --type rn --platform android --reset-cache
$ cd android
$ ./gradlew assemble
$ adb install ./app/build/outputs/apk/release/app-release.apk
```

## 安卓端更新 bundle

```bash
$ npx taro build --type rn --platform android --reset-cache
$ appcenter codepush release -c android/app/build/generated/assets/react/release/index.android.bundle -a silver47gin-gmail/tools-android
```

## ios 端调试

```bash
$ npx taro build --type rn --platform --reset-cache --watch android
$ yarn ios
```

## ios 打包

- 使用 xcode 打开 ios 文件夹
- 选择 taroDemo 的 Scheme 和 Any Device 的 Destination
- 点击菜单上的 Product -> Archive
- 点击菜单中的 Window -> Organizar
- 选中生成的 Archive，点击 Distribute APP，按照需要选择后续

## ios 更新 bundle

```bash
$ npx taro build --type rn --platform ios --reset-cache
$ appcenter codepush release -c ios/main.jsbundle -a silver47gin-gmail/tools-ios
```
