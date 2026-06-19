import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import ReportSentModal from '@/components/ui/ReportSentModal';
import SubmitReportModal from '@/components/ui/SubmitReportModal';

// ─── Form Input Component ──────────────────────────────────────────────────
function FormInput({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  hasError,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  hasError?: boolean;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label}
        {hasError && <Text style={styles.errorAsterisk}> *wajib diisi</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={18}
          color="#94A3B8"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

// ─── History Card Component ────────────────────────────────────────────────
function HistoryCard({
  area, plate, type, date, imageUri,
}: {
  area: string; plate: string; type: string; date: string; imageUri: string;
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

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function ReportScreen() {
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // ── Form state ──
  const [lokasi, setLokasi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [nomorKendaraan, setNomorKendaraan] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState('');

  // ── Touched state (untuk highlight error hanya setelah user mencoba submit) ──
  const [submitted, setSubmitted] = useState(false);

  // ── Derived validation ──
  const errors = {
    photo: !photoUri,
    lokasi: lokasi.trim() === '',
    tanggal: tanggal.trim() === '',
    nomorKendaraan: nomorKendaraan.trim() === '',
    jenisKendaraan: jenisKendaraan.trim() === '',
  };

  const isFormValid = !Object.values(errors).some(Boolean);

  // ── Camera handler ──
  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Izin Kamera Diperlukan',
        'Aktifkan izin kamera di Pengaturan untuk mengambil foto bukti.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // <-- Dimatikan agar tidak membuka galeri untuk crop
      quality: 0.85,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  // ── Submit handler dengan validasi ──
  const handlePressSubmit = () => {
    setSubmitted(true);
    if (!isFormValid) {
      Alert.alert(
        'Form Belum Lengkap',
        'Harap isi semua field yang wajib diisi sebelum mengirim laporan.',
        [{ text: 'OK' }]
      );
      return;
    }
    setConfirmVisible(true);
  };

  const handleConfirmSubmit = () => {
    setConfirmVisible(false);
    
    // ── Reset Form setelah berhasil dikirim ──
    setPhotoUri(null);
    setLokasi('');
    setTanggal('');
    setNomorKendaraan('');
    setJenisKendaraan('');
    setSubmitted(false);

    setTimeout(() => setSuccessVisible(true), 300);
  };

  return (
    <LinearGradient colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.heroGreeting}>Lapor Pelanggaran Parkir</Text>
          </View>

          {/* Form Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Form Laporan Pelanggaran</Text>

            <View style={styles.formCard}>
              {submitted && !isFormValid && (
                <View style={styles.globalWarningBox}>
                  <Ionicons name="warning-outline" size={16} color="#EF4444" />
                  <Text style={styles.globalWarningText}>
                    Terdapat field yang belum diisi. Harap lengkapi semua data wajib.
                  </Text>
                </View>
              )}

              {/* Upload Bukti */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Upload Bukti
                  {submitted && errors.photo && (
                    <Text style={styles.errorAsterisk}> *wajib diisi</Text>
                  )}
                </Text>

                {photoUri ? (
                  <View style={styles.previewContainer}>
                    <Image source={{ uri: photoUri }} style={styles.previewImage} />
                    <View style={styles.previewActions}>
                      <TouchableOpacity
                        style={styles.previewActionBtn}
                        activeOpacity={0.7}
                        onPress={handleOpenCamera}
                      >
                        <Ionicons name="camera-outline" size={16} color="#2D31A6" />
                        <Text style={styles.previewActionText}>Ambil Ulang</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.previewActionBtn, styles.previewActionBtnDanger]}
                        activeOpacity={0.7}
                        onPress={() => setPhotoUri(null)}
                      >
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                        <Text style={[styles.previewActionText, { color: '#EF4444' }]}>Hapus</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadArea}
                    activeOpacity={0.7}
                    onPress={handleOpenCamera}
                  >
                    <View style={styles.uploadIconCircle}>
                      <Ionicons
                        name="camera"
                        size={28}
                        color="#2D31A6"
                      />
                    </View>
                    <Text style={styles.uploadTitle}>
                      Ambil Foto Bukti
                    </Text>
                    <Text style={styles.uploadSub}>Tap untuk membuka kamera</Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.uploadHint}>
                  Pastikan foto jelas menampilkan kendaraan dan lokasi pelanggaran.
                </Text>
              </View>

              <FormInput
                label="Titik Lokasi"
                icon="location-outline"
                placeholder="Contoh : Area GKU"
                value={lokasi}
                onChangeText={setLokasi}
                hasError={submitted && errors.lokasi}
              />
              <FormInput
                label="Tanggal Kejadian"
                icon="calendar-outline"
                placeholder="Contoh : 8 Juni 2026"
                value={tanggal}
                onChangeText={setTanggal}
                hasError={submitted && errors.tanggal}
              />
              <FormInput
                label="Nomor Kendaraan"
                icon="card-outline"
                placeholder="Contoh : B 1234 CD"
                value={nomorKendaraan}
                onChangeText={setNomorKendaraan}
                hasError={submitted && errors.nomorKendaraan}
              />
              <FormInput
                label="Jenis Kendaraan"
                icon="car-outline"
                placeholder="Contoh : Mobil"
                value={jenisKendaraan}
                onChangeText={setJenisKendaraan}
                hasError={submitted && errors.jenisKendaraan}
              />

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.8}
                onPress={handlePressSubmit}
              >
                <Ionicons name="send-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.submitBtnText}>Kirim Laporan</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* History Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Riwayat Laporan Pelanggaran</Text>
            <HistoryCard
              area="AREA GKU" plate="D 1231 COD" type="Motor" date="10 Juni 2026"
              imageUri="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80"
            />
            <HistoryCard
              area="AREA TULT" plate="D 2321 ILK" type="Motor" date="10 Juni 2026"
              imageUri="https://images.unsplash.com/photo-1558981420-c532902e58b4?w=400&q=80"
            />
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>

      <SubmitReportModal
        visible={isConfirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={handleConfirmSubmit}
      />
      <ReportSentModal
        visible={isSuccessVisible}
        onClose={() => setSuccessVisible(false)}
      />
    </LinearGradient>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20, paddingTop: 20 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  heroGreeting: { fontSize: 20, fontWeight: '800', color: '#2D31A6', letterSpacing: -0.5 },
  section: { marginHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1E1B4B', marginBottom: 16 },
  formCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 },
  errorAsterisk: { fontSize: 11, fontWeight: '500', color: '#EF4444', fontStyle: 'italic' },

  globalWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  globalWarningText: {
    flex: 1,
    fontSize: 12,
    color: '#EF4444',
    lineHeight: 18,
  },

  // Upload
  uploadArea: {
    borderWidth: 1.5, borderColor: '#CBD5E1', borderStyle: 'dashed',
    borderRadius: 16, backgroundColor: '#F8FAFC',
    alignItems: 'center', paddingVertical: 28, gap: 6,
  },
  uploadIconCircle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: '#1E1B4B' },
  uploadSub: { fontSize: 12, color: '#94A3B8' },
  uploadHint: { fontSize: 11, color: '#94A3B8', marginTop: 8, lineHeight: 16 },

  // Preview
  previewContainer: { borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: '#E2E8F0' },
  previewImage: { width: '100%', height: 180, resizeMode: 'cover' },
  previewActions: {
    flexDirection: 'row', backgroundColor: '#F8FAFC',
    borderTopWidth: 1, borderTopColor: '#E2E8F0',
  },
  previewActionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, paddingVertical: 10,
  },
  previewActionBtnDanger: { borderLeftWidth: 1, borderLeftColor: '#E2E8F0' },
  previewActionText: { fontSize: 12, fontWeight: '600', color: '#2D31A6' },

  // Form fields
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, height: 48,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 13, color: '#1E293B' },

  // Submit
  submitBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#1E1B4B', height: 50, borderRadius: 12, marginTop: 8,
  },
  submitBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // History
  historyCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 12,
    flexDirection: 'row', alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  historyImage: { width: 120, height: 80, borderRadius: 8, marginRight: 16 },
  historyInfo: { flex: 1, justifyContent: 'center' },
  historyArea: { fontSize: 11, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  historyPlate: { fontSize: 16, fontWeight: '800', color: '#2D31A6', marginBottom: 4 },
  historyType: { fontSize: 11, color: '#808080', marginBottom: 2 },
  historyDate: { fontSize: 11, color: '#808080', fontWeight: '600' },
});
