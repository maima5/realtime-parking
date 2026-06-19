import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import ParkingModal from '@/components/ui/ParkingModal';

type ActiveArea = {
  id: string;
  name: string;
  slots: number;
  type: string;
};

const ACTIVE_AREAS: ActiveArea[] = [
  { id: '1', name: 'Area FEB', slots: 50, type: 'Mobil' },
  { id: '2', name: 'Area TULT', slots: 120, type: 'Motor' },
  { id: '3', name: 'Area GKU', slots: 300, type: 'Motor' },
];

function AreaInputForm({
  label, icon, placeholder, value, onChangeText, hasError
}: {
  label: string; icon: keyof typeof Ionicons.glyphMap; placeholder: string;
  value: string; onChangeText: (text: string) => void; hasError?: boolean;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label}
        {hasError && <Text style={styles.errorAsterisk}> *wajib diisi</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color="#94A3B8" style={styles.inputIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

export default function PengaturanAreaScreen() {
  type ModalState = 'none' | 'confirm' | 'success';
  const [modalState, setModalState] = useState<ModalState>('none');

  // Form states
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [namaArea, setNamaArea] = useState('');
  const [kapasitas, setKapasitas] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Validation
  const errors = {
    photo: !photoUri,
    namaArea: namaArea.trim() === '',
    kapasitas: kapasitas.trim() === '',
    jenisKendaraan: jenisKendaraan.trim() === '',
  };
  const isFormValid = !Object.values(errors).some(Boolean);

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.85,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handlePressSave = () => {
    setSubmitted(true);
    if (!isFormValid) return;
    setModalState('confirm');
  };

  const handleProcessSave = () => {
    setPhotoUri(null);
    setNamaArea('');
    setKapasitas('');
    setJenisKendaraan('');
    setSubmitted(false);
    setModalState('success');
  };

  return (
    <LinearGradient colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.heroTitle}>Pengaturan Area Parkir</Text>
            <Text style={styles.heroSubtitle}>Atur area parkir yang tersedia</Text>
          </View>

          {/* Form Card */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tambah Area Parkir Baru</Text>
            <View style={styles.formCard}>
              {submitted && !isFormValid && (
                <View style={styles.globalWarningBox}>
                  <Ionicons name="warning-outline" size={16} color="#EF4444" />
                  <Text style={styles.globalWarningText}>
                    Terdapat field yang belum diisi. Harap lengkapi semua data wajib.
                  </Text>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Upload Foto Lokasi
                  {submitted && errors.photo && (
                    <Text style={styles.errorAsterisk}> *wajib diisi</Text>
                  )}
                </Text>
                {photoUri ? (
                  <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={handleOpenCamera}>
                    <Ionicons name="checkmark-circle" size={26} color="#22C55E" />
                    <Text style={[styles.uploadText, { color: '#22C55E' }]}>Foto Berhasil Diambil (Tap untuk ubah)</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={handleOpenCamera}>
                    <Ionicons name="camera-outline" size={26} color="#64748B" />
                    <Text style={styles.uploadText}>Ambil Foto Lokasi</Text>
                  </TouchableOpacity>
                )}
              </View>

              <AreaInputForm
                label="Nama Area Parkir" icon="location-outline" placeholder="Contoh : Area GKU"
                value={namaArea} onChangeText={setNamaArea} hasError={submitted && errors.namaArea}
              />
              <AreaInputForm
                label="Kapasitas Maksimal Parkir" icon="resize-outline" placeholder="Contoh : 120"
                value={kapasitas} onChangeText={setKapasitas} hasError={submitted && errors.kapasitas}
              />
              <AreaInputForm
                label="Jenis Kendaraan" icon="car-outline" placeholder="Contoh : Mobil"
                value={jenisKendaraan} onChangeText={setJenisKendaraan} hasError={submitted && errors.jenisKendaraan}
              />

              <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handlePressSave}>
                <Text style={styles.saveBtnText}>Simpan Area Parkir</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* List Area Aktif */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daftar area parkir yang aktif</Text>
            {ACTIVE_AREAS.map(item => (
              <View key={item.id} style={styles.areaItemCard}>
                <View style={styles.areaItemLeft}>
                  <View style={styles.areaIconBadge}>
                    <Ionicons name={item.type === 'Mobil' ? 'car-outline' : 'bicycle-outline'} size={20} color="#2D31A6" />
                  </View>
                  <View>
                    <Text style={styles.areaItemName}>{item.name}</Text>
                    <Text style={styles.areaItemSlots}>Maksimal Slot : {item.slots}</Text>
                  </View>
                </View>
                <Text style={[styles.areaItemType, { color: item.type === 'Mobil' ? '#16A34A' : '#991B1B' }]}>{item.type}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Dialog Modals */}
      <ParkingModal visible={modalState === 'confirm'} type="confirm" title="Simpan Area Parkir" message="Pastikan anda sudah mengisi dengan benar!" onConfirm={handleProcessSave} onCancel={() => setModalState('none')} />
      <ParkingModal visible={modalState === 'success'} type="success" title="Area Parkir Telah Ditambah" message="Area Parkir telah diperbarui di daftar" onClose={() => setModalState('none')} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20, paddingTop: 20 },
  header: { paddingHorizontal: 24, marginBottom: 20 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#2D31A6' },
  heroSubtitle: { marginTop: 4, fontSize: 12, fontWeight: '500', color: '#1A1A1A' },
  section: { marginHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#1E1B4B', marginBottom: 12 },
  formCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#1A1A1A', marginBottom: 6 },
  errorAsterisk: { fontSize: 11, fontWeight: '500', color: '#EF4444', fontStyle: 'italic' },
  globalWarningBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2',
    padding: 12, borderRadius: 12, marginBottom: 16, gap: 8,
  },
  globalWarningText: { flex: 1, fontSize: 12, color: '#EF4444', lineHeight: 18 },
  uploadBox: { height: 110, borderWidth: 1.5, borderColor: '#CBD5E1', borderStyle: 'dashed', borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', gap: 6, marginBottom: 4 },
  uploadText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  inputIcon: { marginRight: 8 },
  textInput: { flex: 1, fontSize: 12, color: '#1E293B' },
  saveBtn: { backgroundColor: '#2D31A6', height: 46, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  areaItemCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, elevation: 2 },
  areaItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  areaIconBadge: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  areaItemName: { fontSize: 13, fontWeight: '700', color: '#1E1B4B' },
  areaItemSlots: { fontSize: 11, color: '#64748B', marginTop: 1 },
  areaItemType: { fontSize: 11, fontWeight: '700' },
});