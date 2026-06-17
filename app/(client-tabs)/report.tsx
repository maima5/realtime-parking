import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// ─── Input Field Component ─────────────────────────────────────────────────
function FormInput({
  label,
  icon,
  placeholder,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
        />
      </View>
    </View>
  );
}

// ─── History Card Component ────────────────────────────────────────────────
function HistoryCard({
  area,
  plate,
  type,
  date,
  imageUri,
}: {
  area: string;
  plate: string;
  type: string;
  date: string;
  imageUri: string;
}) {
  return (
    <View style={styles.historyCard}>
      <Image source={{ uri: imageUri }} style={styles.historyImage} />
      <View style={styles.historyInfo}>
        <Text style={styles.historyArea}>{area}</Text>
        <Text style={styles.historyPlate}>{plate}</Text>
        <Text style={styles.historyType}>Kendaraan : {type}</Text>
        <Text style={styles.historyDate}>{date}</Text>
      </View>
    </View>
  );
}

export default function ReportScreen() {
  return (
    <LinearGradient
      colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.heroGreeting}>Lapor Pelanggaran Parkir</Text>
          </View>

          {/* ── Form Section ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Form Laporan Pelanggaran</Text>

            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Upload Bukti</Text>
                <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
                  <Ionicons name="camera-outline" size={24} color="#64748B" />
                  <Text style={styles.uploadText}>Ambil Foto Bukti</Text>
                </TouchableOpacity>
              </View>

              <FormInput
                label="Titik Lokasi"
                icon="location-outline"
                placeholder="Contoh : Area GKU"
              />

              <FormInput
                label="Tanggal Kejadian"
                icon="calendar-outline"
                placeholder="Contoh : 8 Juni 2026"
              />

              <FormInput
                label="Nomor Kendaraan"
                icon="card-outline"
                placeholder="Contoh : B 1234 CD"
              />

              <FormInput
                label="Jenis Kendaraan"
                icon="car-outline"
                placeholder="Contoh : Mobil"
              />

              <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
                <Text style={styles.submitBtnText}>Kirim Laporan</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── History Section ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Riwayat Laporan Pelanggaran</Text>

            <HistoryCard
              area="AREA GKU"
              plate="D 1231 COD"
              type="Motor"
              date="10 Juni 2026"
              imageUri="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80"
            />
            <HistoryCard
              area="AREA TULT"
              plate="D 2321 ILK"
              type="Motor"
              date="10 Juni 2026"
              imageUri="https://images.unsplash.com/photo-1558981420-c532902e58b4?w=400&q=80"
            />
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  heroGreeting: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D31A6',
    letterSpacing: -0.5,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  uploadArea: {
    height: 120,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#1E293B',
  },
  submitBtn: {
    backgroundColor: '#1E1B4B', // Dark indigo/blue
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  historyImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  historyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  historyArea: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  historyPlate: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2D31A6',
    marginBottom: 4,
  },
  historyType: {
    fontSize: 11,
    color: '#808080',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 11,
    color: '#808080',
    fontWeight: '600',
  },
});
