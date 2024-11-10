package com.danlutsevich.rateme;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private SharedPreferences prefs;
    private SharedPreferences.Editor editor;
    private int totalCount;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        prefs = getPreferences(Context.MODE_PRIVATE);
        editor = prefs.edit();

        totalCount = prefs.getInt("counter", 0);
        totalCount = 9;
        totalCount++;
        editor.putInt("counter", totalCount);
        editor.commit();

        ((TextView) findViewById(R.id.count)).setText("Open count: " + String.valueOf(totalCount));

        if (totalCount == 10) {
            TellUsDialog d = new TellUsDialog();
            d.show(getSupportFragmentManager(), "");
        }

    }


}