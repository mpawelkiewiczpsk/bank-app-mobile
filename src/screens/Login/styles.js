import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  deleteButton: {
    backgroundColor: colors.red,
    marginHorizontal: 4,
    margin: 0,
    width: 80,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  numberButton: {
    marginHorizontal: 4,
    width: 80,
  },
  numberPad: {
    marginBottom: 16,
  },
  okButton: {
    backgroundColor: colors.green,
    marginHorizontal: 4,
    width: 80,
  },
  pinInput: {
    marginBottom: 24,
    textAlign: 'center',
    width: '50%',
  },
  placeholderButton: {
    backgroundColor: colors.transparent,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
});

export default styles;
