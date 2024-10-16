package com.danlutsevich.notifications;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

// Более свежий пример, как сделать всё правильно для SDK34+
// https://developer.android.com/develop/ui/views/notifications/build-notification

public class MainActivity extends AppCompatActivity {

    private static final int REQUEST_POST_NOTIFICATIONS_PERMISSION = 1;
    private static final String CHANNEL_ID = "alex_channel";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        checkNotificationsPermission();
    }

    // Проверка и запрос разрешения на уведомления
    private void checkNotificationsPermission() {
        if (isNotificationsPermissionGranted()) {
            showToast("granted");
        } else {
            requestNotificationsPermission();
        }
    }

    // Проверка, предоставлено ли разрешение на уведомления
    private boolean isNotificationsPermissionGranted() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                == PackageManager.PERMISSION_GRANTED;
    }

    // Запрос разрешения на уведомления
    private void requestNotificationsPermission() {
        ActivityCompat.requestPermissions(
                this,
                new String[]{Manifest.permission.POST_NOTIFICATIONS},
                REQUEST_POST_NOTIFICATIONS_PERMISSION
        );
    }

    // Обработка результата запроса разрешения
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == REQUEST_POST_NOTIFICATIONS_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                showToast("granted");
            } else {
                showToast("denied");
            }
        }
    }

    // Вывод тоста
    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    // Обработчик нажатия на кнопку
    public void onClick(View view) {
        // Менеджер уведомлений
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        NotificationCompat.Builder builder;

        Context context = getApplicationContext();
        Resources res = context.getResources();

        // Создание канала уведомлений для SDK >= 26
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel(manager);
            builder = new NotificationCompat.Builder(this, CHANNEL_ID);
        } else {
            builder = new NotificationCompat.Builder(context);
        }

        // PendingIntent для открытия активности при нажатии на уведомление
        PendingIntent action = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class), PendingIntent.FLAG_IMMUTABLE);
        RemoteViews notificationLayout = new RemoteViews(getPackageName(), R.layout.notification_layout);
        RemoteViews notificationExpandedLayout = new RemoteViews(getPackageName(), R.layout.notification_expanded_layout);
        // Настройка параметров уведомления
        builder.setContentIntent(action)
                .setLargeIcon(BitmapFactory.decodeResource(res, R.drawable.ic_launcher_background))
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setTicker("Тестовое уведомление: проверьте работу приложения")
                .setAutoCancel(true)
                .setCustomBigContentView(notificationExpandedLayout)
                .setCustomContentView(notificationLayout);
//                .setContentTitle("Тестовое уведомление: Проверка связи с приложением")
//                .setContentText("Привет! Это тестовое уведомление. Если вы видите это сообщение, значит, уведомления работают в вашем приложении. Удачного тестирования!");

        // Создание и отправка уведомления
        Notification notification = builder.build();
        long notificationCode = System.currentTimeMillis();
        manager.notify((int) notificationCode, notification);
    }

    // Создание канала уведомлений для SDK >= 26
    private void createNotificationChannel(NotificationManager manager) {
        if (manager.getNotificationChannel(CHANNEL_ID) == null) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "AlexChannel", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("Alex channel description");
            manager.createNotificationChannel(channel);
        }
    }
}
