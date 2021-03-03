<<<<<<< HEAD:android/app/src/wxapi/WXEntryActivity.java
package com.zhouqiaozhijia_ghj.wxapi;
=======
package com.zhaoqiaozhijia_ghj.wxapi;
>>>>>>> 9346031bff7c5e2e3ec1944cb35ff888bcdafaa7:android/app/src/main/java/com/zhaoqiaozhijia_ghj/wxapi/WXEntryActivity.java

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
