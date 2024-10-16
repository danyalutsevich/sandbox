package com.danlutsevich.rateme;

import android.app.Dialog;
import android.os.Bundle;
import android.view.View;
import android.widget.RatingBar;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

public class TellUsDialog extends DialogFragment {

    public RatingBar rating;

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {

        final AlertDialog.Builder ratingdialog = new AlertDialog.Builder(getActivity());

        ratingdialog.setIcon(android.R.drawable.btn_star_big_on);
        ratingdialog.setTitle("Нравится ли Вам это приложение?");

// https://android.jlelse.eu/centering-views-in-android-layouts-547930621de7
        View ll = getActivity().getLayoutInflater().inflate(R.layout.dialog_layout, null);
        ratingdialog.setView(ll);

        rating = ll.findViewById(R.id.rb1);

        ratingdialog.setPositiveButton("Ok",
                        (dialog, which) -> {

                            float ratingNum = rating.getRating();
                            Toast.makeText(getActivity(), ratingNum + "", Toast.LENGTH_SHORT).show();

                            if (ratingNum <= 3) {
                                FeedbackDialog feedbackDialog = new FeedbackDialog();
                                feedbackDialog.show(getActivity().getSupportFragmentManager(), "");
                            } else {
                                PlaymarketDialog playmarketDialog = new PlaymarketDialog();
                                playmarketDialog.show(getActivity().getSupportFragmentManager(), "");
                            }

                        }
                )

                .setNegativeButton("Cancel",
                        (dialog, id) -> dialog.cancel());

        return ratingdialog.create();
    }
}
