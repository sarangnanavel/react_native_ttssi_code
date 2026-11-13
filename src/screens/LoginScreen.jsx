import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const PRIMARY_COLOR = '#050E60';
const DARK_GREY = '#444444';

const LoginScreen = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const appVersion = 'Version 1.0.2026.08.14';

  const handleLogin = async () => {
    if (!userName.trim()) {
      Alert.alert('Validation', 'Please enter username');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Validation', 'Please enter password');
      return;
    }

    try {
      setIsLoading(true);

      if (onLogin) {
        await onLogin(userName.trim(), password);
      } else {
        console.log('Username:', userName);
      }
    } catch (error) {
      Alert.alert('Login Failed', error?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerLayout}>
            <Image
              source={require('../assets/images/ttss_com_logo.png')}
              style={styles.ttssLogo}
              resizeMode="contain"
              accessibilityLabel="TTSS Logo"
            />

            <Text style={styles.welcomeText}>Welcome</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👤</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Username"
                placeholderTextColor="#888888"
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#888888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.toggleText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>

              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerLayout}>
            <Text style={styles.versionText}>{appVersion}</Text>
            <View style={styles.poweredByLayout}>
              <Text style={styles.poweredByText}>Powered by</Text>
              <Image
                source={require('../assets/images/covalsys_logo.png')}
                style={styles.covalsysLogo}
                resizeMode="contain"
                accessibilityLabel="Covalsys Logo"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },

  headerLayout: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 12,
  },

  ttssLogo: {
    width: 100,
    height: 100,
  },

  welcomeText: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: DARK_GREY,
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 48,
  },

  inputContainer: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },

  inputIcon: {
    fontSize: 19,
    marginRight: 12,
  },

  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#222222',
    paddingVertical: 0,
  },

  passwordToggle: {
    paddingHorizontal: 6,
    paddingVertical: 10,
  },

  toggleText: {
    color: PRIMARY_COLOR,
    fontSize: 13,
    fontWeight: '600',
  },

  loginButton: {
    height: 56,
    width: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },

  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  footerLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },

  versionText: {
    fontSize: 12,
    color: DARK_GREY,
  },

  poweredByLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  poweredByText: {
    fontSize: 12,
    color: DARK_GREY,
    marginTop: 5,
  },

  covalsysLogo: {
    width: 100,
    height: 20,
    marginLeft: 6,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.50)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
