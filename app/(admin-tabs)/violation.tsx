import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ViolationRecord = {
  id: string;
  plate: string;
  area: string;
  type: string;
  date: string;
};

const VIOLATION_DATA: ViolationRecord[] = [
  { id: '1', plate: 'B 3234 CAB', area: 'Area FEB', type: 'Mobil', date: '10 Juni 2026' },
  { id: '2', plate: 'D 2318 DRC', area: 'Area TULT', type: 'Motor', date: '10 Juni 2026' },
  { id: '3', plate: 'D 9932 CCB', area: 'Area GKU', type: 'Motor', date: '8 Juni 2026' },
  { id: '4', plate: 'C 4567 ABX', area: 'Area LRP', type: 'Mobil', date: '12 Juni 2026' },
  { id: '5', plate: 'A 8745 XYZ', area: 'Area QRS', type: 'Transp', date: '11 Juni 2026' },
  { id: '6', plate: 'E 1256 WER', area: 'Area JKT', type: 'Motor', date: '9 Juni 2026' },
];

function ViolationCard({ item }: { item: ViolationRecord }) {
  const isMobil = item.type === 'Mobil';
  const typeColor = isMobil ? '#16A34A' : '#991B1B';

  return (
    <View style={styles.card}>
      <View style={styles.leftGroup}>
        <View style={styles.iconBadge}>
          <Ionicons name={isMobil ? 'car-outline' : 'bicycle-outline'} size={20} color="#2D31A6" />
        </View>
        <View>
          <Text style={styles.plateText}>{item.plate}</Text>
          <Text style={styles.areaText}>{item.area}</Text>
        </View>
      </View>

      <View style={styles.rightGroup}>
        <Text style={[styles.typeText, { color: typeColor }]}>{item.type}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
}

export default function RekapPelanggaranScreen() {
  return (
    <LinearGradient colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.heroTitle}>Rekap Pelanggaran Parkir</Text>
            <Text style={styles.heroSubtitle}>Laporan validasi pelanggaran</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daftar kendaraan pelanggaran</Text>
          </View>

          <View style={styles.listContainer}>
            {VIOLATION_DATA.map(item => (
              <ViolationCard key={item.id} item={item} />
            ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20, paddingTop: 20 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#2D31A6' },
  heroSubtitle: { marginTop: 4, fontSize: 12, fontWeight: '500', color: '#1A1A1A' },
  sectionHeader: { marginHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#1E1B4B' },
  listContainer: { marginHorizontal: 24 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.04, elevation: 2 },
  leftGroup: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBadge: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  plateText: { fontSize: 14, fontWeight: '800', color: '#2D31A6' },
  areaText: { fontSize: 11, color: '#64748B', marginTop: 1 },
  rightGroup: { alignItems: 'flex-end' },
  typeText: { fontSize: 11, fontWeight: '700' },
  dateText: { fontSize: 11, color: '#991B1B', fontWeight: '600', marginTop: 2 },
});