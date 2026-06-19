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

// ─── Parking Area Card ─────────────────────────────────────────────────────
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
        <Text style={styles.cardAvailableLabel}>Slot Tersedia</Text>
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

// ─── Guide Step ────────────────────────────────────────────────────────────
function GuideStep({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.guideStep}>
      <View style={styles.guideIconCircle}>
        <Ionicons name={icon} size={20} color="#2D31A6" />
      </View>
      <View style={styles.guideTextContainer}>
        <Text style={styles.guideStepTitle}>{title}</Text>
        <Text style={styles.guideStepDesc}>{description}</Text>
      </View>
    </View>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function ClientDashboardScreen() {
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heroGreeting}>Halo, Telyutizen!</Text>
            <Text style={styles.heroSubtitle}>
              Pantau tempat parkir anda sebelum datang!
            </Text>
          </View>

          {/* Lokasi Parkir */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lokasi Parkir</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/parking-locations')}
              >
                <Text style={styles.seeAllText}>Lihat Lainnya</Text>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2D31A6" />
                <Text style={{ marginTop: 8, color: '#64748B', fontSize: 13 }}>Memuat data parkir...</Text>
              </View>
            ) : errorMsg ? (
              <View style={{ paddingVertical: 16, paddingHorizontal: 12, backgroundColor: '#FEF2F2', borderRadius: 12, borderLeftWidth: 3, borderLeftColor: '#EF4444' }}>
                <Text style={{ color: '#B91C1C', fontSize: 12, fontWeight: '500' }}>{errorMsg}</Text>
              </View>
            ) : parkingAreas.length === 0 ? (
              <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                <Text style={{ color: '#64748B', fontSize: 13 }}>Tidak ada area parkir yang tersedia.</Text>
              </View>
            ) : (
              parkingAreas.slice(0, 3).map((area) => (
                <ParkingCard key={area.id} area={area} />
              ))
            )}
          </View>

          {/* Lapor Pelanggaran */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lapor Pelanggaran</Text>
            <View style={styles.reportCard}>
              <View style={styles.reportTextContainer}>
                <Text style={styles.reportTitle}>Melihat Pelanggaran Parkir?</Text>
                <Text style={styles.reportDesc}>
                  Bantu kami menjaga ketertiban dengan melaporkan pelanggaran parkir liar.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.reportBtn}
                activeOpacity={0.85}
                onPress={() => router.push('/(client-tabs)/report')}
              >
                <Text style={styles.reportBtnText}>Lapor</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Panduan Parkir */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Panduan Parkir</Text>
            <View style={styles.guideCard}>
              <GuideStep
                icon="phone-portrait-outline"
                title="1. Cek Dashboard"
                description="Pantau sisa slot parkir secara real-time sebelum memasuki gerbang kampus."
              />
              <View style={styles.guideDivider} />
              <GuideStep
                icon="card-outline"
                title="2. Tap KTM/RFID"
                description="Gunakan Kartu Tanda Mahasiswa (KTM) atau RFID pada reader di palang pintu gerbang."
              />
              <View style={styles.guideDivider} />
              <GuideStep
                icon="location-outline"
                title="3. Parkir di Slot"
                description="Cari area hijau di dashboard dan parkirkan kendaraan tepat di dalam garis."
              />
              <View style={styles.warningBox}>
                <Ionicons name="warning-outline" size={18} color="#EF4444" />
                <Text style={styles.warningText}>
                  <Text style={{ fontWeight: '700' }}>DILARANG</Text> parkir di trotoar atau area luar sensor! Pelanggar akan langsung dikenakan sanksi gembok roda.
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
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
  scrollContent: { paddingBottom: 20, paddingTop: 20 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  heroGreeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D31A6',
    letterSpacing: -0.5,
  },
  heroSubtitle: { marginTop: 4, fontSize: 14, color: '#1A1A1A' },
  section: { marginHorizontal: 24, marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E1B4B' },
  seeAllText: { fontSize: 12, color: '#64748B' },

  // ── Parking Card (horizontal) ──
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
  cardImage: {
    width: 130,
    height: 110,
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
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

  // ── Report Card ──
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  reportTextContainer: { flex: 1, marginRight: 16 },
  reportTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  reportDesc: { fontSize: 12, color: '#808080', lineHeight: 16 },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D31A6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  reportBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },

  // ── Guide ──
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  guideStep: { flexDirection: 'row', gap: 16, paddingVertical: 4 },
  guideIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextContainer: { flex: 1 },
  guideStepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 4,
  },
  guideStepDesc: { fontSize: 12, color: '#64748B', lineHeight: 18 },
  guideDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  warningText: { flex: 1, fontSize: 12, color: '#EF4444', lineHeight: 18 },
});
