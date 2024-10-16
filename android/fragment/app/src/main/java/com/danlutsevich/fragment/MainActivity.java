package com.danlutsevich.fragment;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentTransaction;

public class MainActivity extends AppCompatActivity implements AnimalListFragment.AnimalListListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        itemClicked(0);
    }

    @Override
    public void itemClicked(long id) {
        AnimalDetailFragment details = new AnimalDetailFragment();
        FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
        details.setAnimal((int)id);
        ft.replace(R.id.fragment_container, details);
        ft.addToBackStack(null);
        ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
        ft.commit();
    }
}