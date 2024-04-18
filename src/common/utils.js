
export function formatDate(date, fmt){
    let d = new Date(date);

    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString();
    let day = (d.getDate()).toString();

    if (fmt === 'LONG'){
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
    }
    else if (fmt === 'SHORT'){
        year = year.toString().substring(2);
    }

    return [year, month, day].join('-'); 
} 