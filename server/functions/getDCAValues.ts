export default function getDCAValues(relativeChange: number[], dates: string[], startAmount: number, incrementAmount: number): number[] {
    const DCAValues: number[] = [startAmount];
    let currentMonth: number = new Date(dates[0]).getMonth();
  
    for (let i = 0; i < relativeChange.length; i++) {
      
      if (i > 0) {
        const month = new Date(dates[i]).getMonth();
        
        if (month > currentMonth || (month === 0 && currentMonth === 11)) {
          DCAValues[DCAValues.length - 1] += incrementAmount;
          currentMonth = month;
        }
        DCAValues.push(relativeChange[i] * DCAValues[DCAValues.length - 1]);
      }
    }
    
    return DCAValues;
  }

