import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Button = (props) => {
  const style = props.orange ? styles.orangeButton : styles.grayButton;

  return (
    <TouchableOpacity onPress={props.onPress} style={props.zeroButton ? styles.largeButton : styles.button}>
      <View style={[styles.innerButton, style]}>
        <Text style={style}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [sign, setSign] = useState(undefined);
  const [result, setResult] = useState(0);

  const clear = () => {
    setA('');
    setB('');
    setSign(undefined);
    setResult(0);
  };

  const push = (value) => {
    if (sign === undefined) {
      setA(a + value);
    } else {
      setB(b + value);
    }
  };

  const calculate = () => {
    if (a !== '' && b === '') {
      setResult(Number(a));
      return;
    }

    const _a = Number(a);
    const _b = Number(b);

    if (sign === '/' && _b === 0) {
      setResult('Error');
      return;
    }

    let temp;
    switch (sign) {
      case '/':
        temp = _a / _b;
        break;
      case 'x':
        temp = _a * _b;
        break;
      case '+':
        temp = _a + _b;
        break;
      case '-':
        temp = _a - _b;
        break;
    }

    setResult(temp.toFixed(1));
  };

  const generateResult = () => {
    if (result !== 0) {
      return result;
    } else if (a !== '') {
      if (sign !== undefined) {
        return b;
      } else {
        return a;
      }
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.result}>
        <Text style={styles.resultText}>
          {generateResult()}
        </Text>
      </View>
      <View style={styles.row}>
        <Button label={'AC'} onPress={() => clear()} orange/>
        <View style={styles.gap}/>
        <Button label={'÷'} onPress={() => setSign('/')} orange/>
      </View>
      <View style={styles.row}>
        <Button label={'7'} onPress={() => push('7')}/>
        <Button label={'8'} onPress={() => push('8')}/>
        <Button label={'9'} onPress={() => push('9')}/>
        <Button label={'×'} onPress={() => setSign('x')} orange/>
      </View>
      <View style={styles.row}>
        <Button label={'4'} onPress={() => push('4')}/>
        <Button label={'5'} onPress={() => push('5')}/>
        <Button label={'6'} onPress={() => push('6')}/>
        <Button label={'-'} onPress={() => setSign('-')} orange/>
      </View>
      <View style={styles.row}>
        <Button label={'1'} onPress={() => push('1')}/>
        <Button label={'2'} onPress={() => push('2')}/>
        <Button label={'3'} onPress={() => push('3')}/>
        <Button label={'+'} onPress={() => setSign('+')} orange/>
      </View>
      <View style={styles.row}>
        <Button label={'0'} zeroButton onPress={() => push('0')}/>
        <Button label={'.'} onPress={() => push('.')}/>
        <Button label={'='} onPress={() => calculate()} orange/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#535356',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  result: {
    backgroundColor: '#535356',
    width: '100%',
    height: '22%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10%',
    paddingTop: '10%',
  },
  resultText: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '14%',
    width: '100%',
  },
  gap: {
    width: '48.66%',
    backgroundColor: '#e18e2f',
  },
  button: {
    width: '23%',
  },
  innerButton: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  largeButton: {
    width: '48.66%',
    display: 'flex',
    height: '100%',
  },
  grayButton: {
    backgroundColor: '#7c7d7f',
    color: 'white',
    fontSize: 32,
    textAlign: 'center'
  },
  orangeButton: {
    backgroundColor: '#e18e2f',
    color: 'white',
    fontSize: 32,
    textAlign: 'center'
  },
});

export default App;
