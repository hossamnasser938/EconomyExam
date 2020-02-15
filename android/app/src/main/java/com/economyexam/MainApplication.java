package com.economyexam;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

import com.oblador.vectoricons.VectorIconsPackage;

import com.rnfs.RNFSPackage;

import com.zmxv.RNSound.RNSoundPackage; 

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

public class MainApplication extends NavigationApplication {

  @Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}

	protected List<ReactPackage> getPackages() {
		@SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
					packages.add(new VectorIconsPackage());
					packages.add(new RNFSPackage());
					packages.add(new RNSoundPackage());
					packages.add(new RNFirebasePackage());
					packages.add(new RNFirebaseAuthPackage());
					packages.add(new RNFirebaseDatabasePackage());
					packages.add(new AsyncStoragePackage());

          return packages;
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}

  @Override
  public String getJSMainModuleName() {
	  return "index";
  }

	/**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
	}

}
