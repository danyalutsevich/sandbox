package com.danlutsevich.fragment;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.fragment.app.ListFragment;

public class AnimalListFragment extends ListFragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        String[] names = new String[Animal.animals.length];
        for (int i = 0; i < names.length; i++) {
            names[i] = Animal.animals[i].getName();
        }
        ArrayAdapter<String> adapter = new ArrayAdapter<>(inflater.getContext(), android.R.layout.simple_list_item_1, names);
        setListAdapter(adapter);

        return super.onCreateView(inflater, container, savedInstanceState);
    }

    interface AnimalListListener {
        void itemClicked(long id);
    }

    private AnimalListListener listener;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        if (context instanceof AnimalListListener) {
            listener = (AnimalListListener) context;
        }
    }

    @Override
    public void onListItemClick(ListView l, View v, int position, long id) {
        if (listener != null) {
            listener.itemClicked(id);
        }
    }
}