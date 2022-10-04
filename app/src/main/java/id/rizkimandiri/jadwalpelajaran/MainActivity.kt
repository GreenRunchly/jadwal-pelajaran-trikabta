package id.rizkimandiri.jadwalpelajaran

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.View
//import android.webkit.WebSettings.*
import android.webkit.WebView
import android.webkit.WebViewClient
//import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.*

class MainActivity : AppCompatActivity() {

    lateinit var adView : AdView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        /* AdMob Action */
        // Set Test Device
        val testDeviceIds = listOf("114D091401CBB4D34FB80E68FE66F1ED")
        val configuration = RequestConfiguration.Builder().setTestDeviceIds(testDeviceIds).build()
        MobileAds.setRequestConfiguration(configuration)
        // Load an ad into the AdMob banner view.
        adView = findViewById<View>(R.id.adView) as AdView
        val adRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)

        /* AdMob Listener
        adView.adListener = object : AdListener(){
            override fun onAdFailedToLoad(p0: LoadAdError) {
                super.onAdFailedToLoad(p0)
                val toastMessage = "ad fail to load"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }
            override fun onAdLoaded() {
                super.onAdLoaded()
                val toastMessage = "ad loaded"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }
            override fun onAdOpened() {
                super.onAdOpened()
                val toastMessage = "ad is open"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }
            override fun onAdClicked() {
                super.onAdClicked()
                val toastMessage = "ad is clicked"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }

            override fun onAdClosed() {
                super.onAdClosed()
                val toastMessage = "ad is closed"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }
            override fun onAdImpression() {
                super.onAdImpression()
                val toastMessage = "ad impression"
                Toast.makeText(applicationContext, toastMessage, Toast.LENGTH_LONG).show()
            }
        }*/
        /* AdMob Action */

        val mWebView = findViewById<View>(R.id.WebView) as WebView
        mWebView.loadUrl("file:///android_asset/index.html")

        val webSetting = mWebView.settings
        webSetting.javaScriptEnabled = true
        webSetting.allowFileAccess = true
        webSetting.domStorageEnabled = true
        webSetting.allowFileAccess = true

        mWebView.webViewClient = WebViewClient()
        mWebView.scrollBarStyle = View.SCROLLBARS_INSIDE_OVERLAY
        mWebView.isVerticalScrollBarEnabled = false
        mWebView.isHorizontalScrollBarEnabled = false

        class MyWebViewClient : WebViewClient() {

            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                if (url != null && (url.startsWith("file:///"))) {
                    return false
                }else{
                    // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
                    Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                        startActivity(this); return true
                    }
                }
            }
        }
        val myWebView: WebView = mWebView
        myWebView.webViewClient = MyWebViewClient()


        mWebView.canGoBack()
        mWebView.setOnKeyListener(View.OnKeyListener{ _, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_BACK

                && event.action == MotionEvent.ACTION_UP
                && mWebView.canGoBack()){
                mWebView.goBack()
                return@OnKeyListener true
            }
            false
        })
    }

    override fun onDestroy() {
        adView.destroy()
        super.onDestroy()
    }
}