import React from 'react';
import {
  View, Text, StyleSheet, Image,
  ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/Colors';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>Parkir.io</Text>

        <Text style={styles.headline}>
          Pantau Kapasitas{'\n'}
          <Text style={styles.headlineGray}>Lahan </Text>
          <Text style={styles.headlineDark}>Parkir{'\n'}Dengan </Text>
          <Text style={styles.headlineGray}>Mudah</Text>
        </Text>

        <Text style={styles.desc}>
          Solusi cerdas pantau ketersediaan slot parkir di berbagai blok kampus
          secara real-time. Hemat waktu dengan integrasi sistem tap IoT yang
          akurat, serta ikut jaga ketertiban jalan lewat fitur pelaporan
          pelanggaran parkir liar.
        </Text>

        <PrimaryButton
          label="Mulai Pantau Parkir  →"
          onPress={() => router.push('/(client-tabs)')}
          style={styles.ctaBtn}
        />

        <Image
          source={require('@/content/tempatparkir.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.ghostBtn}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.ghostLabel}>Masuk Satpam / Admin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 24,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: 42,
    marginBottom: 16,
  },
  headlineGray: {
    color: colors.textGray,
    fontWeight: '400',
  },
  headlineDark: {
    color: colors.textDark,
    fontWeight: '800',
  },
  desc: {
    fontSize: 15,
    color: colors.textGray,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
  },
  ctaBtn: { marginBottom: 28 },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  ghostBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: 'rgba(100,100,120,0.25)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
  },
  ghostLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});