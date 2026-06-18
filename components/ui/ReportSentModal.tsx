import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportSentModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReportSentModal({ visible, onClose }: ReportSentModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Icon Badge */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={28} color="#fff" />
          </View>

          {/* Texts */}
          <Text style={styles.title}>Laporan Anda Terkirim</Text>
          <Text style={styles.description}>
            Terima kasih sudah membantu kami atas ketertiban area parkir!
          </Text>

          {/* Single OK Button */}
          <TouchableOpacity style={styles.successButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.successButtonText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#15803D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#15803D',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  successButton: {
    width: '100%',
    backgroundColor: '#15803D',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
