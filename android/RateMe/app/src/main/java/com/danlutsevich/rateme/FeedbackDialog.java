package com.danlutsevich.rateme;

import android.app.Dialog;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

public class FeedbackDialog extends DialogFragment {
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        final AlertDialog.Builder feedbackDialog = new AlertDialog.Builder(getActivity());
        feedbackDialog.setIcon(android.R.drawable.ic_media_play);
        feedbackDialog.setTitle("How can we improve this app?");
        View ll = getActivity().getLayoutInflater().inflate(R.layout.feedback_dialog, null);
        feedbackDialog.setView(ll);
        feedbackDialog.setPositiveButton("Send", (dialog, which) -> {
        });
        feedbackDialog.setNegativeButton("Cancel", (dialog, which) -> {
        });

        return feedbackDialog.create();
    }
}
