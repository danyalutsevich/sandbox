package com.example.test;

import android.os.Bundle;
import android.os.Handler;
import android.view.KeyEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    EditText edit;
    ListView list;

    ArrayList<String> info;
    ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        list = findViewById(R.id.list1);
        edit = findViewById(R.id.edit1);

        info = new ArrayList<>();

        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, info);

        list.setAdapter(adapter);

        edit.setOnKeyListener((v, keyCode, event) -> {
            if (event.getAction() == KeyEvent.ACTION_DOWN)
                if (keyCode == KeyEvent.KEYCODE_ENTER) {
                    add(null);
                    return true;
                }
            return false;
        });

        list.setOnItemClickListener((parent, v, position, id) ->
                Toast.makeText(getApplicationContext(), ((TextView) v).getText(), Toast.LENGTH_SHORT).show());
    }

    public void add(View v) {
        info.add(0, edit.getText().toString());
        adapter.notifyDataSetChanged();
        edit.setText("");

        new Handler().postDelayed(() -> edit.requestFocus(), 150);
    }
}
