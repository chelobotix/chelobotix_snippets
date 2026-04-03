# IONIC

```js
// ICONS

// TS
import { addIcons } from 'ionicons'
import { moon } from 'ionicons/icons'

constructor() {
  addIcons({ moon })
}

// HTML
<ion-button>
  <ion-icon slot="icon-only" name="moon" color="secondary"></ion-icon>
</ion-button>

```


```shell
# BUILD
ionic build --prod
npx cap sync android
npx cap open android

# Modificar version:
package.json
android/app/build.gradle

android {
    namespace "io.gaia_bolivia_software.calculadora_rico"
    compileSdk rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "io.gaia_bolivia_software.calculadora_rico"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 2
        versionName "1.0.2"


```
