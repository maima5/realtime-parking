import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ─── Types ────────────────────────────────────────────────────────────────────
type ParkingArea = {
  id: string;
  name: string;
  type: string;
  available: number;
  total: number;
  status: 'full' | 'available' | 'limited';
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PARKING_AREAS: ParkingArea[] = [
  { id: '1', name: 'AREA TULT', type: 'Motor', available: 0, total: 120, status: 'full' },
  { id: '2', name: 'AREA GKU', type: 'Motor', available: 50, total: 120, status: 'available' },
  { id: '3', name: 'AREA FEB', type: 'Mobil', available: 6, total: 60, status: 'limited' },
];

// ─── Parking Area Card ─────────────────────────────────────────────────────
function ParkingCard({ area }: { area: ParkingArea }) {
  const statusColor =
    area.status === 'full'
      ? '#EF4444'
      : area.status === 'limited'
      ? '#F59E0B'
      : '#22C55E';

  const fillPercent =
    area.total > 0 ? ((area.total - area.available) / area.total) * 100 : 100;

  return (
    <View style={styles.parkingCard}>
      {/* Image placeholder with gradient overlay */}
      <View style={styles.cardImageContainer}>
        <View style={styles.cardImagePlaceholder}>
          {/* Simulated parking lot rows */}
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.parkingRow}>
              {[...Array(6)].map((_, j) => (
                <View
                  key={j}
                  style={[
                    styles.parkingSlot,
                    {
                      backgroundColor:
                        i * 6 + j < area.total - area.available
                          ? '#475569'
                          : '#94A3B8',
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
        {/* Status dot */}
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </View>

      {/* Card Info */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardAreaName}>{area.name}</Text>
        <Text style={styles.cardType}>{area.type}</Text>

        <Text style={styles.cardAvailableNumber}>{area.available}</Text>
        <Text style={styles.cardAvailableLabel}>Slot Tersedia</Text>

        {/* Progress bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${fillPercent}%` as any,
                backgroundColor: statusColor,
              },
            ]}
          />
        </View>
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
        <Ionicons name={icon} size={20} color="#3B82F6" />
      </View>
      <View style={styles.guideTextContainer}>
        <Text style={styles.guideStepTitle}>{title}</Text>
        <Text style={styles.guideStepDesc}>{description}</Text>
      </View>
    </View>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const [notifVisible, setNotifVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF2FF" />

      {/* ── Navbar ── */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <View style={styles.navLogoCircle}>
            <Ionicons name="car" size={18} color="#fff" />
          </View>
          <Text style={styles.navTitle}>ParkTelu</Text>
        </View>
        <View style={styles.navActions}>
          <TouchableOpacity
            style={styles.navIconBtn}
            onPress={() => setNotifVisible(!notifVisible)}
            activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={22} color="#3B82F6" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navAvatarBtn} activeOpacity={0.7}>
            <Ionicons name="person-circle" size={34} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}>

        {/* ── Hero / Greeting ── */}
        <View style={styles.heroSection}>
          <View style={styles.heroBg} />
          <Text style={styles.heroGreeting}>Halo, Telyutizen! 👋</Text>
          <Text style={styles.heroSubtitle}>
            Pantau tempat parkir anda sebelum datang!
          </Text>

          {/* Quick stats row */}
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNum}>176</Text>
              <Text style={styles.quickStatLabel}>Total Slot</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={[styles.quickStatNum, { color: '#22C55E' }]}>56</Text>
              <Text style={styles.quickStatLabel}>Tersedia</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={[styles.quickStatNum, { color: '#EF4444' }]}>120</Text>
              <Text style={styles.quickStatLabel}>Terisi</Text>
            </View>
          </View>
        </View>

        {/* ── Lokasi Parkir ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lokasi Parkir</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>Lihat Lainnya</Text>
            </TouchableOpacity>
          </View>

          {PARKING_AREAS.map(area => (
            <ParkingCard key={area.id} area={area} />
          ))}
        </View>

        {/* ── Lapor Pelanggaran ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lapor Pelanggaran</Text>

          <View style={styles.reportCard}>
            <View style={styles.reportCardInner}>
              <View style={styles.reportIconBg}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
              <View style={styles.reportTextContainer}>
                <Text style={styles.reportTitle}>Laporkan Pelanggaran</Text>
                <Text style={styles.reportDesc}>
                  Bantu kami menjaga ketertiban dengan melaporkan pelanggaran parkir.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.reportBtn} activeOpacity={0.85}>
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
              <Ionicons name="warning" size={18} color="#EF4444" />
              <Text style={styles.warningText}>
                <Text style={{ fontWeight: '700' }}>DILARANG</Text> parkir di trotoar atau area luar
                sensor! Pelanggar akan langsung dikenakan sanksi gembok roda.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },

  // ── Navbar
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.3,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navIconBtn: {
    position: 'relative',
    padding: 4,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  navAvatarBtn: {
    padding: 2,
  },

  // ── Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // ── Hero
  heroSection: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heroBg: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EFF6FF',
  },
  heroGreeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  quickStats: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatNum: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3B82F6',
    letterSpacing: -0.5,
  },
  quickStatLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '500',
  },
  quickStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },

  // ── Section
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 12,
  },

  // ── Parking Card
  parkingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImageContainer: {
    width: 110,
    position: 'relative',
  },
  cardImagePlaceholder: {
    width: 110,
    height: '100%',
    minHeight: 100,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    gap: 3,
  },
  parkingRow: {
    flexDirection: 'row',
    gap: 2,
  },
  parkingSlot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  statusDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cardInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  cardAreaName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardType: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
    marginBottom: 6,
    fontWeight: '500',
  },
  cardAvailableNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 36,
    letterSpacing: -1,
  },
  cardAvailableLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBarBg: {
    height: 5,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // ── Report Card
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  reportCardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  reportIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTextContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  reportDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 11,
    gap: 6,
  },
  reportBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // ── Guide Card
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  guideStep: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 4,
  },
  guideIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextContainer: {
    flex: 1,
  },
  guideStepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  guideStepDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  guideDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    gap: 10,
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#7F1D1D',
    lineHeight: 18,
  },
});
