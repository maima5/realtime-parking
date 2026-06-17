import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';
import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // logic login di sini
    // router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
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
            onChangeText={setEmail}
          />
          <InputField
            label="Kata Sandi"
            placeholder="Min. 8 karakter"
            isPassword
            value={password}
            onChangeText={setPassword}
          />

          <PrimaryButton
            label="Login"
            onPress={handleLogin}
            style={{ marginTop: 8 }}
          />
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