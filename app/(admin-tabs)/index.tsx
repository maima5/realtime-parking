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
import HapusPenggunaModal from '@/components/ui/DeleteUserModal';
import UserModal, { UserData } from '@/components/ui/UserModal';

type UserAdmin = {
  id: string;
  name: string;
  email: string;
  status: 'Aktif' | 'Non-Aktif';
};

const INITIAL_DATA: UserAdmin[] = [
  { id: '1', name: 'Satpam Juned', email: 'junedi@gmail.com', status: 'Aktif' },
  { id: '2', name: 'Pak haikal', email: 'haikaaal@email.com', status: 'Non-Aktif' },
  { id: '3', name: 'Pak Musli', email: 'musliihin@gmail.com', status: 'Aktif' },
  { id: '4', name: 'Pak Mukmin', email: 'mukminin@gmail.com', status: 'Aktif' },
  { id: '5', name: 'Bapak Joko', email: 'joko89@email.com', status: 'Non-Aktif' },
];

// ─── UserCard ────────────────────────────────────────────────────────────────

function UserCard({
  user,
  onEdit,
  onDelete,
}: {
  user: UserAdmin;
  onEdit: (user: UserAdmin) => void;
  onDelete: (id: string) => void;
}) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const isAktif = user.status === 'Aktif';

  return (
    <View style={styles.userCard}>
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
        <Text style={[styles.statusText, { color: isAktif ? '#22C55E' : '#64748B' }]}>
          {user.status}
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() => onEdit(user)}
        >
          <Ionicons name="pencil-outline" size={14} color="#94A3B8" style={styles.btnIcon} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.7}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Ionicons name="trash-outline" size={14} color="#fff" style={styles.btnIcon} />
          <Text style={styles.deleteBtnText}>Hapus</Text>
        </TouchableOpacity>
      </View>

      <HapusPenggunaModal
        visible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          setDeleteModalVisible(false);
          onDelete(user.id);
        }}
      />
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ManajemenUserScreen() {
  const [users, setUsers] = useState<UserAdmin[]>(INITIAL_DATA);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'tambah' | 'edit'>('tambah');
  const [selectedUser, setSelectedUser] = useState<UserAdmin | undefined>();

  // Buka modal Tambah
  const handleTambah = () => {
    setModalMode('tambah');
    setSelectedUser(undefined);
    setModalVisible(true);
  };

  // Buka modal Edit dengan data user terpilih
  const handleEdit = (user: UserAdmin) => {
    setModalMode('edit');
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Hapus user dari list
  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Simpan — tambah baru atau update existing
  const handleSimpan = (data: UserData) => {
    if (modalMode === 'tambah') {
      const newUser: UserAdmin = {
        id: Date.now().toString(),
        name: data.nama,
        email: data.email,
        status: data.status === 'aktif' ? 'Aktif' : 'Non-Aktif',
      };
      setUsers(prev => [...prev, newUser]);
    } else if (selectedUser) {
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: data.nama,
                email: data.email,
                status: data.status === 'aktif' ? 'Aktif' : 'Non-Aktif',
              }
            : u
        )
      );
    }
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={['#D2E4FF', '#FFFFFF', '#D2E4FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.heroTitle}>Manajemen User</Text>
            <Text style={styles.heroSubtitle}>Manajemen akun yang terdaftar disistem</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.totalText}>Total : {users.length} Pengguna</Text>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={handleTambah}>
              <Ionicons name="add" size={16} color="#fff" />
              <Text style={styles.addBtnText}>Tambah Pengguna</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Modal Tambah / Edit */}
      <UserModal
        visible={modalVisible}
        mode={modalMode}
        initialData={
          selectedUser
            ? {
                id: selectedUser.id,
                nama: selectedUser.name,
                email: selectedUser.email,
                status: selectedUser.status === 'Aktif' ? 'aktif' : 'non-aktif',
              }
            : undefined
        }
        onSimpan={handleSimpan}
        onBatal={() => setModalVisible(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20, paddingTop: 20 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#2D31A6', letterSpacing: -0.5 },
  heroSubtitle: { marginTop: 4, fontSize: 12, fontWeight: '500', color: '#1A1A1A' },
  sectionHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: { fontSize: 14, fontWeight: '800', color: '#1E1B4B' },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D31A6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  listContainer: { marginHorizontal: 24 },
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
  userInfoContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
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
  userName: { fontSize: 14, fontWeight: '700', color: '#1E1B4B' },
  userEmail: { fontSize: 11, color: '#64748B', marginTop: 2 },
  statusText: { fontSize: 11, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 12 },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnText: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#BE123C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  btnIcon: { marginRight: 6 },
});
