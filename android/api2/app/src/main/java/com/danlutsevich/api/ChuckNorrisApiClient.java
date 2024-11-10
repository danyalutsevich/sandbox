package com.danlutsevich.api;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class ChuckNorrisApiClient {
    public static String fetchJoke() throws IOException, JSONException {
        URL url = new URL("https://api.chucknorris.io/jokes/random");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        InputStream inputStream = connection.getInputStream();
        Scanner scanner = new Scanner(inputStream);
        scanner.useDelimiter("\\A");

        boolean hasInput = scanner.hasNext();
        if (hasInput) {
            String jsonResponse = scanner.next();
            JSONObject jsonObject = new JSONObject(jsonResponse);
            return jsonObject.getString("value");
        } else {
            return null;
        }
    }
}
