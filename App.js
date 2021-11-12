import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Button = (props) => {
  const style = props.orange ? styles.orangeButton : styles.grayButton;
  const buttonStyle = props.orientation === 'PORTRAIT' ? styles.button : styles.landscapeButton;
  const largeButtonStyle = props.orientation === 'PORTRAIT' ? styles.largeButton : styles.largeLandscapeButton;

  return (
    <TouchableOpacity onPress={props.onPress} style={props.zeroButton ? largeButtonStyle : buttonStyle}>
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
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });

  }, []);

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

  const boardButtons = [
    {
      type: 'BUTTON',
      label: 'AC',
      color: 'ORANGE',
      action: () => () => clear(),
      visibility: 'ALL'
    },
    {
      type: 'GAP',
      visibility: 'PORTRAIT'
    },
    {
      type: 'BUTTON',
      label: '÷',
      color: 'ORANGE',
      action: () => () => setSign('/'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '7',
      color: 'ORANGE',
      action: () => () => push('7'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '8',
      color: 'ORANGE',
      action: () => () => push('8'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '9',
      color: 'ORANGE',
      action: () => () => push('9'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '×',
      color: 'ORANGE',
      action: () => () => setSign('x'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '4',
      color: 'ORANGE',
      action: () => () => push('7'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '5',
      color: 'ORANGE',
      action: () => () => push('8'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '6',
      color: 'ORANGE',
      action: () => () => push('9'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '×',
      color: 'ORANGE',
      action: () => () => setSign('x'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '1',
      color: 'ORANGE',
      action: () => () => push('7'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '2',
      color: 'ORANGE',
      action: () => () => push('8'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '3',
      color: 'ORANGE',
      action: () => () => push('9'),
      visibility: 'ALL'
    },
    {
      type: 'BUTTON',
      label: '×',
      color: 'ORANGE',
      action: () => () => setSign('x'),
      visibility: 'ALL'
    },
  ];

  const BoardButton = (props) => {
    if (props.config.type === 'GAP') return <View style={styles.gap}/>;
    if (props.config.type === 'BUTTON') return (
      <Button
        orientation={orientation}
        label={props.config.label}
        onPress={props.config.action}
        orange={props.config.color === 'ORANGE'}
      />
    );

    return <></>;
  };

  const PortraitBoard = () => (
    <>
      <View style={styles.row}>
        {boardButtons.map((value, index) => <BoardButton key={index} config={value}/>)}
      </View>
    </>
  );

  const LandscapeBoard = () => (
    <>
      <View style={styles.rowLandscape}>
        <Button orientation={orientation} label={'x/y'} onPress={() => clear()} orange/>
        <Button orientation={orientation} label={'x!'} onPress={() => clear()} orange/>
        <Button orientation={orientation} label={'AC'} onPress={() => clear()} orange/>
        <Button orientation={orientation} label={'+/-'} onPress={() => clear()} orange/>
        <Button orientation={orientation} label={'%'} onPress={() => clear()} orange/>
        <Button orientation={orientation} label={'÷'} onPress={() => setSign('/')} orange/>
      </View>
      <View style={styles.rowLandscape}>
        <Button orientation={orientation} label={'e^x'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'10^x'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'7'} onPress={() => push('7')}/>
        <Button orientation={orientation} label={'8'} onPress={() => push('8')}/>
        <Button orientation={orientation} label={'9'} onPress={() => push('9')}/>
        <Button orientation={orientation} label={'×'} onPress={() => setSign('x')} orange/>
      </View>
      <View style={styles.rowLandscape}>
        <Button orientation={orientation} label={'ln'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'log10'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'4'} onPress={() => push('4')}/>
        <Button orientation={orientation} label={'5'} onPress={() => push('5')}/>
        <Button orientation={orientation} label={'6'} onPress={() => push('6')}/>
        <Button orientation={orientation} label={'-'} onPress={() => setSign('-')} orange/>
      </View>
      <View style={styles.rowLandscape}>
        <Button orientation={orientation} label={'e'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'x^2'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'1'} onPress={() => push('1')}/>
        <Button orientation={orientation} label={'2'} onPress={() => push('2')}/>
        <Button orientation={orientation} label={'3'} onPress={() => push('3')}/>
        <Button orientation={orientation} label={'+'} onPress={() => setSign('+')} orange/>
      </View>
      <View style={styles.rowLandscape}>
        <Button orientation={orientation} label={'Π'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'x^3'} onPress={() => push('7')} orange/>
        <Button orientation={orientation} label={'0'} onPress={() => push('0')} zeroButton/>
        <Button orientation={orientation} label={'.'} onPress={() => push('.')}/>
        <Button orientation={orientation} label={'='} onPress={() => calculate()} orange/>
      </View>
    </>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.result}>
        <Text style={styles.resultText}>
          {generateResult()}
        </Text>
      </View>
      {orientation === 'PORTRAIT' ? <PortraitBoard/> : <LandscapeBoard/>}
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
    flexWrap: 'wrap',
    height: '78%',
    width: '100%',
  },
  rowLandscape: {
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
  landscapeButton: {
    width: '16%',
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
  largeLandscapeButton: {
    width: '33%',
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
