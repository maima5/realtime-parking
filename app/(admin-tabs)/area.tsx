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

function AreaInputForm({ label, icon, placeholder }: { label: string; icon: keyof typeof Ionicons.glyphMap; placeholder: string }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color="#94A3B8" style={styles.inputIcon} />
        <TextInput placeholder={placeholder} placeholderTextColor="#94A3B8" style={styles.textInput} />
      </View>
    </View>
  );
}

export default function PengaturanAreaScreen() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProcessSave = () => {
    setShowConfirm(false);
    setTimeout(() => {
      setShowSuccess(true);
    }, 400);
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
              <Text style={styles.inputLabel}>Upload Foto Lokasi</Text>
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
                <Ionicons name="camera-outline" size={26} color="#64748B" />
                <Text style={styles.uploadText}>Ambil Foto Lokasi</Text>
              </TouchableOpacity>

              <AreaInputForm label="Nama Area Parkir" icon="location-outline" placeholder="Contoh : Area GKU" />
              <AreaInputForm label="Kapasitas Maksimal Parkir" icon="resize-outline" placeholder="Contoh : 120" />
              <AreaInputForm label="Jenis Kendaraan" icon="car-outline" placeholder="Contoh : Mobil" />

              <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={() => setShowConfirm(true)}>
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
      <ParkingModal visible={showConfirm} type="confirm" title="Simpan Area Parkir" message="Pastikan anda sudah mengisi dengan benar!" onConfirm={handleProcessSave} onCancel={() => setShowConfirm(false)} />
      <ParkingModal visible={showSuccess} type="success" title="Area Parkir Telah Ditambah" message="Area Parkir telah diperbarui di daftar" onClose={() => setShowSuccess(false)} />
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
  uploadBox: { height: 130, borderWidth: 1.5, borderColor: '#CBD5E1', borderStyle: 'dashed', borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', gap: 6, marginBottom: 14 },
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