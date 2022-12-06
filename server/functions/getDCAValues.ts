export default function getDCAValues(
  relativeChange: number[], 
  dates: string[], 
  startAmount: number, 
  incrementAmount: number, 
  investmentPeriod: string
): number[] {

    const DCAValues: number[] = [startAmount];
    let currentDay: number = new Date(dates[0]).getDay();
    let currentMonth: number = new Date(dates[0]).getMonth();

  
    for (let i = 0; i < relativeChange.length; i++) {
      
      if (i > 0) {
        const day = new Date(dates[i]).getDay();
        const month = new Date(dates[i]).getMonth();
        
        if (investmentPeriod === "Weekly") {
          if (day === 1) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
          } 

        } else if (investmentPeriod === "Monthly") {
          if (month > currentMonth || (month === 0 && currentMonth === 11)) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
            currentMonth = month;
          }

        } else if (investmentPeriod === "Yearly") {

        }
        DCAValues.push(relativeChange[i] * DCAValues[DCAValues.length - 1]);
      }
    }
    
    return DCAValues;
  }

