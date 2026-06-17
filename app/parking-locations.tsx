import React from 'react';
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
type ParkingLocation = {
  id: string;
  name: string;
  type: string;
  available: number;
  total: number;
  status: 'available' | 'full';
  imageUri: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const LOCATIONS: ParkingLocation[] = [
  {
    id: '1',
    name: 'AREA TULT',
    type: 'Motor',
    available: 0,
    total: 100,
    status: 'full',
    imageUri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
  },
  {
    id: '2',
    name: 'AREA GKU',
    type: 'Motor',
    available: 50,
    total: 120,
    status: 'available',
    imageUri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  },
  {
    id: '3',
    name: 'AREA FEB',
    type: 'Mobil',
    available: 6,
    total: 60,
    status: 'available',
    imageUri: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=80',
  },
  {
    id: '4',
    name: 'AREA TPA',
    type: 'Motor',
    available: 20,
    total: 40,
    status: 'available',
    imageUri: 'https://images.unsplash.com/photo-1430285561322-7808604715df?w=400&q=80',
  },
  {
    id: '5',
    name: 'AREA RPL',
    type: 'Motor',
    available: 0,
    total: 50,
    status: 'full',
    imageUri: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80',
  },
  {
    id: '6',
    name: 'AREA KBN',
    type: 'Mobil',
    available: 12,
    total: 45,
    status: 'available',
    imageUri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
  },
];

// ─── List Card Component ───────────────────────────────────────────────────
function LocationCard({ area }: { area: ParkingLocation }) {
  const isFull = area.status === 'full';
  const statusColor = isFull ? '#FF2C55' : '#14C659';
  const fillPercent = area.total > 0 ? ((area.total - area.available) / area.total) * 100 : 100;
  
  const barBg = isFull ? '#FFC0CB' : '#E8EEF5';
  const barFill = isFull ? '#FFB6C1' : '#2D31A6';

  return (
    <View style={styles.card}>
      <Image source={{ uri: area.imageUri }} style={styles.cardImage} />
      
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardAreaName}>{area.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        </View>
        <Text style={styles.cardType}>{area.type}</Text>

        <Text style={styles.cardAvailableNumber}>{area.available}</Text>
        <Text style={styles.cardAvailableLabel}>
          {isFull ? 'Slot Penuh' : 'Slot Tersedia'}
        </Text>

        <View style={[styles.progressBarBg, { backgroundColor: barBg }]}>
          <View style={[styles.progressBarFill, { width: `${fillPercent}%`, backgroundColor: barFill }]} />
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ParkingLocationsScreen() {
  return (
    <LinearGradient
      colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#1E1B4B" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
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
          <Text style={styles.sectionTitle}>Lokasi Parkir</Text>

          {LOCATIONS.map(area => (
            <LocationCard key={area.id} area={area} />
          ))}

          {/* ── Pagination ── */}
          <View style={styles.pagination}>
            <TouchableOpacity activeOpacity={0.7} style={styles.pageArrow}>
              <Ionicons name="chevron-back" size={16} color="#64748B" />
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.pageNumber}>1</Text>
            </TouchableOpacity>
            
            <View style={styles.activePageIndicator}>
              <Text style={styles.activePageNumber}>2</Text>
            </View>
            
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.pageNumber}>3</Text>
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.pageNumber}>4</Text>
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.7} style={styles.pageArrow}>
              <Ionicons name="chevron-forward" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E1B4B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2D31A6',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: 140,
    height: '100%',
    minHeight: 110,
    borderRadius: 12,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cardType: {
    fontSize: 11,
    color: '#808080',
    marginTop: 2,
    marginBottom: 8,
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
    marginBottom: 12,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  pageArrow: {
    padding: 4,
  },
  pageNumber: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activePageIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1B4B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePageNumber: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
});
