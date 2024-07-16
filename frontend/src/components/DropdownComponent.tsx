import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface DropdownComponentProps {
  label: string;
  data: Array<{label: string; value: string}>;
  value: string;
  onChange: (item: any) => void;
  containerStyle: any;
  pickerStyle: any;
  imageIcon: any;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  label,
  data,
  value,
  onChange,
  containerStyle,
  pickerStyle,
  imageIcon,
}) => {
  return (
    <View style={[styles.pickerContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Image source={imageIcon} style={styles.icon} />
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
        style={[styles.picker, pickerStyle]}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownSelectedText}
        containerStyle={[styles.dropdownContainer, pickerStyle]}
        itemContainerStyle={styles.dropdownItemContainer}
        itemTextStyle={styles.dropdownItemText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 35,
    height: 70,
    padding: 20,
    marginVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
  },
  label: {
    fontFamily: 'HS_SummerWaterLight',
    color: '#fff',
    marginLeft: 10,
    marginRight: 25,
    fontSize: 25,
  },
  picker: {
    flex: 1,
    backgroundColor: 'rgba(200,200,200,0.2)',
    borderRadius: 25,
    paddingHorizontal: 8,
    width: 148,
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    color: '#000',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
  },
  dropdownPlaceholder: {
    color: '#000',
    width: 148,
    height: 50,
    elevation: 3,
  },
  dropdownSelectedText: {
    fontFamily: 'MapoBackpacking',
    padding: 5,
    marginLeft: 15,
    color: '#fff',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(196, 196, 196, 0.62)',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 0,
  },
  dropdownItemContainer: {
    backgroundColor: 'rgba(196, 196, 196, 0.8)', // 불투명한 배경색
    paddingHorizontal: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 3,
  },
  dropdownItemText: {
    fontFamily: 'MapoBackpacking',
    color: '#fff',
    fontSize: 15,
  },
  placeholderStyle: {
    color: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default DropdownComponent;
