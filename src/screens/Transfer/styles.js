import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  confirmModal: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  drawerIcon: {
    backgroundColor: colors.transparent,
    padding: 10,
  },
  dropdown: {
    borderColor: colors.gray,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: '70%',
  },
  input: {
    borderColor: colors.gray,
    borderWidth: 1,
    fontSize: 14,
    width: '70%',
  },
  listItem: {
    alignItems: 'center',
    padding: 15,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
});

export default styles;
