package com.danlutsevich.threads;

import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

public class MainActivity extends AppCompatActivity {

    Button b;
    ImageView i;
    ProgressBar pb;

    static String file_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/375px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        b = findViewById(R.id.btnProgressBar);
        i = findViewById(R.id.my_image);
        pb = findViewById(R.id.progressBar);

        b.setOnClickListener(v -> new DownloadFileFromURL().execute(file_url));
    }

    class DownloadFileFromURL extends AsyncTask<String, String, String> {

        @Override
        protected String doInBackground(String... f_url) {
            int count;
            try {
                URL url = new URL(f_url[0]);
                URLConnection conection = url.openConnection();
                conection.connect();

                int lengthOfFile = conection.getContentLength();

                InputStream input = new BufferedInputStream(url.openStream(), 8192);

                String filePath = getFilesDir() + "/downloadedfile.jpg";

                OutputStream output = new FileOutputStream(filePath);

                byte data[] = new byte[1024];

                long total = 0;

                while ((count = input.read(data)) != -1) {
                    total += count;
                    // publishing the progress....
                    // After this onProgressUpdate will be called
                    publishProgress("" + (int) ((total * 100) / lengthOfFile));

                    // writing data to file
                    output.write(data, 0, count);
                }

                output.flush();

                output.close();
                input.close();

                return filePath;
            } catch (Exception ignored) {
            }
            return null;
        }

        protected void onProgressUpdate(String... progress) {
            pb.setProgress(Integer.parseInt(progress[0]));
        }

        @Override
        protected void onPostExecute(String filePath) {
            if (filePath != null) {
                i.setImageDrawable(Drawable.createFromPath(filePath));
                Toast.makeText(MainActivity.this, "Файл сохранен во внутреннюю память приложения", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(MainActivity.this, "Ошибка при загрузке файла", Toast.LENGTH_SHORT).show();
            }
        }
    }
}