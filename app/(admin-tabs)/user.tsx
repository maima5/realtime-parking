import React from 'react';
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

// ─── Types ────────────────────────────────────────────────────────────────────
type UserAdmin = {
  id: string;
  name: string;
  email: string;
  status: 'Aktif' | 'Non-Aktif';
};

// ─── Data Statis (Sesuai Mockup Gambar 1) ──────────────────────────────────────
const USER_DATA: UserAdmin[] = [
  { id: '1', name: 'Satpam Juned', email: 'junedi@gmail.com', status: 'Aktif' },
  { id: '2', name: 'Pak haikal', email: 'haikaaal@email.com', status: 'Non-Aktif' },
  { id: '3', name: 'Pak Musli', email: 'musliihin@gmail.com', status: 'Aktif' },
  { id: '4', name: 'Pak Mukmin', email: 'mukminin@gmail.com', status: 'Aktif' },
  { id: '5', name: 'Bapak Joko', email: 'joko89@email.com', status: 'Non-Aktif' },
];

// ─── Sub-Komponen: User Card ──────────────────────────────────────────────────
function UserCard({ user }: { user: UserAdmin }) {
  const isAktif = user.status === 'Aktif';
  const statusColor = isAktif ? '#22C55E' : '#64748B'; // Hijau jika aktif, abu jika non-aktif

  return (
    <View style={styles.userCard}>
      {/* Baris Informasi Atas */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={20} color="#2D31A6" />
          </View>
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <Text style={[styles.statusText, { color: statusColor }]}>{user.status}</Text>
      </View>

      {/* Baris Tombol Aksi */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Ionicons name="pencil-outline" size={14} color="#CBD5E1" style={styles.btnIcon} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={14} color="#fff" style={styles.btnIcon} />
          <Text style={styles.deleteBtnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Komponen Utama Screen ────────────────────────────────────────────────────
export default function ManajemenUserScreen() {
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
          {/* Header Judul */}
          <View style={styles.header}>
            <Text style={styles.heroTitle}>Manajemen User</Text>
            <Text style={styles.heroSubtitle}>Aktivitas Tap in dan Tap out Pengguna Parkir</Text>
          </View>

          {/* Label Total Pengguna */}
          <View style={styles.sectionHeader}>
            <Text style={styles.totalText}>Total : {USER_DATA.length} Pengguna</Text>
          </View>

          {/* List Kartu User */}
          <View style={styles.listContainer}>
            {USER_DATA.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>

          {/* Spacer aman agar tidak terpotong Floating Navigation Bar */}
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
  sectionHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  listContainer: {
    marginHorizontal: 24,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  userEmail: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#E2E8F0', // Warna abu-abu pudar disabled style sesuai gambar
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#BE123C', // Merah gelap/crimson untuk hapus
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  btnIcon: {
    marginRight: 6,
  },
});
