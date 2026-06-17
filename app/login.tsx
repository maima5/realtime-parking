import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';
import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Email dan kata sandi wajib diisi.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      await login({ email, password });
      // Setelah login berhasil, _layout.tsx akan redirect otomatis ke /(tabs)
      router.replace('/(tabs)');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Login gagal. Periksa email dan kata sandi.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.brand}>Parkir.io</Text>

        <Text style={styles.title}>
          Masuk dengan <Text style={styles.titleBold}>akun{'\n'}</Text>
          <Text style={styles.titleAccent}>Satpam / Admin</Text>
        </Text>

        <View style={styles.form}>
          <InputField
            label="Alamat Email"
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => { setEmail(text); setErrorMsg(''); }}
          />
          <InputField
            label="Kata Sandi"
            placeholder="Min. 8 karakter"
            isPassword
            value={password}
            onChangeText={(text) => { setPassword(text); setErrorMsg(''); }}
          />

          {/* Error Message */}
          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Sedang masuk...</Text>
            </View>
          ) : (
            <PrimaryButton
              label="Login"
              onPress={handleLogin}
              style={{ marginTop: 8 }}
            />
          )}
        </View>

        {/* Card Hubungi IT */}
        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Hubungi teknisi IT !</Text>
            <Text style={styles.cardDesc}>
              Hubungi teknis IT jika ada kendala pada sistem
            </Text>
          </View>
          <TouchableOpacity style={styles.cardBtn}>
            <Text style={styles.cardBtnLabel}>Hubungi  ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 34,
  },
  titleBold: {
    fontWeight: '700',
    color: colors.textDark,
  },
  titleAccent: {
    fontWeight: '700',
    color: colors.primary,
  },
  form: { marginBottom: 24 },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textGray,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardText: { flex: 1, marginRight: 12 },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: colors.textGray,
    lineHeight: 18,
  },
  cardBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cardBtnLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});