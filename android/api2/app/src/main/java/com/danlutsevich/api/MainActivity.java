package com.danlutsevich.api;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {
    private TextView jokeTextView;
    private Button fetchJokeButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        jokeTextView = findViewById(R.id.jokeTextView);
        fetchJokeButton = findViewById(R.id.fetchJokeButton);

        fetchJokeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fetchJoke();
            }
        });
    }

    private void fetchJoke() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    final String joke = ChuckNorrisApiClient.fetchJoke();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            jokeTextView.setText(joke);
                        }
                    });
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }
}
