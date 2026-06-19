import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getParkingAreasApi, getPhotoUrl } from '@/services/api';

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
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const response = await getParkingAreasApi();
        if (response.status && response.data) {
          const mapped: ParkingArea[] = response.data.map(item => ({
            id: item.id_area.toString(),
            name: item.name_area.toUpperCase(),
            vehicleType: item.location,
            available: item.slot_tersedia,
            total: item.kapasitas_total,
            status: item.slot_tersedia === 0 ? 'full' : 'available',
            imageUri: getPhotoUrl(item.photo),
          }));
          setParkingAreas(mapped);
        } else {
          setErrorMsg(response.message || 'Gagal mengambil data parkir.');
        }
      } catch (error: any) {
        console.error('Fetch parking areas error:', error);
        setErrorMsg('Gagal menyambung ke server.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchParkingAreas();
  }, []);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(parkingAreas.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAreas = parkingAreas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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

            {isLoading ? (
              <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2D31A6" />
                <Text style={{ marginTop: 12, color: '#64748B', fontSize: 13 }}>Memuat area parkir...</Text>
              </View>
            ) : errorMsg ? (
              <View style={{ paddingVertical: 16, paddingHorizontal: 12, backgroundColor: '#FEF2F2', borderRadius: 12, borderLeftWidth: 3, borderLeftColor: '#EF4444' }}>
                <Text style={{ color: '#B91C1C', fontSize: 12, fontWeight: '500' }}>{errorMsg}</Text>
              </View>
            ) : parkingAreas.length === 0 ? (
              <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                <Text style={{ color: '#64748B', fontSize: 13 }}>Tidak ada area parkir yang tersedia.</Text>
              </View>
            ) : (
              currentAreas.map((area) => (
                <ParkingCard key={area.id} area={area} />
              ))
            )}
          </View>

          {/* Pagination */}
          {!isLoading && !errorMsg && parkingAreas.length > 0 && (
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  currentPage === totalPages && styles.pageBtnDisabled,
                ]}
                activeOpacity={0.7}
                onPress={() => handlePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={currentPage === totalPages ? '#CBD5E1' : '#1E1B4B'}
                />
              </TouchableOpacity>
            </View>
          )}

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
