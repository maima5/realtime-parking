import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
  onCall: () => void;
}

export default function ContactModal({ visible, onClose, onCall }: ContactModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Ionicons name="call-outline" size={28} color="#fff" />
          </View>

          {/* Texts */}
          <Text style={styles.title}>Hubungi</Text>
          <Text style={styles.phoneNumber}>0812-8283-3664</Text>
          <Text style={styles.description}>
            Hubungi Nomor diatas untuk kendala IT
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.callButton} onPress={onCall} activeOpacity={0.8}>
              <Text style={styles.callButtonText}>Hubungi</Text>
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
    backgroundColor: '#2D31A6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D31A6',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D31A6',
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#2D31A6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#BFC3C9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
