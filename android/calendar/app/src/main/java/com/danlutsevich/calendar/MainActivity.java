package com.danlutsevich.calendar;

import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.CalendarContract;
import android.provider.CallLog;
import android.provider.Telephony;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ListView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class MainActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_WRITE_CALENDAR = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView listView = findViewById(R.id.list_view_events);

        if (checkSelfPermission(Manifest.permission.READ_CALL_LOG) != PackageManager.PERMISSION_GRANTED) {
            // Request the permission
            requestPermissions(new String[]{Manifest.permission.READ_CALL_LOG}, 1);
        } else {
            // Permission has already been granted
            // Proceed with accessing call log data
            List<String> callLogList = getCallLogList();
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, callLogList);
            listView.setAdapter(adapter);
        }

//        if (checkSelfPermission(android.Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
//            // Request the permission
//            requestPermissions(new String[]{android.Manifest.permission.READ_SMS}, 1);
//        } else {
//            // Permission has already been granted
//            // Proceed with accessing SMS data
//            List<String> smsList = getSmsList();
//            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, smsList);
//            listView.setAdapter(adapter);
//        }
//
//        List<String> eventTitles = this.getEvents();
//
//
//        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, R.layout.event_layout, eventTitles);
//        listView.setAdapter(adapter);
//
//        Button addBirthdayButton = findViewById(R.id.addBirthdayButton);
//        DatePicker datePicker = findViewById(R.id.datePicker);
//
//        addBirthdayButton.setOnClickListener(view -> requestCalendarPermissionAndAddEvent(datePicker));
    }


    private List<String> getCallLogList() {
        List<String> callLogList = new ArrayList<>();
        ContentResolver contentResolver = getContentResolver();

        // Define the URI for the Call Log content provider
        Uri uri = CallLog.Calls.CONTENT_URI;

        // Define the columns you want to retrieve
        String[] projection = new String[]{
                CallLog.Calls._ID,
                CallLog.Calls.NUMBER,
                CallLog.Calls.DATE,
                CallLog.Calls.DURATION,
                CallLog.Calls.TYPE
        };

        // Perform the query
        Cursor cursor = contentResolver.query(uri, projection, null, null, null);

        if (cursor != null) {
            while (cursor.moveToNext()) {
                // Retrieve data from the cursor
                String number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER));
                long dateMillis = cursor.getLong(cursor.getColumnIndex(CallLog.Calls.DATE));
                String duration = cursor.getString(cursor.getColumnIndex(CallLog.Calls.DURATION));
                int callType = cursor.getInt(cursor.getColumnIndex(CallLog.Calls.TYPE));

                // Format the call type
                String callTypeStr = "";
                switch (callType) {
                    case CallLog.Calls.INCOMING_TYPE:
                        callTypeStr = "Incoming";
                        break;
                    case CallLog.Calls.OUTGOING_TYPE:
                        callTypeStr = "Outgoing";
                        break;
                    case CallLog.Calls.MISSED_TYPE:
                        callTypeStr = "Missed";
                        break;
                }

                // Format the call date
                Date date = new Date(dateMillis);
                String callDate = date.toString();

                // Format the call log entry
                String callLogEntry = "Number: " + number + "\n" +
                        "Date: " + callDate + "\n" +
                        "Duration: " + duration + " seconds" + "\n" +
                        "Type: " + callTypeStr;

                callLogList.add(callLogEntry);
            }
            cursor.close(); // Close the cursor when done
        }

        return callLogList;
    }

    private List<String> getSmsList() {
        List<String> smsList = new ArrayList<>();
        ContentResolver contentResolver = getContentResolver();

        // Define the URI for the SMS content provider
        Uri uri = Telephony.Sms.CONTENT_URI;

        // Define the columns you want to retrieve
        String[] projection = new String[] {
                Telephony.Sms._ID,
                Telephony.Sms.ADDRESS,
                Telephony.Sms.BODY,
                Telephony.Sms.DATE
        };

        // Perform the query
        Cursor cursor = contentResolver.query(uri, projection, null, null, null);

        if (cursor != null) {
            while (cursor.moveToNext()) {
                // Retrieve data from the cursor
                String address = cursor.getString(cursor.getColumnIndex(Telephony.Sms.ADDRESS));
                String body = cursor.getString(cursor.getColumnIndex(Telephony.Sms.BODY));
                String date = cursor.getString(cursor.getColumnIndex(Telephony.Sms.DATE));

                // Format the SMS message
                String smsMessage = "From: " + address + "\n" +
                        "Message: " + body + "\n" +
                        "Date: " + date;
                System.out.println(smsMessage);
                smsList.add(smsMessage);
            }
            cursor.close(); // Close the cursor when done
        }

        return smsList;
    }

//    @RequiresApi(api = Build.VERSION_CODES.N)
//    private void requestCalendarPermissionAndAddEvent(DatePicker datePicker) {
//        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_CALENDAR)
//                != PackageManager.PERMISSION_GRANTED) {
//            ActivityCompat.requestPermissions(this,
//                    new String[]{Manifest.permission.WRITE_CALENDAR},
//                    PERMISSION_REQUEST_WRITE_CALENDAR);
//        } else {
//            addBirthdayToCalendar(datePicker);
//        }
//    }
//
//    @RequiresApi(api = Build.VERSION_CODES.N)
//    private void addBirthdayToCalendar(DatePicker datePicker) {
//        int year = datePicker.getYear();
//        int month = datePicker.getMonth();
//        int day = datePicker.getDayOfMonth();
//
//        Calendar birthdayDate = Calendar.getInstance();
//        birthdayDate.set(year, month, day);
//
//        long startMillis = birthdayDate.getTimeInMillis();
//        long endMillis = startMillis + 60 * 60 * 1000; // 1 hour
//
//        ContentResolver contentResolver = getContentResolver();
//        ContentValues values = new ContentValues();
//
//        values.put(CalendarContract.Events.DTSTART, startMillis);
//        values.put(CalendarContract.Events.DTEND, endMillis);
//        values.put(CalendarContract.Events.TITLE, "День Рождения");
//        values.put(CalendarContract.Events.DESCRIPTION, "Событие: День Рождения");
//        values.put(CalendarContract.Events.CALENDAR_ID, 1); // ID календаря, чаще всего 1
//        values.put(CalendarContract.Events.EVENT_TIMEZONE, TimeZone.getDefault().getID());
//
//        getContentResolver().insert(CalendarContract.Events.CONTENT_URI, values);
//
//
//        CalendarContract.Events.
//                Toast.makeText(this, "Событие Дня Рождения добавлено в календарь", Toast.LENGTH_SHORT).show();
//    }


    public List<String>  getEvents() {

        List<String> eventTitles = new ArrayList<>();
        Uri uri = CalendarContract.Events.CONTENT_URI;
//        grantUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        String[] projection = new String[]{
//                CalendarContract.Events._ID,
                CalendarContract.Events.TITLE,
//                CalendarContract.Events.DTSTART,
//                CalendarContract.Events.DTEND
        };
        ContentResolver contentResolver = getContentResolver();
        Cursor cursor = contentResolver.query(uri, projection, null, null, null);

        if (cursor != null) {
            while (cursor.moveToNext()) {

//                long eventId = cursor.getLong(cursor.getColumnIndex(CalendarContract.Events._ID));
                String title = cursor.getString(cursor.getColumnIndex(CalendarContract.Events.TITLE));
//                long startTime = cursor.getLong(cursor.getColumnIndex(CalendarContract.Events.DTSTART));
//                long endTime = cursor.getLong(cursor.getColumnIndex(CalendarContract.Events.DTEND));


                eventTitles.add(title);

//                System.out.println("Event ID: " + eventId);
//                System.out.println("Title: " + title);
//                System.out.println("Start Time: " + startTime);
//                System.out.println("End Time: " + endTime);
            }
            cursor.close(); // Close the cursor when done
        }
        return eventTitles;
    }


//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        if (requestCode == PERMISSION_REQUEST_WRITE_CALENDAR) {
//            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                addBirthdayToCalendar(findViewById(R.id.datePicker));
//            } else {
//                Toast.makeText(this, "Разрешение на запись в календарь отклонено", Toast.LENGTH_SHORT).show();
//            }
//        }
//    }
}