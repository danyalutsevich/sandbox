package com.danlutsevich.wishlist;

import android.os.Bundle;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView wishList = findViewById(R.id.list1);
        TextView totalPrice = findViewById(R.id.total);

        String[] names = {"Something", "Nothing", "Anything"};
        int[] prices = {0, 3, 8};

        totalPrice.setText("Total price: " + Arrays.stream(prices).sum() + "$");
        boolean[] checked = {false, true, true};

        int pic = R.drawable.ic_launcher_background;

        ArrayList<HashMap<String, Object>> al = new ArrayList<>(names.length);
        HashMap<String, Object> map;

        String[] from = {"photo", "name", "check", "price"};
        int[] to = {R.id.img1, R.id.t1, R.id.cb1, R.id.t2};

        for (int i = 0; i < names.length; i++) {
            map = new HashMap<>();
            map.put(from[0], pic);
            map.put(from[1], names[i]);
            map.put(from[2], checked[i]);
            map.put(from[3], prices[i] + "$");
            al.add(map);
        }

        SimpleAdapter adapter = new SimpleAdapter(this, al, R.layout.list_item, from, to);

        wishList.setAdapter(adapter);
    }
}