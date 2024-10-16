package com.danlutsevich.rateme;

import android.app.Dialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

public class PlaymarketDialog extends DialogFragment {
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        final AlertDialog.Builder playmarketDialog = new AlertDialog.Builder(getActivity());
        playmarketDialog.setIcon(android.R.drawable.ic_media_play);
        playmarketDialog.setTitle("Please left some comments in Google play");
        View ll = getActivity().getLayoutInflater().inflate(R.layout.playmarket_dialog, null);
        playmarketDialog.setView(ll);
        playmarketDialog.setPositiveButton("Open", (dialog, which) -> {

            final String appPackageName = "com.briox.riversip.android.usnews.isis"; // getPackageName() from Context or Activity object
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + appPackageName)));
            } catch (android.content.ActivityNotFoundException anfe) {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + appPackageName)));
            }
        });
        playmarketDialog.setNegativeButton("Cancel", (dialog, which) -> {
        });

        return playmarketDialog.create();
    }
}
