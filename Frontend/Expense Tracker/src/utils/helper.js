

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
};


export const getInitials = (Name) => {
    if(!Name) return "";

    const words = Name.split(" ");
    let initials = "";

    for(let i=0;i<Math.min(words.length,2);i++){
        initials += words[i][0];
    }


    return initials.toUpperCase();
}


export const addThousandsSeperator = (num) => {
    if(num == null || isNaN(num)) return "";
    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionPart
        ? `${formattedInteger}.${fractionPart}`
        : formattedInteger;
}

export const prepareExpenseBarChartData = (transactions) => {
  const grouped = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
    grouped[month] = (grouped[month] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([label, value]) => ({
    label,
    value,
  }));
};

export const prepareIncomeBarChartData = (transactions) => {
  const grouped = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
    grouped[month] = (grouped[month] || 0) + tx.amount;
  });

  return Object.entries(grouped).map(([label, value]) => ({
    label,
    value,
  }));
};
