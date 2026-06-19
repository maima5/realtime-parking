import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

interface DatePickerModalProps {
  visible: boolean;
  selectedDate: Date | null;
  onConfirm: (date: Date) => void;
  onClose: () => void;
  maxDate?: Date;
}

export default function DatePickerModal({
  visible,
  selectedDate,
  onConfirm,
  onClose,
  maxDate,
}: DatePickerModalProps) {
  const today = maxDate ?? new Date();
  const initDate = selectedDate ?? today;

  const [viewMonth, setViewMonth] = useState(initDate.getMonth());
  const [viewYear, setViewYear] = useState(initDate.getFullYear());
  const [tempDate, setTempDate] = useState<Date>(initDate);

  // ── Navigate months ──
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
    // Don't navigate past today's month
    if (nextY > today.getFullYear()) return;
    if (nextY === today.getFullYear() && nextM > today.getMonth()) return;
    setViewMonth(nextM);
    setViewYear(nextY);
  };

  // ── Build calendar grid ──
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d > today;
  };

  const isSelected = (day: number) => {
    return (
      tempDate.getDate() === day &&
      tempDate.getMonth() === viewMonth &&
      tempDate.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const isNextDisabled =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth >= today.getMonth());

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Pilih Tanggal</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={22} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* ── Month navigation ── */}
          <View style={styles.monthNav}>
            <TouchableOpacity style={styles.navBtn} onPress={prevMonth} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color="#2D31A6" />
            </TouchableOpacity>

            <Text style={styles.monthLabel}>
              {BULAN[viewMonth]} {viewYear}
            </Text>

            <TouchableOpacity
              style={[styles.navBtn, isNextDisabled && styles.navBtnDisabled]}
              onPress={nextMonth}
              activeOpacity={0.7}
              disabled={isNextDisabled}
            >
              <Ionicons name="chevron-forward" size={20} color={isNextDisabled ? '#CBD5E1' : '#2D31A6'} />
            </TouchableOpacity>
          </View>

          {/* ── Weekday labels ── */}
          <View style={styles.weekRow}>
            {HARI.map(h => (
              <Text key={h} style={[styles.weekLabel, h === 'Min' && styles.weekLabelSun]}>
                {h}
              </Text>
            ))}
          </View>

          {/* ── Day grid ── */}
          <View style={styles.grid}>
            {cells.map((day, idx) => {
              if (!day) return <View key={`empty-${idx}`} style={styles.cell} />;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const todayFlag = isToday(day);
              const isSun = idx % 7 === 0;

              return (
                <TouchableOpacity
                  key={`day-${day}`}
                  style={[
                    styles.cell,
                    selected && styles.cellSelected,
                    todayFlag && !selected && styles.cellToday,
                  ]}
                  activeOpacity={disabled ? 1 : 0.7}
                  disabled={disabled}
                  onPress={() => setTempDate(new Date(viewYear, viewMonth, day))}
                >
                  <Text style={[
                    styles.dayText,
                    isSun && styles.dayTextSun,
                    disabled && styles.dayTextDisabled,
                    selected && styles.dayTextSelected,
                    todayFlag && !selected && styles.dayTextToday,
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Confirm button ── */}
          <TouchableOpacity
            style={styles.confirmBtn}
            activeOpacity={0.8}
            onPress={() => onConfirm(tempDate)}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.confirmBtnText}>
              Pilih {tempDate.getDate()} {BULAN[tempDate.getMonth()]} {tempDate.getFullYear()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const CELL_SIZE = (width - 32 - 48 - 12) / 7; // modal width - padding - gaps

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 380,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
  },
  navBtnDisabled: { backgroundColor: '#F1F5F9' },
  monthLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    paddingVertical: 4,
  },
  weekLabelSun: { color: '#EF4444' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  cellSelected: {
    backgroundColor: '#2D31A6',
    borderRadius: 100,
  },
  cellToday: {
    backgroundColor: '#EEF2FF',
    borderRadius: 100,
  },
  dayText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E1B4B',
  },
  dayTextSun: { color: '#EF4444' },
  dayTextDisabled: { color: '#CBD5E1' },
  dayTextSelected: { color: '#fff', fontWeight: '700' },
  dayTextToday: { color: '#2D31A6', fontWeight: '700' },
  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: '#2D31A6',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
