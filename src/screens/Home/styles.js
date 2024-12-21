import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  accountNumberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigText: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'left',
  },
  button: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
    width: '100%',
  },
  card: {
    padding: 15,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    padding: 15,
  },
  text: {
    color: colors.white,
  },
});

export default styles;
