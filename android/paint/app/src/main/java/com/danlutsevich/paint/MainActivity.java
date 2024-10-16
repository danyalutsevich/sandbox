package com.danlutsevich.paint;

import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.LimitLine;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.IFillFormatter;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.github.mikephil.charting.highlight.Highlight;
import com.github.mikephil.charting.interfaces.dataprovider.LineDataProvider;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.listener.OnChartValueSelectedListener;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.github.mikephil.charting.utils.Utils;

import java.util.ArrayList;
import java.util.List;

// https://github.com/PhilJay/MPAndroidChart#usage

public class MainActivity extends AppCompatActivity {

    String[] info = {"Занят", "Не слышит", "Забыл дома", "В полиции", "В ТЦК", "В морге"};

    private LineChart chart;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
//        getSupportActionBar().hide();

//        PieChart pieChart = findViewById(R.id.piechart);


//        LineChart lineChart = findViewById(R.id.bitcoin);
//        LineData data = new LineData();
//        lineChart.setData();

        {   // // Chart Style // //
            chart = findViewById(R.id.bitcoin);

            // background color
            chart.setBackgroundColor(Color.WHITE);

            // disable description text
            chart.getDescription().setEnabled(false);

            // enable touch gestures
            chart.setTouchEnabled(true);

            // set listeners
//            chart.setOnChartValueSelectedListener(this);
            chart.setDrawGridBackground(false);

            // create marker to display box when values are selected
//            MyMarkerView mv = new MyMarkerView(this, R.layout.custom_marker_view);

            // Set the marker to the chart
//            mv.setChartView(chart);
//            chart.setMarker(mv);

            // enable scaling and dragging
            chart.setDragEnabled(true);
            chart.setScaleEnabled(true);
            // chart.setScaleXEnabled(true);
            // chart.setScaleYEnabled(true);

            // force pinch zoom along both axis
            chart.setPinchZoom(true);
        }

        XAxis xAxis;
        {   // // X-Axis Style // //
            xAxis = chart.getXAxis();

            // vertical grid lines
            xAxis.enableGridDashedLine(10f, 10f, 0f);
        }

        YAxis yAxis;
        {   // // Y-Axis Style // //
            yAxis = chart.getAxisLeft();

            // disable dual axis (only use LEFT axis)
            chart.getAxisRight().setEnabled(false);

            // horizontal grid lines
            yAxis.enableGridDashedLine(10f, 10f, 0f);

            // axis range
            yAxis.setAxisMaximum(200f);
            yAxis.setAxisMinimum(-50f);
        }


        {   // // Create Limit Lines // //
            LimitLine llXAxis = new LimitLine(9f, "Index 10");
            llXAxis.setLineWidth(4f);
            llXAxis.enableDashedLine(10f, 10f, 0f);
            llXAxis.setLabelPosition(LimitLine.LimitLabelPosition.RIGHT_BOTTOM);
            llXAxis.setTextSize(10f);
//            llXAxis.setTypeface(tfRegular);

            LimitLine ll1 = new LimitLine(150f, "Upper Limit");
            ll1.setLineWidth(4f);
            ll1.enableDashedLine(10f, 10f, 0f);
            ll1.setLabelPosition(LimitLine.LimitLabelPosition.RIGHT_TOP);
            ll1.setTextSize(10f);
//            ll1.setTypeface(tfRegular);

            LimitLine ll2 = new LimitLine(-30f, "Lower Limit");
            ll2.setLineWidth(4f);
            ll2.enableDashedLine(10f, 10f, 0f);
            ll2.setLabelPosition(LimitLine.LimitLabelPosition.RIGHT_BOTTOM);
            ll2.setTextSize(10f);
//            ll2.setTypeface(tfRegular);

            // draw limit lines behind data instead of on top
            yAxis.setDrawLimitLinesBehindData(true);
            xAxis.setDrawLimitLinesBehindData(true);

            // add limit lines
            yAxis.addLimitLine(ll1);
            yAxis.addLimitLine(ll2);
            //xAxis.addLimitLine(llXAxis);
        }

        // add data
//        seekBarX.setProgress(45);
//        seekBarY.setProgress(180);
//        setData(45, 180);

        // draw points over time
        chart.animateX(1500);

        // get the legend (only possible after setting data)
        Legend l = chart.getLegend();

        // draw legend entries as lines
        l.setForm(Legend.LegendForm.LINE);

        ArrayList<Entry> values = new ArrayList<>();

        int count = 5;
        int range = 50;

        for (int i = 0; i < count; i++) {

            float val = (float) (Math.random() * range) - 30;
            values.add(new Entry(i, val, getResources().getDrawable(R.drawable.ic_launcher_background)));
        }


        LineDataSet set1;

        if (chart.getData() != null &&
                chart.getData().getDataSetCount() > 0) {
            set1 = (LineDataSet) chart.getData().getDataSetByIndex(0);
            set1.setValues(values);
            set1.notifyDataSetChanged();
            chart.getData().notifyDataChanged();
            chart.notifyDataSetChanged();
        } else {
            // create a dataset and give it a type
            set1 = new LineDataSet(values, "DataSet 1");

            set1.setDrawIcons(false);

            // draw dashed line
            set1.enableDashedLine(10f, 5f, 0f);

            // black lines and points
            set1.setColor(Color.BLACK);
            set1.setCircleColor(Color.BLACK);

            // line thickness and point size
            set1.setLineWidth(1f);
            set1.setCircleRadius(3f);

            // draw points as solid circles
            set1.setDrawCircleHole(false);

            // customize legend entry
            set1.setFormLineWidth(1f);
            set1.setFormLineDashEffect(new DashPathEffect(new float[]{10f, 5f}, 0f));
            set1.setFormSize(15.f);

            // text size of values
            set1.setValueTextSize(9f);

            // draw selection line as dashed
            set1.enableDashedHighlightLine(10f, 5f, 0f);

            // set the filled area
            set1.setDrawFilled(true);
            set1.setFillFormatter(new IFillFormatter() {
                @Override
                public float getFillLinePosition(ILineDataSet dataSet, LineDataProvider dataProvider) {
                    return chart.getAxisLeft().getAxisMinimum();
                }
            });

            // set color of filled area
            if (Utils.getSDKInt() >= 18) {
                // drawables only supported on api level 18 and above
                Drawable drawable = ContextCompat.getDrawable(this, R.drawable.ic_launcher_background);
                set1.setFillDrawable(drawable);
            } else {
                set1.setFillColor(Color.BLACK);
            }

            ArrayList<ILineDataSet> dataSets = new ArrayList<>();
            dataSets.add(set1); // add the data sets

            // create a data object with the data sets
            LineData data = new LineData(dataSets);

            // set data
            chart.setData(data);
        }


//
//        pieChart.setUsePercentValues(true);
//        pieChart.setExtraOffsets(25, 5, 25, 0);
//
//        pieChart.setCenterText("покрути меня!");
//
//        pieChart.setDrawHoleEnabled(true);
//        pieChart.setHoleColor(Color.WHITE);
//
//        Legend l = pieChart.getLegend();
//        l.setVerticalAlignment(Legend.LegendVerticalAlignment.TOP);
//        l.setHorizontalAlignment(Legend.LegendHorizontalAlignment.RIGHT);
//        l.setOrientation(Legend.LegendOrientation.VERTICAL);
//        l.setDrawInside(false);
//        l.setXEntrySpace(7f);
//        l.setYEntrySpace(0f);
//        l.setYOffset(30f);
//
//        pieChart.setEntryLabelColor(Color.BLACK);
//
//        List<PieEntry> yvalues = new ArrayList<>();
//        yvalues.add(new PieEntry(10f, info[0]));
//        yvalues.add(new PieEntry(10f, info[1]));
//        yvalues.add(new PieEntry(10f, info[2]));
//        yvalues.add(new PieEntry(10f, info[3]));
//        yvalues.add(new PieEntry(30f, info[4]));
//        yvalues.add(new PieEntry(30f, info[5]));
//
//        PieDataSet dataSet = new PieDataSet(yvalues, "");
//        dataSet.setSliceSpace(3f);
//
//        ArrayList<String> xVals = new ArrayList<>();
//
//        xVals.add(info[0]);
//        xVals.add(info[1]);
//        xVals.add(info[2]);
//        xVals.add(info[3]);
//        xVals.add(info[4]);
//        xVals.add(info[5]);
//
//        PieData data = new PieData(dataSet);
//
//        data.setValueFormatter(new PercentFormatter());
//        // data.setValueFormatter(new DefaultValueFormatter(0));
//
//        pieChart.setData(data);
//
//        pieChart.setEntryLabelTextSize(13);
//
//        int[] colors = {Color.RED, Color.rgb(255, 128, 0), Color.YELLOW, Color.GREEN, Color.CYAN, Color.BLUE, Color.MAGENTA};
//        dataSet.setColors(ColorTemplate.createColors(colors));
//
//        // dataSet.setColors(ColorTemplate.JOYFUL_COLORS);
//        // dataSet.setColors(ColorTemplate.COLORFUL_COLORS);
//        // dataSet.setColors(ColorTemplate.LIBERTY_COLORS);
//        // dataSet.setColors(ColorTemplate.PASTEL_COLORS);
//
//        Description d = new Description();
//        d.setTextSize(16);
//        d.setPosition(65, 50);
//
//        d.setTextAlign(Paint.Align.LEFT);
//        d.setText("Что думает мама, если я не взял трубку");
//        pieChart.setDescription(d);
//
//
//        pieChart.setTransparentCircleRadius(30f);
//        pieChart.setHoleRadius(30f);
//
//        data.setValueTextSize(13f);
//        data.setValueTextColor(Color.DKGRAY);
//
//        pieChart.animateXY(1500, 1500);
//
//        dataSet.setXValuePosition(PieDataSet.ValuePosition.OUTSIDE_SLICE);
//        dataSet.setValueLinePart1OffsetPercentage(80.f);
//        dataSet.setValueLinePart1Length(1.2f);
//        dataSet.setValueLinePart2Length(0.4f);
//
//        pieChart.setOnChartValueSelectedListener(this);
    }
//
//    private void setData(int count, float range) {
//
//        ArrayList<Entry> values = new ArrayList<>();
//
//        for (int i = 0; i < count; i++) {
//
//            float val = (float) (Math.random() * range) - 30;
//            values.add(new Entry(i, val, getResources().getDrawable(com.google.android.material.R.drawable.abc_ic_star_black_16dp)));
//        }
//
//        LineDataSet set1;
//
//        if (chart.getData() != null &&
//                chart.getData().getDataSetCount() > 0) {
//            set1 = (LineDataSet) chart.getData().getDataSetByIndex(0);
//            set1.setValues(values);
//            set1.notifyDataSetChanged();
//            chart.getData().notifyDataChanged();
//            chart.notifyDataSetChanged();
//        } else {
//            // create a dataset and give it a type
//            set1 = new LineDataSet(values, "DataSet 1");
//
//            set1.setDrawIcons(false);
//
//            // draw dashed line
//            set1.enableDashedLine(10f, 5f, 0f);
//
//            // black lines and points
//            set1.setColor(Color.BLACK);
//            set1.setCircleColor(Color.BLACK);
//
//            // line thickness and point size
//            set1.setLineWidth(1f);
//            set1.setCircleRadius(3f);
//
//            // draw points as solid circles
//            set1.setDrawCircleHole(false);
//
//            // customize legend entry
//            set1.setFormLineWidth(1f);
//            set1.setFormLineDashEffect(new DashPathEffect(new float[]{10f, 5f}, 0f));
//            set1.setFormSize(15.f);
//
//            // text size of values
//            set1.setValueTextSize(9f);
//
//            // draw selection line as dashed
//            set1.enableDashedHighlightLine(10f, 5f, 0f);
//
//            // set the filled area
//            set1.setDrawFilled(true);
//            set1.setFillFormatter(new IFillFormatter() {
//                @Override
//                public float getFillLinePosition(ILineDataSet dataSet, LineDataProvider dataProvider) {
//                    return chart.getAxisLeft().getAxisMinimum();
//                }
//            });
//
//            // set color of filled area
//            if (Utils.getSDKInt() >= 18) {
//                // drawables only supported on api level 18 and above
//                Drawable drawable = ContextCompat.getDrawable(this, R.drawable.ic_launcher_background);
//                set1.setFillDrawable(drawable);
//            } else {
//                set1.setFillColor(Color.BLACK);
//            }
//
//            ArrayList<ILineDataSet> dataSets = new ArrayList<>();
//            dataSets.add(set1); // add the data sets
//
//            // create a data object with the data sets
//            LineData data = new LineData(dataSets);
//
//            // set data
//            chart.setData(data);
//        }
//    }

//    @Override
//    public void onValueSelected(Entry e, Highlight h) {
//        if (e == null || h == null)
//            return;
//        Toast.makeText(this, "Value: " + e.getY() + ", index: " + h.getX()
//                + "data: " + info[h.getDataIndex() + 1], Toast.LENGTH_SHORT).show();
//
//    }

//    @Override
//    public void onNothingSelected() {
//        // do nothing
//    }
}