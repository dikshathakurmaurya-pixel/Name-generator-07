
package com.easyclick.launcher;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.view.View;
import android.widget.*;
import android.text.TextWatcher;
import android.text.Editable;
import java.util.*;

public class MainActivity extends Activity {

    LinearLayout root, appList;
    EditText search;
    PackageManager pm;
    ArrayList<ResolveInfo> apps = new ArrayList<>();

    int background = Color.rgb(13, 18, 34);
    int panel = Color.rgb(28, 37, 58);

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        pm = getPackageManager();

        root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(18, 30, 18, 10);
        root.setBackgroundColor(background);

        TextView title = new TextView(this);
        title.setText("EASY CLICK");
        title.setTextColor(Color.WHITE);
        title.setTextSize(30);
        title.setTypeface(null, Typeface.BOLD);
        root.addView(title);

        TextView subtitle = new TextView(this);
        subtitle.setText("ALL APPS • ONE TAP");
        subtitle.setTextColor(Color.LTGRAY);
        subtitle.setPadding(0, 5, 0, 20);
        root.addView(subtitle);

        search = new EditText(this);
        search.setSingleLine(true);
        search.setHint("Search your apps...");
        search.setTextColor(Color.WHITE);
        search.setHintTextColor(Color.GRAY);
        search.setPadding(18, 12, 18, 12);
        search.setBackgroundColor(panel);
        root.addView(search);

        TextView heading = new TextView(this);
        heading.setText("MY APPLICATIONS");
        heading.setTextColor(Color.WHITE);
        heading.setTextSize(17);
        heading.setTypeface(null, Typeface.BOLD);
        heading.setPadding(0, 22, 0, 12);
        root.addView(heading);

        ScrollView scroll = new ScrollView(this);
        appList = new LinearLayout(this);
        appList.setOrientation(LinearLayout.VERTICAL);
        scroll.addView(appList);

        root.addView(scroll, new LinearLayout.LayoutParams(
            -1, 0, 1
        ));

        setContentView(root);

        loadApps();

        search.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(
                CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(
                CharSequence s, int start, int before, int count) {
                displayApps(s.toString());
            }

            @Override
            public void afterTextChanged(Editable e) {}
        });
    }

    void loadApps() {
        apps.clear();

        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);

        apps.addAll(pm.queryIntentActivities(intent, 0));

        Collections.sort(apps, (a, b) ->
            a.loadLabel(pm).toString().compareToIgnoreCase(
                b.loadLabel(pm).toString()
            )
        );

        displayApps("");
    }

    void displayApps(String query) {
        appList.removeAllViews();

        int count = 0;

        for (ResolveInfo info : apps) {
            String name = info.loadLabel(pm).toString();

            if (!name.toLowerCase().contains(
                query.toLowerCase())) {
                continue;
            }

            count++;

            LinearLayout row = new LinearLayout(this);
            row.setGravity(Gravity.CENTER_VERTICAL);
            row.setPadding(14, 12, 14, 12);
            row.setBackgroundColor(panel);

            LinearLayout.LayoutParams params =
                new LinearLayout.LayoutParams(-1, -2);
            params.setMargins(0, 5, 0, 5);
            row.setLayoutParams(params);

            ImageView icon = new ImageView(this);
            icon.setImageDrawable(info.loadIcon(pm));
            row.addView(icon, new LinearLayout.LayoutParams(55, 55));

            TextView label = new TextView(this);
            label.setText(name);
            label.setTextColor(Color.WHITE);
            label.setTextSize(17);
            label.setPadding(18, 0, 0, 0);
            row.addView(label);

            row.setOnClickListener(v -> {
                Intent launch = new Intent();
                launch.setClassName(
                    info.activityInfo.packageName,
                    info.activityInfo.name
                );

                try {
                    startActivity(launch);
                } catch (Exception e) {
                    Toast.makeText(this,
                        "App open nahi ho paya",
                        Toast.LENGTH_SHORT).show();
                }
            });

            appList.addView(row);
        }

        if (count == 0) {
            TextView empty = new TextView(this);
            empty.setText("No apps found!");
            empty.setTextColor(Color.WHITE);
            empty.setPadding(15, 30, 15, 30);
            appList.addView(empty);
        }
    }
}
