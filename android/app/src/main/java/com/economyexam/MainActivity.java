package com.economyexam;

import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Color;
import android.view.Gravity;
import android.util.TypedValue;

import com.facebook.react.ReactActivity;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout( this );
        TextView text = new TextView( this );

        view.setBackgroundColor( Color.parseColor( "#263238" ) );
        view.setGravity( Gravity.CENTER );

        text.setTextColor( Color.parseColor( "#ffffff" ) );
        text.setText( "Economy Exam" );
        text.setGravity( Gravity.CENTER );
        text.setTextSize( TypedValue.COMPLEX_UNIT_DIP, 40 );

        view.addView( text );

        return view;
    }

}
