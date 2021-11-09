package id.rizkimandiri.jadwalpelajaran;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends AppCompatActivity {

  private Context contextPop;
  private WebView webViewPop;
  private AlertDialog builder;

  private String url = "file:///android_asset/index.html";

  private WebView webView;
  private String userAgent;

  private AdView adView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {

      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      ///ca-app-pub-3940256099942544/6300978111 test
      MobileAds.initialize(this, "ca-app-pub-8641844379696896/4515918796");

      adView = findViewById(R.id.adView);
      AdRequest adRequest = new AdRequest.Builder().build();
      adView.loadAd(adRequest);

      webView = findViewById(R.id.webView);
      webView.setWebViewClient(new WebViewClient());
      webView.loadUrl(url);

      WebSettings webSettings = webView.getSettings();
      webSettings.setJavaScriptEnabled(true);

      // Set User Agent
      userAgent = System.getProperty("http.agent");
      webSettings.setUserAgentString(userAgent + "WebViewApp Jadwal Pelajaran/1");

      // Enable Cookies
      CookieManager.getInstance().setAcceptCookie(true);
      if(android.os.Build.VERSION.SDK_INT >= 21)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

      // WebView Tweaks
      webSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
      webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
      webSettings.setAppCacheEnabled(true);
      webSettings.setDomStorageEnabled(true);
      webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
      webSettings.setUseWideViewPort(true);
      webSettings.setSaveFormData(true);
      webSettings.setEnableSmoothTransition(true);
      webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

      // Handle Popups
      webView.setWebChromeClient(new CustomChromeClient());
      webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
      webSettings.setSupportMultipleWindows(true);
      contextPop = this.getApplicationContext();
  }

  @Override
  public void onBackPressed() {

    if(webView.canGoBack()) {
      webView.goBack();
    }
    else {
      //super.onBackPressed();
      // Terminate the app
      finishAffinity();
      System.exit(0);
    }
  }

  class CustomChromeClient extends WebChromeClient {

    @Override
    public boolean onCreateWindow(WebView view, boolean isDialog,
                                  boolean isUserGesture, Message resultMsg) {
      webViewPop = new WebView(contextPop);
      webViewPop.setVerticalScrollBarEnabled(false);
      webViewPop.setHorizontalScrollBarEnabled(false);
      webViewPop.setWebChromeClient(new CustomChromeClient());
      webViewPop.getSettings().setJavaScriptEnabled(true);
      webViewPop.getSettings().setSaveFormData(true);
      webViewPop.getSettings().setEnableSmoothTransition(true);
      webViewPop.getSettings().setUserAgentString(userAgent + "WebViewApp Jadwal Pelajaran/1");

      // set the WebView as the AlertDialog.Builder’s view
      builder = new AlertDialog.Builder(MainActivity.this, AlertDialog.THEME_DEVICE_DEFAULT_LIGHT).create();
      builder.setTitle("");
      builder.setView(webViewPop);

      builder.setButton("Close", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int id) {
          webViewPop.destroy();
          dialog.dismiss();
        }
      });

      builder.show();
      builder.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE|WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM);

      CookieManager cookieManager = CookieManager.getInstance();
      cookieManager.setAcceptCookie(true);
      if(android.os.Build.VERSION.SDK_INT >= 21) {
        cookieManager.setAcceptThirdPartyCookies(webViewPop, true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);
      }

      WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
      transport.setWebView(webViewPop);
      resultMsg.sendToTarget();

      return true;
    }

    @Override
    public void onCloseWindow(WebView window) {
      //Toast.makeText(contextPop,"onCloseWindow called",Toast.LENGTH_SHORT).show();
      try {
        webViewPop.destroy();
      } catch (Exception e) {
        Log.d("Webview Destroy Error: ", e.getStackTrace().toString());
      }

      try {
        builder.dismiss();
      } catch (Exception e) {
        Log.d("Builder Dismiss Error: ", e.getStackTrace().toString());
      }

    }
  }
}