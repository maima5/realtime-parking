import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type UserStatus = 'aktif' | 'non-aktif';

export interface UserData {
  id?: string;
  nama: string;
  email: string;
  password?: string;
  status: UserStatus;
}

interface UserModalProps {
  visible: boolean;
  mode: 'tambah' | 'edit';
  initialData?: UserData;
  onSimpan: (data: UserData) => void;
  onBatal: () => void;
}

export default function UserModal({
  visible,
  mode,
  initialData,
  onSimpan,
  onBatal,
}: UserModalProps) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<UserStatus>('aktif');

  useEffect(() => {
    if (visible) {
      setNama(initialData?.nama ?? '');
      setEmail(initialData?.email ?? '');
      setPassword('');
      setStatus(initialData?.status ?? 'aktif');
    }
  }, [visible, initialData]);

  const handleSimpan = () => {
    const data: UserData = { nama, email, status };
    if (mode === 'tambah') data.password = password;
    if (initialData?.id) data.id = initialData.id;
    onSimpan(data);
  };

  const isEdit = mode === 'edit';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onBatal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalCard}>

              {/* Icon Circle — sama seperti DeleteUserModal & ParkingAddedModal */}
              <View style={styles.iconCircle}>
                <Ionicons
                  name={isEdit ? 'pencil' : 'person-add'}
                  size={26}
                  color="#fff"
                />
              </View>

              {/* Title */}
              <Text style={styles.title}>
                {isEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}
              </Text>

              {/* Form fields */}
              <View style={styles.formContainer}>

                {/* Nama */}
                <Text style={styles.label}>Nama</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={isEdit ? 'Nama pengguna' : 'Contoh : Satpam Juned'}
                    placeholderTextColor="#94A3B8"
                    value={nama}
                    onChangeText={setNama}
                  />
                  <Ionicons name="pencil-outline" size={14} color="#94A3B8" />
                </View>

                {/* Password (tambah only) */}
                {!isEdit && (
                  <>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="min. 8 characters"
                        placeholderTextColor="#94A3B8"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                      />
                      <Ionicons name="pencil-outline" size={14} color="#94A3B8" />
                    </View>
                  </>
                )}

                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={isEdit ? 'Email pengguna' : 'Contoh : junedi@gmail.com'}
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <Ionicons name="pencil-outline" size={14} color="#94A3B8" />
                </View>

                {/* Status */}
                <Text style={styles.label}>Status</Text>
                <View style={styles.statusRow}>
                  <TouchableOpacity
                    style={[styles.statusBtn, status === 'aktif' ? styles.statusAktifActive : styles.statusAktifInactive]}
                    onPress={() => setStatus('aktif')}
                  >
                    <Text style={[styles.statusText, status === 'aktif' && styles.statusTextActive]}>
                      Aktif
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusBtn, status === 'non-aktif' ? styles.statusNonAktifActive : styles.statusNonAktifInactive]}
                    onPress={() => setStatus('non-aktif')}
                  >
                    <Text style={[styles.statusText, status === 'non-aktif' && styles.statusTextActive]}>
                      Non - Aktif
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Buttons — sama persis dgn DeleteUserModal */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleSimpan} activeOpacity={0.8}>
                  <Text style={styles.confirmButtonText}>Simpan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onBatal} activeOpacity={0.8}>
                  <Text style={styles.cancelButtonText}>Batal</Text>
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    width: '100%',
    maxWidth: 340,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2D31A6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D31A6',
    textAlign: 'center',
    marginBottom: 16,
  },
  formContainer: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
    marginTop: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#1E1B4B',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  statusBtn: {
    flex: 1,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  statusAktifActive: {
    backgroundColor: '#15803D',
    borderColor: '#15803D',
  },
  statusAktifInactive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#15803D',
  },
  statusNonAktifActive: {
    backgroundColor: '#7D1A2E',
    borderColor: '#7D1A2E',
  },
  statusNonAktifInactive: {
    backgroundColor: '#FFE4E6',
    borderColor: '#7D1A2E',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  statusTextActive: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#2D31A6',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
});
