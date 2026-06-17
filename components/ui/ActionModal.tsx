import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ActionModal({ visible, onClose, onConfirm }: ActionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconMark}>?</Text>
          </View>

          {/* Texts */}
          <Text style={styles.title}>Apakah Sudah</Text>
          <Text style={styles.title}>Ditindak lanjuti?</Text>
          <Text style={styles.description}>
            Pastikan anda sudah menindak lanjuti pelanggar
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.8}>
              <Text style={styles.confirmButtonText}>Sudah</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7A102A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconMark: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7A102A',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#7A102A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F9C8D2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#A21D38',
    fontSize: 14,
    fontWeight: '600',
  },
});
