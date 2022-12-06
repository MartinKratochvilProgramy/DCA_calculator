export default function getDCAValues(
  relativeChange: number[], 
  dates: string[], 
  startAmount: number, 
  incrementAmount: number, 
  investmentPeriod: string
): number[] {

    const DCAValues: number[] = [startAmount];
    let currentMonth: number = new Date(dates[0]).getMonth();
    let currentYear: number = new Date(dates[0]).getFullYear();
  
    for (let i = 0; i < relativeChange.length; i++) {
      
      if (i > 0) {
        
        if (investmentPeriod === "Weekly") {
          const day = new Date(dates[i]).getDay();
          if (day === 1) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
          } 
          
        } else if (investmentPeriod === "Monthly") {
          const month = new Date(dates[i]).getMonth();
          if (month > currentMonth || (month === 0 && currentMonth === 11)) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
            currentMonth = month;
          }
          
        } else if (investmentPeriod === "Yearly") {
          const year = new Date(dates[i]).getFullYear();
          if (year > currentYear) {
            DCAValues[DCAValues.length - 1] += incrementAmount;
            currentYear = year;
          }

        }
        DCAValues.push(relativeChange[i] * DCAValues[DCAValues.length - 1]);
      }
    }
    
    return DCAValues;
  }

