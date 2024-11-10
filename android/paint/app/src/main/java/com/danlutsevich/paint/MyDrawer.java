package com.danlutsevich.paint;

import android.app.Notification;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Shader;
import android.view.View;

public class MyDrawer extends View {

    // такой конструктор необходим, так как у View нет конструктора по умолчанию
    public MyDrawer(Context context) {
        super(context);
    }

    // https://developer.android.com/reference/android/graphics/Paint.html
    // The Paint class holds the style and color information about how to
    // draw geometries, text and bitmaps.
//    private Paint p = new Paint();

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

//        // заливаем фон голубым цветом (небо)
//        p.setStyle(Paint.Style.FILL); // можно поменять на STROKE
//        p.setColor(Color.CYAN);
//        canvas.drawPaint(p);


//        // заливка градиентом
//        Shader shader = new LinearGradient(0, 0, 0, MainActivity.height, Color.BLUE, Color.CYAN, Shader.TileMode.CLAMP);
//        p.setShader(shader);
//        canvas.drawRect(new RectF(0, 0, MainActivity.width, MainActivity.height), p);
//        p.setShader(null);
//
//        // звёздочки
//        p.setStrokeCap(Paint.Cap.ROUND);
//        for (int i = 0; i < 200; i++) {
//            p.setARGB((int) (Math.random() * 128), 255, 255, 255);
//            p.setStrokeWidth((int) (Math.random() * 15));
//            canvas.drawPoint((int) (Math.random() * MainActivity.width), (int) (Math.random() * MainActivity.height), p);
//        }
//
//        // солнышко
//        int centerX = MainActivity.width / 2;
//        int centerY = MainActivity.height / 2;
//        p.setAntiAlias(true);
//        p.setStrokeCap(Paint.Cap.ROUND);
//        p.setStrokeWidth(20);
//
//        p.setColor(Color.RED);
//        canvas.drawCircle(centerX, centerY, 400, p);
//
//        p.setColor(Color.WHITE);
//        canvas.drawRect((float) MainActivity.width / 2-150, (float)MainActivity.height / 2-50, (float)MainActivity.width / 2 + 200, (float)MainActivity.height / 2 + 75,p);

//
//        // лучики
//        p.setARGB(64, 255, 255, 255);
//        p.setStrokeWidth(1);
//        float degree = 0.125f;
//        for (float i = 0; i < 360; i += degree) {
//            canvas.drawLine(centerX, centerY, -1500, centerY, p);
//            canvas.rotate(degree, centerX, centerY);
//        }
//
//        // трава
//        p.setColor(Color.parseColor("#A4C639"));
//        canvas.drawRect(0, 550, MainActivity.width, MainActivity.height, p);
//        p.setStrokeCap(Paint.Cap.ROUND);
//
//        // одуванчики
//        for (int i = 0; i < 1000; i++) {
//            float y = (int) (Math.random() * MainActivity.height) + 560;
//            p.setARGB(32, 255, 255, 0);
//            p.setStrokeWidth((int) ((y / 130) * (y / 130)));
//            canvas.drawPoint((int) (Math.random() * MainActivity.width), y, p);
//        }
//
//        // текст
//        p.setColor(Color.BLUE);
//        p.setTextSize(40);
//        canvas.rotate(-20, 30, 675);
//        canvas.drawText("Android 14", 30, 675, p);

//        // бульбазавр
//        Bitmap b = BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher_background);
//        canvas.drawBitmap(Bitmap.createScaledBitmap(b, 200, 200, false), 700, 800, p);
//    }
    }
}