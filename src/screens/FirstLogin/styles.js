import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 5,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    gap: 10,
    padding: 16,
  },
  helper: {
    paddingLeft: 4,
  },
  title: {
    padding: 30,
    textAlign: 'center',
  },
});

export default styles;
