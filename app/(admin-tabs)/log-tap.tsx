import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type LogTap = {
  id: string;
  name: string;
  location: string;
  areaFilter: string;
  type: 'Masuk' | 'Keluar';
  time: string;
};

const CHIP_FILTERS = ['SEMUA', 'AREA FEB', 'AREA FIK', 'AREA TULT'];

const LOG_DATA: LogTap[] = [
  { id: '1', name: 'Muhammad Jainal', location: 'Parkiran FEB', areaFilter: 'AREA FEB', type: 'Masuk', time: '12:30:00' },
  { id: '2', name: 'Muhammad Laniaj', location: 'Parkiran TULT', areaFilter: 'AREA TULT', type: 'Keluar', time: '12:30:00' },
  { id: '3', name: 'Rina Ardina', location: 'Parkiran Pusat', areaFilter: 'SEMUA', type: 'Masuk', time: '12:45:00' },
  { id: '4', name: 'Budi Santoso', location: 'Parkiran Utara', areaFilter: 'SEMUA', type: 'Keluar', time: '12:50:00' },
  { id: '5', name: 'Siti Aisyah', location: 'Parkiran FEB', areaFilter: 'AREA FEB', type: 'Masuk', time: '13:00:00' },
];

function LogCard({ log }: { log: LogTap }) {
  const isMasuk = log.type === 'Masuk';
  const typeColor = isMasuk ? '#22C55E' : '#EF4444';
  const iconName = isMasuk ? 'log-in-outline' : 'log-out-outline';
  const iconBg = isMasuk ? '#F0FDF4' : '#FEF2F2';
  const iconColor = isMasuk ? '#16A34A' : '#DC2626';

  return (
    <View style={styles.logCard}>
      <View style={styles.logLeftSection}>
        <View style={[styles.iconBadge, { backgroundColor: iconBg }]}>
          <Ionicons name={iconName} size={20} color={iconColor} />
        </View>
        <View>
          <Text style={styles.logName}>{log.name}</Text>
          <Text style={styles.logLocation}>{log.location}</Text>
        </View>
      </View>

      <View style={styles.logRightSection}>
        <Text style={[styles.logTypeText, { color: typeColor }]}>Tap {log.type}</Text>
        <Text style={styles.logTimeText}>{log.time}</Text>
      </View>
    </View>
  );
}

export default function LogTapScreen() {
  const [selectedFilter, setSelectedFilter] = useState('SEMUA');

  const filteredData = LOG_DATA.filter(item => {
    if (selectedFilter === 'SEMUA') return true;
    return item.areaFilter === selectedFilter;
  });

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
            <Text style={styles.heroTitle}>Log Tap Tempat Parkir</Text>
            <Text style={styles.heroSubtitle}>Aktivitas Tap in dan Tap out Pengguna Parkir</Text>
          </View>

          {/* Banner Total Tap */}
          <View style={styles.bannerContainer}>
            <LinearGradient
              colors={['#1E3A8A', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.totalTapBanner}
            >
              <View>
                <Text style={styles.bannerTitle}>Total tap hari ini</Text>
                <Text style={styles.bannerDate}>10 Juni 2026</Text>
              </View>
              <View style={styles.bannerRight}>
                <Text style={styles.bannerCounter}>234</Text>
                <Text style={styles.bannerCounterLabel}>Total Tap</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Horizontal Filter Chips */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContentContainer}
            >
              {CHIP_FILTERS.map(filter => {
                const isActive = selectedFilter === filter;
                return (
                  <TouchableOpacity
                    key={filter}
                    activeOpacity={0.8}
                    onPress={() => setSelectedFilter(filter)}
                    style={[styles.chip, isActive && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Subtitle Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Riwayat Tap Pengguna Parkir</Text>
          </View>

          {/* List Log */}
          <View style={styles.listContainer}>
            {filteredData.map(log => (
              <LogCard key={log.id} log={log} />
            ))}
          </View>

          {/* Safe Area Spacer dari Floating Menu */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

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
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D31A6',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  bannerContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
  },
  totalTapBanner: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  bannerDate: {
    fontSize: 11,
    color: '#BFDBFE',
    marginTop: 4,
  },
  bannerRight: {
    alignItems: 'flex-end',
  },
  bannerCounter: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  bannerCounterLabel: {
    fontSize: 10,
    color: '#BFDBFE',
    fontWeight: '600',
  },
  filterContentContainer: {
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#2D31A6',
    borderColor: '#2D31A6',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  listContainer: {
    marginHorizontal: 24,
  },
  logCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  logLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  logLocation: {
    fontSize: 11,
    color: '#808080',
    marginTop: 2,
  },
  logRightSection: {
    alignItems: 'flex-end',
  },
  logTypeText: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  logTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});