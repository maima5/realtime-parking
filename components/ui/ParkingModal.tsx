import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ParkingModalProps = {
  visible: boolean;
  type: 'confirm' | 'success';
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
};

export default function ParkingModal({
  visible,
  type,
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
}: ParkingModalProps) {
  const isConfirm = type === 'confirm';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={isConfirm ? onCancel : onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Icon Badge */}
          <View style={[styles.iconCircle, isConfirm ? styles.bgConfirm : styles.bgSuccess]}>
            <Ionicons
              name={isConfirm ? 'help' : 'checkmark'}
              size={28}
              color="#fff"
            />
          </View>

          {/* Content */}
          <Text style={[styles.modalTitle, !isConfirm && styles.textSuccess]}>
            {title}
          </Text>
          <Text style={styles.modalMessage}>{message}</Text>

          {/* Action Buttons */}
          {isConfirm ? (
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary]}
                activeOpacity={0.8}
                onPress={onConfirm}
              >
                <Text style={styles.btnTextWhite}>Kirim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnSecondary]}
                activeOpacity={0.8}
                onPress={onCancel}
              >
                <Text style={styles.btnTextGray}>Batal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.btn, styles.btnSuccessOk, { width: '100%', marginTop: 8 }]}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.btnTextWhite}>Selesai</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // backdrop gelap transparan
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    maxWidth: 340,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bgConfirm: {
    backgroundColor: '#2D31A6', // Indigo/Blue sesuai mockup konfirmasi
  },
  bgSuccess: {
    backgroundColor: '#15803D', // Hijau sukses sesuai mockup success
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B4B',
    textAlign: 'center',
    marginBottom: 8,
  },
  textSuccess: {
    color: '#15803D',
  },
  modalMessage: {
    fontSize: 13,
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#2D31A6',
  },
  btnSecondary: {
    backgroundColor: '#CBD5E1',
  },
  btnSuccessOk: {
    backgroundColor: '#15803D',
  },
  btnTextWhite: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  btnTextGray: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
});