import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type ParkingArea = {
  id: string;
  name: string;
  available: number;
  total: number;
  status: 'available' | 'full';
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARKING_AREAS: ParkingArea[] = [
  { id: '1', name: 'AREA GKU', available: 50, total: 120, status: 'available' },
  { id: '2', name: 'AREA FEB', available: 25, total: 60, status: 'available' },
  { id: '3', name: 'AREA FIK', available: 12, total: 40, status: 'available' },
  { id: '4', name: 'AREA TULT', available: 0, total: 100, status: 'full' },
];

// ─── Parking Area Card ─────────────────────────────────────────────────────
function ParkingCard({ area }: { area: ParkingArea }) {
  const statusColor = area.status === 'full' ? '#FF2C55' : '#14C659';
  const fillPercent = area.total > 0 ? ((area.total - area.available) / area.total) * 100 : 100;
  
  // Choose progress bar colors based on status
  const isFull = area.status === 'full';
  const barBg = isFull ? '#FFC0CB' : '#E8EEF5';
  const barFill = isFull ? '#FFB6C1' : '#2D31A6';

  return (
    <View style={styles.parkingCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardAreaName}>{area.name}</Text>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </View>
      <Text style={styles.cardAvailableNumber}>{area.available}</Text>
      <Text style={styles.cardAvailableLabel}>Slot Tersedia</Text>

      <View style={[styles.progressBarBg, { backgroundColor: barBg }]}>
        <View style={[styles.progressBarFill, { width: `${fillPercent}%`, backgroundColor: barFill }]} />
      </View>
    </View>
  );
}

// ─── Panduan Step ──────────────────────────────────────────────────────────
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

// ─── Main Dashboard Client ──────────────────────────────────────────────────
export default function ClientDashboardScreen() {
  return (
    <LinearGradient
      colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        {/* ── Scrollable Content ── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.heroGreeting}>Halo, Telyutizen!</Text>
            <Text style={styles.heroSubtitle}>
              Pantau tempat parkir anda sebelum datang!
            </Text>
          </View>

          {/* ── Lokasi Parkir ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lokasi Parkir</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/parking-locations')}>
                <Text style={styles.seeAllText}>Lihat Lainnya</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {PARKING_AREAS.map(area => (
                <ParkingCard key={area.id} area={area} />
              ))}
            </View>
          </View>

          {/* ── Lapor Pelanggaran ── */}
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

          {/* ── Panduan Parkir ── */}
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

              {/* Warning Box */}
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
    fontSize: 24,
    fontWeight: '800',
    color: '#2D31A6',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#1A1A1A',
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  seeAllText: {
    fontSize: 12,
    color: '#64748B',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  parkingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    width: (width - 48 - 16) / 2, // 2 columns with 16 spacing
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardAreaName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardAvailableNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 36,
  },
  cardAvailableLabel: {
    fontSize: 11,
    color: '#808080',
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
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
  reportTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  reportDesc: {
    fontSize: 12,
    color: '#808080',
    lineHeight: 16,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D31A6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  reportBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
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
  guideStep: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 4,
  },
  guideIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextContainer: {
    flex: 1,
  },
  guideStepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 4,
  },
  guideStepDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
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
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#EF4444',
    lineHeight: 18,
  },
});
