import {
  timeConverter,
  calculateGrade,
  getLetter,
  calculateScore,
} from '../utils';

describe('timeConverter', () => {
  it('yaroqli kirish bilan soat, daqiqa va sekundlarni qaytaradi', () => {
    expect(timeConverter(1000 * 60)).toMatchObject({
      hours: '00',
      minutes: '01',
      seconds: '00',
    });
  });

  it('noto\'g\'ri kirish bilan null qaytaradi', () => {
    expect(timeConverter('ss')).toBeNull();
  });
});

describe('calculateGrade', () => {
  it('yaroqli kirishda 97 va undan yuqori ball uchun A+ va o\'tdingiz qaytaradi', () => {
    expect(calculateGrade(97)).toMatchObject({
      grade: 'A+',
      remarks: `A'lo! Siz ushbu testni mukammal bajardingiz. Yaxshi ish!`,
    });
  });

  it('yaroqli kirishda 93 va 96 orasidagi ballar uchun A va o\'tdingiz qaytaradi', () => {
    expect(calculateGrade(96)).toMatchObject({
      grade: 'A',
      remarks: `A'lo! Siz ushbu testni mukammal bajardingiz. Yaxshi ish!`,
    });
    expect(calculateGrade(93)).toMatchObject({
      grade: 'A',
      remarks: `A'lo! Siz ushbu testni mukammal bajardingiz. Yaxshi ish!`,
    });
  });

  it('yaroqli kirishda 90 va 92 orasidagi ballar uchun A- va o\'tdingiz qaytaradi', () => {
    expect(calculateGrade(90)).toMatchObject({
      grade: 'A-',
      remarks: `A'lo! Siz ushbu testni mukammal bajardingiz. Yaxshi ish!`,
    });
    expect(calculateGrade(92)).toMatchObject({
      grade: 'A-',
      remarks: `A'lo! Siz ushbu testni mukammal bajardingiz. Yaxshi ish!`,
    });
  });

  it('noto\'g\'ri kirish bilan null qaytaradi', () => {
    expect(calculateGrade([1, 2])).toBeNull();
  });
});

describe('getLetter', () => {
  it('yaroqli kirish bilan harf qaytaradi', () => {
    expect(getLetter(0)).toEqual('A.');
    expect(getLetter(1)).toEqual('B.');
    expect(getLetter(2)).toEqual('C.');
    expect(getLetter(3)).toEqual('D.');
  });

  it('noto\'g\'ri kirish bilan null qaytaradi', () => {
    expect(getLetter(4)).toBeNull();
  });
});

describe('calculateScore', () => {
  it('yaroqli kirish bilan ball qaytaradi', () => {
    expect(calculateScore(200, 100)).toEqual(50);
  });

  it('noto\'g\'ri kirish bilan 0 qaytaradi', () => {
    expect(calculateScore(0, 0)).toEqual(0);
  });
});
