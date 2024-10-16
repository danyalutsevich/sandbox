package com.danlutsevich.reciever;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.google.android.material.snackbar.Snackbar;

public class LeBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "LeBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        StringBuilder sb = new StringBuilder();
        sb.append("Action: " + intent.getAction() + "\n");
        sb.append("URI: " + intent.toUri(Intent.URI_INTENT_SCHEME).toString() + "\n");
        String log = sb.toString();
        Log.d(TAG, log);

        Toast.makeText(context, log, Toast.LENGTH_LONG).show();
//        ActivityNameBinding binding =
//                ActivityNameBinding.inflate(layoutInflater);
//        val view = binding.root;
//        setContentView(view);

//        Snackbar.make(view, log, Snackbar.LENGTH_LONG).show();
    }
}