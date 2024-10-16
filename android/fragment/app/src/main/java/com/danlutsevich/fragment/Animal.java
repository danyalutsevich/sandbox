package com.danlutsevich.fragment;

public class Animal {
    private String name;
    private String description;
    private int idPicture;

    public static final Animal[] animals = {
            new Animal("Котик", "The domestic cat is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.", R.drawable.c),
            new Animal("Бегемотик", "The common hippopotamus, or hippo, is a large, mostly herbivorous mammal in sub-Saharan Africa, and one of only two extant species in the family Hippopotamidae, the other being the pygmy hippopotamus.", R.drawable.b),
            new Animal("Енотик", "Procyon is a genus of nocturnal mammals, comprising three species commonly known as raccoons, in the family Procyonidae.", R.drawable.e),
    };

    private Animal(String name, String description, int id) {
        this.name = name;
        this.description = description;
        idPicture = id;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return idPicture;
    }

    @Override
    public String toString() {
        return name;
    }
}