package com.danlutsevich.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

public class AnimalDetailFragment extends Fragment {

    private int animalId;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_animal_detail, container, false);
    }

    public void setAnimal(int id) {
        animalId = id;
    }

    @Override
    public void onStart() {
        super.onStart();
        View view = getView(); // ссылка на родительский макет фрагмента
        if (view != null) {
            TextView title = view.findViewById(R.id.textTitle); // обращаться напрямую к вьюшкам фрагмент не может
            Animal animal = Animal.animals[animalId];
            title.setText(animal.getName());
            TextView description = view.findViewById(R.id.textDescription);
            description.setText(animal.getDescription());
            ImageView img = view.findViewById(R.id.picture);
            img.setImageResource(animal.getId());
        }
    }
}