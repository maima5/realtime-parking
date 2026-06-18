import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import ContactModal from '@/components/ui/ContactModal';

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
  
  // Choose progress bar colors based on status (as in design)
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

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { logout } = useAuth();

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
          bounces={true}
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.heroGreeting}>Halo, Satpam!</Text>
            <Text style={styles.heroSubtitle}>
              Monitoring area parkir sekitar dengan mudah
            </Text>
          </View>

          {/* ── Lokasi Parkir ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Lokasi Parkir</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.seeAllText}>Lihat Lainnya</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {PARKING_AREAS.map(area => (
                <ParkingCard key={area.id} area={area} />
              ))}
            </View>
          </View>

          {/* ── Butuh Bantuan Teknis ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Butuh bantuan teknis ?</Text>

            <View style={styles.helpCard}>
              <View style={styles.helpTextContainer}>
                <Text style={styles.helpTitle}>Hubungi teknisi IT !</Text>
                <Text style={styles.helpDesc}>
                  Hubungi teknis IT jika ada kendala pada sistem
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.helpBtn} 
                activeOpacity={0.85}
                onPress={() => setContactModalVisible(true)}
              >
                <Text style={styles.helpBtnText}>Hubungi</Text>
                <Ionicons name="chevron-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 120 }} /> {/* Padding bottom for floating tab bar */}
        </ScrollView>
      </SafeAreaView>

      <ContactModal 
        visible={contactModalVisible}
        onClose={() => setContactModalVisible(false)}
        onCall={() => {
          // Implement call functionality or just close modal
          setContactModalVisible(false);
          Alert.alert("Memanggil", "Menghubungi 0812-8283-3664...");
        }}
      />
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
    color: '#1A1A1A',
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
  helpCard: {
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
    marginTop: 8,
  },
  helpTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  helpDesc: {
    fontSize: 12,
    color: '#808080',
    lineHeight: 16,
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D31A6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  helpBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
