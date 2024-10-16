package com.danlutsevich.mp3;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.music = MediaPlayer.create(MainActivity.this, R.raw.music);
        music.setLooping(true);
    }

    private MediaPlayer music;

    public void d(View view) {
        if (music.isPlaying()) {
            music.stop();
        } else {
            music.start();
        }
    }
}