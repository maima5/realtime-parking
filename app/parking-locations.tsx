import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// ─── Types ────────────────────────────────────────────────────────────────────
type ParkingArea = {
  id: string;
  name: string;
  vehicleType: string;
  available: number;
  total: number;
  status: 'available' | 'full';
  imageUri: string;
};

// ─── All Parking Data (multi-page) ───────────────────────────────────────────
const ALL_PARKING_AREAS: ParkingArea[][] = [
  // Page 1
  [
    { id: '1', name: 'AREA GKU', vehicleType: 'Motor', available: 50, total: 120, status: 'available', imageUri: 'https://images.unsplash.com/photo-1572464491297-2b05b13dc2cb?w=300&q=80' },
    { id: '2', name: 'AREA FEB', vehicleType: 'Mobil', available: 25, total: 60, status: 'available', imageUri: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80' },
    { id: '3', name: 'AREA FIK', vehicleType: 'Motor', available: 12, total: 40, status: 'available', imageUri: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=300&q=80' },
    { id: '4', name: 'AREA TULT', vehicleType: 'Motor', available: 0, total: 100, status: 'full', imageUri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&q=80' },
    { id: '5', name: 'AREA RPL', vehicleType: 'Motor', available: 0, total: 60, status: 'full', imageUri: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?w=300&q=80' },
    { id: '6', name: 'AREA KBN', vehicleType: 'Mobil', available: 12, total: 50, status: 'available', imageUri: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=300&q=80' },
  ],
  // Page 2
  [
    { id: '7', name: 'AREA TULT', vehicleType: 'Motor', available: 0, total: 80, status: 'full', imageUri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&q=80' },
    { id: '8', name: 'AREA GKU', vehicleType: 'Motor', available: 50, total: 120, status: 'available', imageUri: 'https://images.unsplash.com/photo-1572464491297-2b05b13dc2cb?w=300&q=80' },
    { id: '9', name: 'AREA FEB', vehicleType: 'Mobil', available: 6, total: 40, status: 'available', imageUri: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80' },
    { id: '10', name: 'AREA TPA', vehicleType: 'Motor', available: 20, total: 60, status: 'available', imageUri: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=300&q=80' },
    { id: '11', name: 'AREA RPL', vehicleType: 'Motor', available: 0, total: 60, status: 'full', imageUri: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?w=300&q=80' },
    { id: '12', name: 'AREA KBN', vehicleType: 'Mobil', available: 12, total: 50, status: 'available', imageUri: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=300&q=80' },
  ],
  // Page 3
  [
    { id: '13', name: 'AREA GKU', vehicleType: 'Mobil', available: 8, total: 30, status: 'available', imageUri: 'https://images.unsplash.com/photo-1572464491297-2b05b13dc2cb?w=300&q=80' },
    { id: '14', name: 'AREA FIK', vehicleType: 'Motor', available: 3, total: 40, status: 'available', imageUri: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=300&q=80' },
    { id: '15', name: 'AREA TULT', vehicleType: 'Mobil', available: 0, total: 20, status: 'full', imageUri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&q=80' },
    { id: '16', name: 'AREA TPA', vehicleType: 'Mobil', available: 15, total: 40, status: 'available', imageUri: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80' },
  ],
  // Page 4
  [
    { id: '17', name: 'AREA FEB', vehicleType: 'Motor', available: 30, total: 80, status: 'available', imageUri: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&q=80' },
    { id: '18', name: 'AREA KBN', vehicleType: 'Motor', available: 0, total: 50, status: 'full', imageUri: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=300&q=80' },
    { id: '19', name: 'AREA RPL', vehicleType: 'Mobil', available: 5, total: 20, status: 'available', imageUri: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?w=300&q=80' },
  ],
];

const TOTAL_PAGES = ALL_PARKING_AREAS.length;

// ─── Parking Card ─────────────────────────────────────────────────────────
function ParkingCard({ area }: { area: ParkingArea }) {
  const isFull = area.status === 'full';
  const statusColor = isFull ? '#FF2C55' : '#14C659';
  const fillPercent = area.total > 0 ? ((area.total - area.available) / area.total) * 100 : 100;
  const barFill = isFull ? '#FF2C55' : '#2D31A6';
  const barBg = isFull ? '#FFE4E9' : '#E8EEF5';

  return (
    <View style={styles.parkingCard}>
      <Image source={{ uri: area.imageUri }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardAreaName}>{area.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        </View>
        <Text style={styles.cardVehicleType}>{area.vehicleType}</Text>
        <Text style={styles.cardAvailableNumber}>{area.available}</Text>
        <Text style={styles.cardAvailableLabel}>
          {isFull ? 'Slot Penuh' : 'Slot Tersedia'}
        </Text>
        <View style={[styles.progressBarBg, { backgroundColor: barBg }]}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${fillPercent}%`, backgroundColor: barFill },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────
export default function ParkingLocationsScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  const areas = ALL_PARKING_AREAS[currentPage - 1] ?? [];

  const handlePage = (page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) setCurrentPage(page);
  };

  return (
    <LinearGradient
      colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#2D31A6" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Lokasi Parkir Tersedia</Text>
            <Text style={styles.headerSubtitle}>
              Pantau tempat parkir anda sebelum datang!
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lokasi Parkir</Text>

            {areas.map((area) => (
              <ParkingCard key={area.id} area={area} />
            ))}
          </View>

          {/* Pagination */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
              activeOpacity={0.7}
              onPress={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={currentPage === 1 ? '#CBD5E1' : '#1E1B4B'}
              />
            </TouchableOpacity>

            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <TouchableOpacity
                key={page}
                style={[styles.pageNumber, page === currentPage && styles.pageNumberActive]}
                activeOpacity={0.7}
                onPress={() => handlePage(page)}
              >
                <Text
                  style={[
                    styles.pageNumberText,
                    page === currentPage && styles.pageNumberTextActive,
                  ]}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.pageBtn,
                currentPage === TOTAL_PAGES && styles.pageBtnDisabled,
              ]}
              activeOpacity={0.7}
              onPress={() => handlePage(currentPage + 1)}
              disabled={currentPage === TOTAL_PAGES}
            >
              <Ionicons
                name="chevron-forward"
                size={18}
                color={currentPage === TOTAL_PAGES ? '#CBD5E1' : '#1E1B4B'}
              />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D31A6',
    letterSpacing: -0.3,
  },
  headerSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },

  section: { marginHorizontal: 20, marginBottom: 8 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 14,
  },

  // ── Card ──
  parkingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: { width: 130, height: 110 },
  cardContent: { flex: 1, padding: 14, justifyContent: 'center' },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardAreaName: { fontSize: 13, fontWeight: '800', color: '#1A1A1A' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  cardVehicleType: { fontSize: 11, color: '#808080', marginBottom: 4 },
  cardAvailableNumber: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 34,
  },
  cardAvailableLabel: { fontSize: 11, color: '#808080', marginBottom: 10 },
  progressBarBg: { height: 7, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },

  // ── Pagination ──
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  pageBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  pageBtnDisabled: { backgroundColor: '#F1F5F9' },
  pageNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  pageNumberActive: { backgroundColor: '#2D31A6' },
  pageNumberText: { fontSize: 13, fontWeight: '600', color: '#1E1B4B' },
  pageNumberTextActive: { color: '#fff' },
});
