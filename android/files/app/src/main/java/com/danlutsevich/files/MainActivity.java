package com.danlutsevich.files;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText login, pass;
    SharedPreferences pref;

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
        totalCount++;
        ((TextView) findViewById(R.id.count)).setText("Open count: " + String.valueOf(totalCount));


        editor.putInt("counter", totalCount);
        editor.commit();

        login = findViewById(R.id.login);
        pass = findViewById(R.id.pass);
    }

    public void handler(View v) {
        if (v.getId() == R.id.save) {
            pref = getPreferences(MODE_PRIVATE);
            SharedPreferences.Editor ed = pref.edit();
            ed.putString("login", login.getText().toString());
            ed.putString("password", pass.getText().toString());
            ed.apply();
        }
        if (v.getId() == R.id.load) {
            pref = getPreferences(MODE_PRIVATE);
            login.setText(pref.getString("login", ""));
            pass.setText(pref.getString("password", ""));
        }
        if (v.getId() == R.id.toSettings) {
            Intent settingsIntent = new Intent(getApplicationContext(), SettingsActivity.class);
            startActivity(settingsIntent);
        }
    }
}