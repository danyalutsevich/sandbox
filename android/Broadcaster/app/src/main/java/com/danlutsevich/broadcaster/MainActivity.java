package com.danlutsevich.broadcaster;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void sendMessage(View view) {

        Intent intent = new Intent();
        intent.setAction("APP_SPECIFIC_BROADCAST");
        intent.putExtra("com.danlutsevich.reciever", "THIS IS BROADCAST MESSAGE");
        intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        sendBroadcast(intent);
        Toast.makeText(this, "broadcast sent", Toast.LENGTH_SHORT).show();

    }


}