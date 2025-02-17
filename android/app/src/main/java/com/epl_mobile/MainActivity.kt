package com.epl_mobile

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this) // Show splash screen
        super.onCreate(savedInstanceState)

        // Delay hiding the splash screen (e.g., 3 seconds)
        Handler(Looper.getMainLooper()).postDelayed({
            SplashScreen.hide(this)
        }, 8000) // Change 3000 to desired milliseconds
    }

    override fun getMainComponentName(): String = "EPL_MOBILE"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
