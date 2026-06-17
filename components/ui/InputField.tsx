import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/constants/Colors';

type Props = TextInputProps & {
  label: string;
  isPassword?: boolean;
};

export default function InputField({ label, isPassword = false, ...props }: Props) {
  const [hide, setHide] = useState(isPassword);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          secureTextEntry={hide}
          placeholderTextColor={colors.textGray}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHide(!hide)} style={styles.eye}>
            <Text style={{ fontSize: 18 }}>{hide ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: colors.textDark,
  },
  eye: { padding: 4 },
});