import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import KonfirmasiLaporanModal from '@/components/ui/KonfirmasiLaporanModal';

// ─── Types ────────────────────────────────────────────────────────────────────
type Report = {
  id: string;
  area: string;
  plateNumber: string;
  vehicleType: string;
  date: string;
  status: 'pending' | 'resolved';
  imageUrl: string;
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const DUMMY_REPORTS: Report[] = [
  {
    id: '1',
    area: 'AREA GKU',
    plateNumber: 'D 1231 COD',
    vehicleType: 'Motor',
    date: '10 Juni 2026',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
  },
  {
    id: '2',
    area: 'AREA TULT',
    plateNumber: 'D 2321 ILK',
    vehicleType: 'Motor',
    date: '10 Juni 2026',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
  },
  {
    id: '3',
    area: 'AREA GKU',
    plateNumber: 'D 1237 IOD',
    vehicleType: 'Motor',
    date: '9 Juni 2026',
    status: 'resolved',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
  },
];

// ─── Report Card ──────────────────────────────────────────────────────────────
function ReportCard({ report, onAction }: { report: Report; onAction: (r: Report) => void }) {
  return (
    <View style={styles.reportCard}>
      <Image source={{ uri: report.imageUrl }} style={styles.reportImage} resizeMode="cover" />
      
      <View style={styles.reportContent}>
        <Text style={styles.reportArea}>{report.area}</Text>
        <Text style={styles.reportPlate}>{report.plateNumber}</Text>
        <Text style={styles.reportDetails}>Kendaraan : {report.vehicleType}</Text>
        <Text style={styles.reportDetails}>{report.date}</Text>

        {report.status === 'pending' ? (
          <TouchableOpacity 
            style={styles.actionBtn} 
            activeOpacity={0.8}
            onPress={() => onAction(report)}
          >
            <Text style={styles.actionBtnText}>Tindak Lanjuti</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.resolvedBtn}>
            <Text style={styles.resolvedBtnText}>Selesai</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ExploreScreen() {
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleAction = (report: Report) => {
    setSelectedReport(report);
    setActionModalVisible(true);
  };

  const handleConfirmAction = () => {
    // Implement API call to update report status here
    setActionModalVisible(false);
    setSelectedReport(null);
  };

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
            <Text style={styles.heroGreeting}>Pantau Laporan Pelanggaran</Text>
            <Text style={styles.heroSubtitle}>
              Monitoring area parkir sekitar dengan mudah
            </Text>
          </View>

          {/* ── Content ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Riwayat Laporan Pelanggaran</Text>

            <View style={styles.listContainer}>
              {DUMMY_REPORTS.map(report => (
                <ReportCard key={report.id} report={report} onAction={handleAction} />
              ))}
            </View>
          </View>

          <View style={{ height: 120 }} /> {/* Padding bottom for floating tab bar */}
        </ScrollView>
      </SafeAreaView>

      <KonfirmasiLaporanModal 
        visible={actionModalVisible}
        onClose={() => setActionModalVisible(false)}
        onConfirm={handleConfirmAction}
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
    fontSize: 20,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D31A6',
    marginBottom: 16,
  },
  listContainer: {
    gap: 16,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  reportImage: {
    width: 140,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
  },
  reportArea: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  reportPlate: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D31A6',
    marginBottom: 8,
  },
  reportDetails: {
    fontSize: 10,
    color: '#808080',
    fontWeight: '600',
    marginBottom: 2,
  },
  actionBtn: {
    backgroundColor: '#7A102A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  resolvedBtn: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
    width: '100%', // Match width in design for resolved button
  },
  resolvedBtnText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
});
