package id.rizkimandiri.jadwalpelajaran;

import android.os.Bundle;
import android.widget.Toast;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class TanpaConnection extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Toast.makeText(TanpaConnection.this, "Offline", Toast.LENGTH_LONG).show();
        setContentView(R.layout.activity_no_connection);
        finish();
        super.onCreate(savedInstanceState);
    }

}
